import { FERN_PACKAGE_MARKER_FILENAME, ROOT_API_FILENAME } from "@fern-api/configuration";
import { AbsoluteFilePath, dirname, relative, RelativeFilePath } from "@fern-api/fs-utils";
import { OpenApiIntermediateRepresentation } from "@fern-api/openapi-ir-sdk";
import { RawSchemas, RootApiFileSchema, visitRawEnvironmentDeclaration } from "@fern-api/yaml-schema";
import { camelCase, isEqual } from "lodash-es";
import path, { basename, extname } from "path";

export interface FernDefinitionBuilder {
    addNavigation({ navigation }: { navigation: string[] }): void;

    addAuthScheme({ name, schema }: { name: string; schema: RawSchemas.AuthSchemeDeclarationSchema }): void;

    setAuth(name: string): void;

    getGlobalHeaderNames(): Set<string>;

    addGlobalHeader({ name, schema }: { name: string; schema: RawSchemas.HttpHeaderSchema }): void;

    addIdempotencyHeader({ name, schema }: { name: string; schema: RawSchemas.HttpHeaderSchema }): void;

    addVariable({ name, schema }: { name: string; schema: RawSchemas.VariableDeclarationSchema }): void;

    addEnvironment({ name, schema }: { name: string; schema: RawSchemas.EnvironmentSchema }): void;

    setDefaultEnvironment(name: string): void;

    setBasePath(basePath: string): void;

    getEnvironmentType(): "single" | "multi" | undefined;

    addAudience(name: string): void;

    /**
     * Adds an import and returns the prefix for the import. Returns undefined if no prefix.
     * @param file the file to add the import to
     * @param fileToImport the file to import
     */
    addImport({ file, fileToImport }: { file: RelativeFilePath; fileToImport: RelativeFilePath }): string | undefined;

    addType(file: RelativeFilePath, { name, schema }: { name: string; schema: RawSchemas.TypeDeclarationSchema }): void;

    addError(
        file: RelativeFilePath,
        { name, schema }: { name: string; schema: RawSchemas.ErrorDeclarationSchema }
    ): void;

    addErrorExample(
        file: RelativeFilePath,
        { name, example }: { name: string; example: RawSchemas.ExampleTypeSchema }
    ): void;

    addEndpoint(
        file: RelativeFilePath,
        { name, schema }: { name: string; schema: RawSchemas.HttpEndpointSchema }
    ): void;

    addWebhook(file: RelativeFilePath, { name, schema }: { name: string; schema: RawSchemas.WebhookSchema }): void;

    addChannel(file: RelativeFilePath, { channel }: { channel: RawSchemas.WebSocketChannelSchema }): void;

    addChannelMessage(
        file: RelativeFilePath,
        { messageId, message }: { messageId: string; message: RawSchemas.WebSocketChannelMessageSchema }
    ): void;

    addChannelExample(file: RelativeFilePath, { example }: { example: RawSchemas.ExampleWebSocketSession }): void;

    setServiceInfo(file: RelativeFilePath, { displayName, docs }: { displayName?: string; docs?: string }): void;

    addTypeExample(file: RelativeFilePath, name: string, convertedExample: RawSchemas.ExampleTypeSchema): void;

    build(): FernDefinition;

    readonly enableUniqueErrorsPerEndpoint: boolean;
}

export interface FernDefinition {
    rootApiFile: RawSchemas.RootApiFileSchema;
    packageMarkerFile: RawSchemas.PackageMarkerFileSchema;
    definitionFiles: Record<RelativeFilePath, RawSchemas.DefinitionFileSchema>;
}

export class FernDefinitionBuilderImpl implements FernDefinitionBuilder {
    private rootApiFile: RawSchemas.RootApiFileSchema;
    private packageMarkerFile: RawSchemas.PackageMarkerFileSchema = {};
    private definitionFiles: Record<RelativeFilePath, RawSchemas.DefinitionFileSchema> = {};
    private basePath: string | undefined = undefined;

    public constructor(
        ir: OpenApiIntermediateRepresentation,
        private readonly modifyBasePaths: boolean,
        public readonly enableUniqueErrorsPerEndpoint: boolean
    ) {
        this.rootApiFile = {
            name: "api",
            "error-discrimination": {
                strategy: "status-code"
            }
        };
        if (ir.title != null) {
            this.rootApiFile["display-name"] = ir.title;
        }
    }

