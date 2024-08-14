import { ExampleEndpointCall, HttpEndpoint } from "@fern-fern/ir-sdk/api";
import { Fetcher, getExampleEndpointCalls, GetReferenceOpts, getTextOfTsNode } from "@fern-typescript/commons";
import { EndpointSignature, GeneratedEndpointImplementation, SdkContext } from "@fern-typescript/contexts";
import { ts } from "ts-morph";
import { GeneratedEndpointRequest } from "../../endpoint-request/GeneratedEndpointRequest";
import { GeneratedSdkClientClassImpl } from "../../GeneratedSdkClientClassImpl";
import { buildUrl } from "../utils/buildUrl";
import {
    getAbortSignalExpression,
    getMaxRetriesExpression,
    getRequestOptionsParameter,
    getTimeoutExpression,
    REQUEST_OPTIONS_PARAMETER_NAME
} from "../utils/requestOptionsParameter";
import { GeneratedEndpointResponse } from "./endpoint-response/GeneratedEndpointResponse";

export declare namespace GeneratedDefaultEndpointImplementation {
    export interface Init {
        endpoint: HttpEndpoint;
        generatedSdkClientClass: GeneratedSdkClientClassImpl;
        includeCredentialsOnCrossOriginRequests: boolean;
        defaultTimeoutInSeconds: number | "infinity" | undefined;
        request: GeneratedEndpointRequest;
        response: GeneratedEndpointResponse;
        includeSerdeLayer: boolean;
        retainOriginalCasing: boolean;
        omitUndefined: boolean;
    }
}

const EXAMPLE_PREFIX = "    ";

export class GeneratedDefaultEndpointImplementation implements GeneratedEndpointImplementation {
    public readonly endpoint: HttpEndpoint;
    private generatedSdkClientClass: GeneratedSdkClientClassImpl;
    private includeCredentialsOnCrossOriginRequests: boolean;
    private defaultTimeoutInSeconds: number | "infinity" | undefined;
    private request: GeneratedEndpointRequest;
    private response: GeneratedEndpointResponse;
    private includeSerdeLayer: boolean;
    private retainOriginalCasing: boolean;
    private omitUndefined: boolean;

    constructor({
        endpoint,
        response,
        generatedSdkClientClass,
        includeCredentialsOnCrossOriginRequests,
        defaultTimeoutInSeconds,
        request,
        includeSerdeLayer,
        retainOriginalCasing,
        omitUndefined
    }: GeneratedDefaultEndpointImplementation.Init) {
        this.endpoint = endpoint;
        this.generatedSdkClientClass = generatedSdkClientClass;
        this.includeCredentialsOnCrossOriginRequests = includeCredentialsOnCrossOriginRequests;
        this.defaultTimeoutInSeconds = defaultTimeoutInSeconds;
        this.request = request;
        this.response = response;
        this.includeSerdeLayer = includeSerdeLayer;
        this.retainOriginalCasing = retainOriginalCasing;
        this.omitUndefined = omitUndefined;
    }

    public getOverloads(): EndpointSignature[] {
        return [];
    }

    public getSignature(context: SdkContext): EndpointSignature {
        const paginationInfo = this.response.getPaginationInfo(context);
        return {
            parameters: [
                ...this.request.getEndpointParameters(context),
                getRequestOptionsParameter({
                    requestOptionsReference: this.generatedSdkClientClass.getReferenceToRequestOptions(this.endpoint)
                })
            ],
            returnTypeWithoutPromise:
                paginationInfo != null
                    ? context.coreUtilities.pagination.Page._getReferenceToType(paginationInfo.itemType)
                    : this.response.getReturnType(context)
        };
    }

