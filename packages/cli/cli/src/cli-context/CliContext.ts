import { createLogger, LogLevel, LOG_LEVELS } from "@fern-api/logger";
import { getPosthogManager } from "@fern-api/posthog-manager";
import { isVersionAhead } from "@fern-api/semver-utils";
import { FernCliError, Finishable, PosthogEvent, Startable, TaskContext, TaskResult } from "@fern-api/task-context";
import { Workspace } from "@fern-api/workspace-loader";
import chalk from "chalk";
import { maxBy } from "lodash-es";
import { CliEnvironment } from "./CliEnvironment";
import { Log } from "./Log";
import { logErrorMessage } from "./logErrorMessage";
import { TaskContextImpl } from "./TaskContextImpl";
import { TtyAwareLogger } from "./TtyAwareLogger";
import { getFernCliUpgradeMessage } from "./upgrade-utils/getFernCliUpgradeMessage";
import { getLatestVersionOfCli } from "./upgrade-utils/getLatestVersionOfCli";

const WORKSPACE_NAME_COLORS = ["#2E86AB", "#A23B72", "#F18F01", "#C73E1D", "#CCE2A3"];

export interface FernCliUpgradeInfo {
    isUpgradeAvailable: boolean;
    latestVersion: string;
}

export class CliContext {
    public readonly environment: CliEnvironment;

    private didSucceed = true;

    private numTasks = 0;
    private ttyAwareLogger: TtyAwareLogger;

    private logLevel: LogLevel = LogLevel.Info;

    constructor(stream: NodeJS.WriteStream) {
        this.ttyAwareLogger = new TtyAwareLogger(stream);

        const packageName = this.getPackageName();
        const packageVersion = this.getPackageVersion();
        const cliName = this.getCliName();
        if (packageName == null || packageVersion == null || cliName == null) {
            this.exitProgram();
        }
        this.environment = {
            packageName,
            packageVersion,
            cliName
        };
    }

    private getPackageName() {
        if (process.env.CLI_PACKAGE_NAME == null) {
            this.logger.error("CLI_PACKAGE_NAME is not defined");
        }
        return process.env.CLI_PACKAGE_NAME;
    }

    private getPackageVersion() {
        if (process.env.CLI_VERSION == null) {
            this.logger.error("CLI_VERSION is not defined");
        }
        return process.env.CLI_VERSION;
    }

    private getCliName() {
        if (process.env.CLI_NAME == null) {
            this.logger.error("CLI_NAME is not defined");
        }
        return process.env.CLI_NAME;
    }

    public setLogLevel(logLevel: LogLevel): void {
        this.logLevel = logLevel;
    }

    public logDebugInfo(): void {
        this.logger.debug(
            `Running ${chalk.bold(`${this.environment.cliName}`)} (${this.environment.packageName}@${
                this.environment.packageVersion
            })`
        );
    }

    public failAndThrow(message?: string, error?: unknown): never {
        this.failWithoutThrowing(message, error);
        throw new FernCliError();
    }

    public failWithoutThrowing(message?: string, error?: unknown): void {
        this.didSucceed = false;
        logErrorMessage({ message, error, logger: this.logger });
    }

    public async exit(): Promise<never> {
        if (!this._suppressUpgradeMessage) {
            await this.nudgeUpgradeIfAvaialable();
        }
        this.ttyAwareLogger.finish();
        (await getPosthogManager()).flush();
        this.exitProgram();
    }

    private async nudgeUpgradeIfAvaialable() {
        try {
            const { isUpgradeAvailable, latestVersion } = await Promise.race<
                [Promise<FernCliUpgradeInfo>, Promise<never>]
            >([
                this.isUpgradeAvailable(),
                new Promise((_resolve, reject) => setTimeout(() => reject("Request timed out"), 300))
            ]);

            if (isUpgradeAvailable) {
                let upgradeMessage = getFernCliUpgradeMessage({
                    toVersion: latestVersion,
                    cliEnvironment: this.environment
                });
                if (!upgradeMessage.endsWith("\n")) {
                    upgradeMessage += "\n";
                }
                this.logger.info(upgradeMessage);
            }
        } catch {
            // swallow error when failing to check for upgrade
        }
    }

    public async exitIfFailed(): Promise<void> {
        if (!this.didSucceed) {
            await this.exit();
        }
    }

    private exitProgram(): never {
        process.exit(this.didSucceed ? 0 : 1);
    }

    private longestWorkspaceName: string | undefined;
    public registerWorkspaces(workspaces: readonly Workspace[]): void {
        const longestWorkspaceName = maxBy(
            workspaces.map((workspace) => (workspace.type === "docs" ? "docs" : workspace.workspaceName ?? "api")),
            (name) => name.length
        );
        if (longestWorkspaceName != null) {
            this.longestWorkspaceName = longestWorkspaceName;
        }
    }