    public addNavigation({ navigation }: { navigation: string[] }): void {
        this.packageMarkerFile.navigation = navigation;
    }

    setServiceInfo(
        file: RelativeFilePath,
        { displayName, docs }: { displayName?: string | undefined; docs?: string | undefined }
    ): void {
        const fernFile = this.getOrCreateFile(file);
        if (fernFile.service == null) {
            fernFile.service = {
                auth: false,
                "base-path": "",
                endpoints: {}
            };
        }
        if (displayName != null) {
            fernFile.service["display-name"] = displayName;
        }
        if (docs != null) {
            fernFile.docs = docs;
        }
    }

    public addAudience(name: string): void {
        if (this.rootApiFile.audiences == null) {
            this.rootApiFile.audiences = [];
        }
        this.rootApiFile.audiences.push(name);
    }

    public setAuth(name: string): void {
        this.rootApiFile.auth = name;
    }

    public addAuthScheme({ name, schema }: { name: string; schema: RawSchemas.AuthSchemeDeclarationSchema }): void {
        if (this.rootApiFile["auth-schemes"] == null) {
            this.rootApiFile["auth-schemes"] = {};
        }
        if (this.rootApiFile["auth-schemes"][name] == null) {
            this.rootApiFile["auth-schemes"][name] = schema;
        }
    }

    public setDefaultEnvironment(name: string): void {
        this.rootApiFile["default-environment"] = name;
    }

    public setBasePath(basePath: string): void {
        this.basePath = basePath;
    }

    public getEnvironmentType(): "single" | "multi" | undefined {
        const environmentEntry = Object.entries(this.rootApiFile.environments ?? {})[0];
        if (environmentEntry == null) {
            return undefined;
        }
        return visitRawEnvironmentDeclaration<"single" | "multi">(environmentEntry[1], {
            singleBaseUrl: () => "single",
            multipleBaseUrls: () => "multi"
        });
    }

    public addEnvironment({ name, schema }: { name: string; schema: RawSchemas.EnvironmentSchema }): void {
        if (this.rootApiFile.environments == null) {
            this.rootApiFile.environments = {};
        }
        this.rootApiFile.environments[name] = schema;
    }

    public getGlobalHeaderNames(): Set<string> {
        return new Set(Object.keys(this.rootApiFile.headers ?? {}));
    }

    public addGlobalHeader({ name, schema }: { name: string; schema: RawSchemas.HttpHeaderSchema }): void {
        if (this.rootApiFile.headers == null) {
            this.rootApiFile.headers = {};
        }
        this.rootApiFile.headers[name] = schema;
    }

    public addIdempotencyHeader({ name, schema }: { name: string; schema: RawSchemas.HttpHeaderSchema }): void {
        if (this.rootApiFile["idempotency-headers"] == null) {
            this.rootApiFile["idempotency-headers"] = {};
        }
        this.rootApiFile["idempotency-headers"][name] = schema;
    }

    public addVariable({ name, schema }: { name: string; schema: RawSchemas.VariableDeclarationSchema }): void {
        if (this.rootApiFile.variables == null) {
            this.rootApiFile.variables = {};
        }
        this.rootApiFile.variables[name] = schema;
    }

    public addImport({
        file,
        fileToImport
    }: {
        file: RelativeFilePath;
        fileToImport: RelativeFilePath;
    }): string | undefined {
        if (file === fileToImport) {
            return undefined;
        }
        const importPrefix = camelCase(basename(fileToImport, extname(fileToImport)).replaceAll("__package__", "root"));

        if (file === RelativeFilePath.of(ROOT_API_FILENAME)) {
            if (this.rootApiFile.imports == null) {
                this.rootApiFile.imports = {};
            }
            this.rootApiFile.imports[importPrefix] = relative(
                dirname(AbsoluteFilePath.of(`/${file}`)),
                AbsoluteFilePath.of(`/${fileToImport}`)
            );
            return importPrefix;
        }

        const fernFile = this.getOrCreateFile(file);
        if (fernFile.imports == null) {
            fernFile.imports = {};
        }
        fernFile.imports[importPrefix] = relative(
            dirname(AbsoluteFilePath.of(`/${file}`)),
            AbsoluteFilePath.of(`/${fileToImport}`)
        );
        return importPrefix;
    }

    public addType(
        file: RelativeFilePath,
        { name, schema }: { name: string; schema: RawSchemas.TypeDeclarationSchema }
    ): void {
        const fernFile = this.getOrCreateFile(file);
        if (fernFile.types == null) {
            fernFile.types = {};
        }
        fernFile.types[name] = schema;
    }