    public getDocs(context: SdkContext): string | undefined {
        const groups: string[] = [];
        if (this.endpoint.docs != null) {
            groups.push(this.endpoint.docs);
        }

        const params: string[] = [];
        for (const parameter of this.request.getEndpointParameters(context)) {
            if (parameter.docs == null) {
                params.push(`@param {${parameter.type}} ${parameter.name}`);
                continue;
            }
            const docsStrPrefix = `@param {${parameter.type}} ${parameter.name} - `;
            const docsStrs = parameter.docs.split("\n").map((line, index) => {
                if (index === 0) {
                    return `${docsStrPrefix}${line}`;
                } else {
                    return `${" ".repeat(docsStrPrefix.length)}${line}`;
                }
            });
            params.push(...docsStrs);
        }

        // Every method supports request options, so we always include this parameter last.
        const requestOptionsType = this.generatedSdkClientClass.getRequestOptionsType(this.endpoint.idempotent);
        params.push(
            `@param {${requestOptionsType}} ${REQUEST_OPTIONS_PARAMETER_NAME} - Request-specific configuration.`
        );
        groups.push(params.join("\n"));

        const exceptions: string[] = [];
        for (const errorName of this.response.getNamesOfThrownExceptions(context)) {
            exceptions.push(`@throws {@link ${errorName}}`);
        }
        if (exceptions.length > 0) {
            groups.push(exceptions.join("\n"));
        }

        const examples: string[] = [];
        for (const example of getExampleEndpointCalls(this.endpoint)) {
            const generatedExample = this.getExample({
                context,
                example,
                opts: { isForComment: true },
                clientReference: context.sdkInstanceReferenceForSnippet
            });
            if (generatedExample == null) {
                continue;
            }
            let exampleStr = "@example\n" + getTextOfTsNode(generatedExample);
            exampleStr = exampleStr.replaceAll("\n", `\n${EXAMPLE_PREFIX}`);
            // Only add if it doesn't already exist
            if (!examples.includes(exampleStr)) {
                examples.push(exampleStr);
            }
        }
        if (examples.length > 0) {
            // Each example is its own group.
            groups.push(...examples);
        }

        return groups.join("\n\n");
    }