    public runTask<T>(run: (context: TaskContext) => T | Promise<T>): Promise<T> {
        return this.runTaskWithInit(this.constructTaskInit(), run);
    }

    public addTask(): Startable<TaskContext & Finishable> {
        return this.addTaskWithInit(this.constructTaskInit());
    }

    public async runTaskForWorkspace(
        workspace: Workspace,
        run: (context: TaskContext) => void | Promise<void>
    ): Promise<void> {
        await this.runTaskWithInit(this.constructTaskInitForWorkspace(workspace), run);
    }

    private addTaskWithInit(init: TaskContextImpl.Init): Startable<TaskContext & Finishable> {
        const context = new TaskContextImpl(init);
        this.ttyAwareLogger.registerTask(context);
        return context;
    }

    private async runTaskWithInit<T>(
        init: TaskContextImpl.Init,
        run: (context: TaskContext) => T | Promise<T>
    ): Promise<T> {
        const context = this.addTaskWithInit(init).start();
        let result: T;
        try {
            result = await run(context);
        } catch (error) {
            context.failWithoutThrowing(undefined, error);
            throw new FernCliError();
        } finally {
            context.finish();
        }
        return result;
    }

    public instrumentPostHogEvent(event: PosthogEvent): void {
        void this.instrumentPostHogEventAsync(event);
    }

    private async instrumentPostHogEventAsync(event: PosthogEvent): Promise<void> {
        (await getPosthogManager()).sendEvent(event);
    }

    public readonly logger = createLogger(this.log.bind(this));

    private constructTaskInitForWorkspace(workspace: Workspace): TaskContextImpl.Init {
        const prefixWithoutPadding = wrapWorkspaceNameForPrefix(
            workspace.type === "docs" ? "docs" : workspace.workspaceName ?? "api"
        );

        // we want all the prefixes to be the same length, so use this.longestWorkspaceName
        // if it's defined. (+1 so there's a space after the prefix)
        const minLengthForPrefix =
            1 +
            (this.longestWorkspaceName != null
                ? wrapWorkspaceNameForPrefix(this.longestWorkspaceName)
                : prefixWithoutPadding
            ).length;

        const prefix = prefixWithoutPadding.padEnd(minLengthForPrefix);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const colorForWorkspace = WORKSPACE_NAME_COLORS[this.numTasks++ % WORKSPACE_NAME_COLORS.length]!;
        const prefixWithColor = chalk.hex(colorForWorkspace)(prefix);
        return {
            ...this.constructTaskInit(),
            logPrefix: prefixWithColor
        };
    }

    private constructTaskInit(): TaskContextImpl.Init {
        return {
            logImmediately: (content) => this.logImmediately(content),
            takeOverTerminal: (run) => this.ttyAwareLogger.takeOverTerminal(run),
            onResult: (result) => {
                if (result === TaskResult.Failure) {
                    this.didSucceed = false;
                }
            },
            instrumentPostHogEvent: (event) => {
                this.instrumentPostHogEvent(event);
            },
            shouldBufferLogs: false
        };
    }

    private log(level: LogLevel, ...parts: string[]) {
        this.logImmediately([
            {
                parts,
                level,
                time: new Date()
            }
        ]);
    }

    private logImmediately(logs: Log[]): void {
        const filtered = logs.filter((log) => LOG_LEVELS.indexOf(log.level) >= LOG_LEVELS.indexOf(this.logLevel));
        this.ttyAwareLogger.log(filtered, {
            includeDebugInfo: this.logLevel === LogLevel.Debug
        });
    }

    private _suppressUpgradeMessage = false;
    public suppressUpgradeMessage(): void {
        this._suppressUpgradeMessage = true;
    }

    private _isUpgradeAvailable: FernCliUpgradeInfo | undefined;
    public async isUpgradeAvailable({
        includePreReleases = false
    }: {
        includePreReleases?: boolean;
    } = {}): Promise<FernCliUpgradeInfo> {
        if (this._isUpgradeAvailable == null) {
            this.logger.debug(`Checking if ${this.environment.packageName} upgrade is available...`);

            const latestPackageVersion = await getLatestVersionOfCli({
                cliEnvironment: this.environment,
                includePreReleases
            });
            const isUpgradeAvailable = isVersionAhead(latestPackageVersion, this.environment.packageVersion);

            this.logger.debug(
                `Latest version: ${latestPackageVersion}. ` +
                    (isUpgradeAvailable ? "Upgrade available." : "No upgrade available.")
            );

            this._isUpgradeAvailable = {
                isUpgradeAvailable,
                latestVersion: latestPackageVersion
            };
        }
        return this._isUpgradeAvailable;
    }
}

function wrapWorkspaceNameForPrefix(workspaceName: string): string {
    return `[${workspaceName}]:`;
}