    public addTypeExample(file: RelativeFilePath, name: string, convertedExample: RawSchemas.ExampleTypeSchema): void {
        const fernFile = this.getOrCreateFile(file);
        if (fernFile.types == null) {
            fernFile.types = {};
        }
        const type = fernFile.types[name];
        if (type != null) {
            if (typeof type === "string") {
                fernFile.types[name] = {
                    type,
                    examples: [convertedExample]
                };
            } else {
                if (type.examples == null) {
                    type.examples = [];
                }
                type.examples.push(convertedExample);
            }
        }
    }

    public addError(
        file: RelativeFilePath,
        { name, schema }: { name: string; schema: RawSchemas.ErrorDeclarationSchema }
    ): void {
        const fernFile = this.getOrCreateFile(file);
        if (fernFile.errors == null) {
            fernFile.errors = {};
        }
        if (fernFile.errors[name] == null) {
            fernFile.errors[name] = schema;
        } else if (fernFile.errors[name]?.type !== schema.type) {
            fernFile.errors[name] = {
                "status-code": schema["status-code"],
                type: "unknown"
            };
        }
    }

    public addErrorExample(
        file: RelativeFilePath,
        { name, example }: { name: string; example: RawSchemas.ExampleTypeSchema }
    ): void {
        const fernFile = this.getOrCreateFile(file);
        if (fernFile.errors == null) {
            return;
        }
        const errorDeclaration = fernFile.errors[name];
        if (errorDeclaration == null) {
            return;
        }
        if (errorDeclaration.examples == null) {
            errorDeclaration.examples = [];
        }
        const alreadyAdded =
            errorDeclaration.examples.some((existingExample) => {
                return isEqual(existingExample, example);
            }) ?? false;
        if (!alreadyAdded) {
            errorDeclaration.examples?.push(example);
        }
    }

    public addEndpoint(
        file: RelativeFilePath,
        { name, schema }: { name: string; schema: RawSchemas.HttpEndpointSchema }
    ): void {
        const fernFile = this.getOrCreateFile(file);
        if (fernFile.service == null) {
            fernFile.service = {
                auth: false,
                "base-path": "",
                endpoints: {}
            };
        }
        fernFile.service.endpoints[name] = schema;
    }

    public addWebhook(
        file: RelativeFilePath,
        { name, schema }: { name: string; schema: RawSchemas.WebhookSchema }
    ): void {
        const fernFile = this.getOrCreateFile(file);
        if (fernFile.webhooks == null) {
            fernFile.webhooks = {};
        }
        fernFile.webhooks[name] = schema;
    }

    public addChannel(file: RelativeFilePath, { channel }: { channel: RawSchemas.WebSocketChannelSchema }): void {
        const fernFile = this.getOrCreateFile(file);
        fernFile.channel = channel;

        const basePath = this.basePath;
        if (basePath != null) {
            fernFile.channel.path = path.join(basePath, channel.path);
        }
    }

    public addChannelExample(
        file: RelativeFilePath,
        { example }: { example: RawSchemas.ExampleWebSocketSession }
    ): void {
        const fernFile = this.getOrCreateFile(file);
        if (fernFile.channel == null) {
            fernFile.channel = {
                path: "",
                auth: false
            };
        }
        if (fernFile.channel.messages == null) {
            fernFile.channel.messages = {};
        }
        if (fernFile.channel.examples == null) {
            fernFile.channel.examples = [];
        }
        fernFile.channel.examples.push(example);
    }

    public addChannelMessage(
        file: RelativeFilePath,
        { messageId, message }: { messageId: string; message: RawSchemas.WebSocketChannelMessageSchema }
    ): void {
        const fernFile = this.getOrCreateFile(file);
        if (fernFile.channel == null) {
            fernFile.channel = {
                path: "",
                auth: false
            };
        }
        if (fernFile.channel.messages == null) {
            fernFile.channel.messages = {};
        }
        fernFile.channel.messages[messageId] = message;
    }