    public getExample(args: {
        context: SdkContext;
        example: ExampleEndpointCall;
        opts: GetReferenceOpts;
        clientReference: ts.Identifier;
    }): ts.Expression | undefined {
        const exampleParameters = this.request.getExampleEndpointParameters({
            context: args.context,
            example: args.example,
            opts: args.opts
        });
        if (exampleParameters == null) {
            return undefined;
        }
        return ts.factory.createAwaitExpression(
            ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(
                    this.generatedSdkClientClass.accessFromRootClient({
                        referenceToRootClient: args.clientReference
                    }),
                    ts.factory.createIdentifier(this.endpoint.name.camelCase.unsafeName)
                ),
                undefined,
                exampleParameters
            )
        );
    }

    public getStatements(context: SdkContext): ts.Statement[] {
        const body = [
            ...this.request.getBuildRequestStatements(context),
            ...this.invokeFetcherAndReturnResponse(context)
        ];

        const requestParameter = this.request.getRequestParameter(context);
        const paginationInfo = this.response.getPaginationInfo(context);
        if (paginationInfo != null && requestParameter != null) {
            const listFn = ts.factory.createVariableDeclarationList(
                [
                    ts.factory.createVariableDeclaration(
                        ts.factory.createIdentifier("list"),
                        undefined,
                        undefined,
                        ts.factory.createArrowFunction(
                            [ts.factory.createToken(ts.SyntaxKind.AsyncKeyword)],
                            undefined,
                            [
                                ts.factory.createParameterDeclaration(
                                    undefined,
                                    undefined,
                                    undefined,
                                    ts.factory.createIdentifier("request"),
                                    undefined,
                                    requestParameter,
                                    undefined
                                )
                            ],
                            ts.factory.createTypeReferenceNode("Promise", [this.response.getReturnType(context)]),
                            ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                            ts.factory.createBlock(body, undefined)
                        )
                    )
                ],
                ts.NodeFlags.Const
            );
            const statements: ts.Statement[] = [ts.factory.createVariableStatement(undefined, listFn)];
            if (paginationInfo.type === "offset" || paginationInfo.type === "offset-step") {
                statements.push(paginationInfo.initializeOffset);
            }
            statements.push(
                ts.factory.createReturnStatement(
                    context.coreUtilities.pagination.Pageable._construct({
                        responseType: paginationInfo.responseType,
                        itemType: paginationInfo.itemType,
                        response: ts.factory.createAwaitExpression(
                            ts.factory.createCallExpression(ts.factory.createIdentifier("list"), undefined, [
                                ts.factory.createIdentifier("request")
                            ])
                        ),
                        hasNextPage: this.createLambdaWithResponse({ body: paginationInfo.hasNextPage }),
                        getItems: this.createLambdaWithResponse({ body: paginationInfo.getItems }),
                        loadPage: this.createLambdaWithResponse({
                            body: ts.factory.createBlock(paginationInfo.loadPage),
                            ignoreResponse: paginationInfo.type === "offset"
                        })
                    })
                )
            );
            return statements;
        }
        return body;
    }

    private createLambdaWithResponse({
        body,
        ignoreResponse
    }: {
        body: ts.ConciseBody;
        ignoreResponse?: boolean;
    }): ts.Expression {
        const responseParameterName = ignoreResponse ? "_response" : "response";
        return ts.factory.createArrowFunction(
            undefined,
            undefined,
            [
                ts.factory.createParameterDeclaration(
                    undefined,
                    undefined,
                    undefined,
                    ts.factory.createIdentifier(responseParameterName),
                    undefined,
                    undefined,
                    undefined
                )
            ],
            undefined,
            ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            body
        );
    }

    public invokeFetcherAndReturnResponse(context: SdkContext): ts.Statement[] {
        return [...this.invokeFetcher(context), ...this.response.getReturnResponseStatements(context)];
    }

    private getReferenceToEnvironment(context: SdkContext): ts.Expression {
        const referenceToEnvironment = this.generatedSdkClientClass.getEnvironment(this.endpoint, context);
        const url = buildUrl({
            endpoint: this.endpoint,
            generatedClientClass: this.generatedSdkClientClass,
            context,
            includeSerdeLayer: this.includeSerdeLayer,
            retainOriginalCasing: this.retainOriginalCasing,
            omitUndefined: this.omitUndefined
        });
        if (url != null) {
            return context.externalDependencies.urlJoin.invoke([referenceToEnvironment, url]);
        } else {
            return referenceToEnvironment;
        }
    }

    private invokeFetcher(context: SdkContext): ts.Statement[] {
        const fetcherArgs: Fetcher.Args = {
            ...this.request.getFetcherRequestArgs(context),
            url: this.getReferenceToEnvironment(context),
            method: ts.factory.createStringLiteral(this.endpoint.method),
            timeoutInSeconds: getTimeoutExpression({
                defaultTimeoutInSeconds: this.defaultTimeoutInSeconds,
                timeoutInSecondsReference: this.generatedSdkClientClass.getReferenceToTimeoutInSeconds.bind(
                    this.generatedSdkClientClass
                )
            }),
            maxRetries: getMaxRetriesExpression({
                maxRetriesReference: this.generatedSdkClientClass.getReferenceToMaxRetries.bind(
                    this.generatedSdkClientClass
                )
            }),
            abortSignal: getAbortSignalExpression({
                abortSignalReference: this.generatedSdkClientClass.getReferenceToAbortSignal.bind(
                    this.generatedSdkClientClass
                )
            }),

            withCredentials: this.includeCredentialsOnCrossOriginRequests
        };

        if (this.endpoint.response?.body?.type === "text") {
            fetcherArgs.responseType = "text";
        }

        return [
            ts.factory.createVariableStatement(
                undefined,
                ts.factory.createVariableDeclarationList(
                    [
                        ts.factory.createVariableDeclaration(
                            this.response.getResponseVariableName(),
                            undefined,
                            undefined,
                            context.coreUtilities.fetcher.fetcher._invoke(fetcherArgs, {
                                referenceToFetcher: this.generatedSdkClientClass.getReferenceToFetcher(context),
                                cast: undefined
                            })
                        )
                    ],
                    ts.NodeFlags.Const
                )
            )
        ];
    }
}