    public build(): FernDefinition {
        if (this.modifyBasePaths) {
            const basePath = getSharedEnvironmentBasePath(this.rootApiFile);

            // substitute package marker file
            if (this.packageMarkerFile.service != null) {
                this.packageMarkerFile.service = {
                    ...this.packageMarkerFile.service,
                    endpoints: Object.fromEntries(
                        Object.entries(this.packageMarkerFile.service.endpoints).map(([id, endpoint]) => {
                            return [
                                id,
                                {
                                    ...endpoint,
                                    path: `${basePath}${endpoint.path}`
                                }
                            ];
                        })
                    )
                };
            }

            // subsitute definition files
            for (const [_, file] of Object.entries(this.definitionFiles)) {
                if (file.service != null) {
                    file.service = {
                        ...file.service,
                        endpoints: Object.fromEntries(
                            Object.entries(file.service.endpoints).map(([id, endpoint]) => {
                                return [
                                    id,
                                    {
                                        ...endpoint,
                                        path: `${basePath}${endpoint.path}`
                                    }
                                ];
                            })
                        )
                    };
                }
            }

            if (this.rootApiFile.environments != null) {
                this.rootApiFile.environments = {
                    ...Object.fromEntries(
                        Object.entries(this.rootApiFile.environments).map(([env, url]) => {
                            if (typeof url === "string") {
                                return [env, url.substring(0, url.length - basePath.length)];
                            } else if (isSingleBaseUrl(url)) {
                                return [
                                    env,
                                    {
                                        url: url.url.substring(0, url.url.length - basePath.length)
                                    }
                                ];
                            } else {
                                return [
                                    env,
                                    {
                                        urls: Object.fromEntries(
                                            Object.entries(url.urls).map(([name, url]) => {
                                                return [name, url.substring(0, url.length - basePath.length)];
                                            })
                                        )
                                    }
                                ];
                            }
                        })
                    )
                };
            }
        }

        const basePath = this.basePath;
        if (basePath != null) {
            // substitute package marker file
            if (this.packageMarkerFile.service != null) {
                this.packageMarkerFile.service = {
                    ...this.packageMarkerFile.service,
                    endpoints: Object.fromEntries(
                        Object.entries(this.packageMarkerFile.service.endpoints).map(([id, endpoint]) => {
                            return [
                                id,
                                {
                                    ...endpoint,
                                    path: path.join(basePath, endpoint.path)
                                }
                            ];
                        })
                    )
                };
            }

            // subsitute definition files
            for (const [_, file] of Object.entries(this.definitionFiles)) {
                if (file.service != null) {
                    file.service = {
                        ...file.service,
                        endpoints: Object.fromEntries(
                            Object.entries(file.service.endpoints).map(([id, endpoint]) => {
                                return [
                                    id,
                                    {
                                        ...endpoint,
                                        path: path.join(basePath, endpoint.path)
                                    }
                                ];
                            })
                        )
                    };
                }
            }
        }

        const definition: FernDefinition = {
            rootApiFile: this.rootApiFile,
            packageMarkerFile: this.packageMarkerFile,
            definitionFiles: this.definitionFiles
        };
        return definition;
    }

    public getOrCreateFile(
        file: RelativeFilePath
    ): RawSchemas.PackageMarkerFileSchema | RawSchemas.DefinitionFileSchema {
        if (file === FERN_PACKAGE_MARKER_FILENAME) {
            return this.packageMarkerFile;
        } else {
            return (this.definitionFiles[file] ??= {});
        }
    }
}

function getSharedEnvironmentBasePath(rootApiFile: RootApiFileSchema): string {
    if (rootApiFile.environments == null) {
        return "";
    }
    const urls = Object.entries(rootApiFile.environments).flatMap(([_, url]) => {
        if (typeof url === "string") {
            return [url];
        } else if (isSingleBaseUrl(url)) {
            return [url.url];
        } else {
            return Object.values(url.urls);
        }
    });
    return getSharedSuffix(urls.map(getPathname));
}

function getPathname(url: string): string {
    try {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;
        if (pathname.endsWith("/")) {
            return pathname.slice(0, -1);
        } else {
            return pathname;
        }
    } catch (err) {
        return "";
    }
}

function getSharedSuffix(strings: string[]): string {
    let suffix = "";

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
    while (true) {
        const chars = strings.map((s) => s[s.length - suffix.length - 1]);
        const char = chars[0];
        if (char == null || chars.some((c) => c !== char)) {
            break;
        }
        suffix = char + suffix;
    }

    return suffix;
}

function isSingleBaseUrl(url: RawSchemas.EnvironmentSchema): url is RawSchemas.SingleBaseUrlEnvironmentSchema {
    return (url as RawSchemas.SingleBaseUrlEnvironmentSchema).url != null;
}
