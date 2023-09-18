import {
    Header,
    HttpMethod,
    PathParameter,
    PrimitiveSchemaValue,
    QueryParameter,
    Schema,
} from "@fern-fern/openapi-ir-model/ir";
import { OpenAPIV3 } from "openapi-types";
import { getVariableReference } from "../extensions/getVariableReference";
import { AbstractOpenAPIV3_1ParserContext } from "../v3.1/AbstractOpenAPIV3_1ParserContext";
import { convertSchema } from "../v3.1/converters/convertSchemas";
import { isReferenceObject } from "../v3.1/utils/isReferenceObject";

export interface ConvertedParameters {
    pathParameters: PathParameter[];
    queryParameters: QueryParameter[];
    headers: Header[];
}

export function convertParameters({
    path,
    httpMethod,
    parameters,
    context,
    requestBreadcrumbs,
}: {
    path: string;
    httpMethod: HttpMethod;
    parameters: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[];
    context: AbstractOpenAPIParserContext;
    requestBreadcrumbs: string[];
}): ConvertedParameters {
    const convertedParameters: ConvertedParameters = {
        pathParameters: [],
        queryParameters: [],
        headers: [],
    };
    for (const parameter of parameters) {
        const resolvedParameter = isReferenceObject(parameter)
            ? context.resolveParameterReference(parameter)
            : parameter;

        const isRequired = resolvedParameter.required ?? false;

        let schema =
            resolvedParameter.schema != null
                ? convertSchema(resolvedParameter.schema, !isRequired, context, [
                      ...requestBreadcrumbs,
                      resolvedParameter.name,
                  ])
                : isRequired
                ? Schema.primitive({
                      schema: PrimitiveSchemaValue.string({
                          minLength: undefined,
                          maxLength: undefined,
                      }),
                      description: undefined,
                  })
                : Schema.optional({
                      value: Schema.primitive({
                          schema: PrimitiveSchemaValue.string({
                              minLength: undefined,
                              maxLength: undefined,
                          }),
                          description: undefined,
                      }),
                      description: undefined,
                  });
        if (
            resolvedParameter.in === "header" &&
            resolvedParameter.schema != null &&
            !isReferenceObject(resolvedParameter.schema) &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (resolvedParameter.schema as any).default != null
        ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const defaultValue = (resolvedParameter.schema as any).default;
            if (typeof defaultValue === "string" && defaultValue.length > 0) {
                schema = Schema.literal({
                    value: defaultValue,
                    description: undefined,
                });
            }
        }

        const convertedParameter = {
            name: resolvedParameter.name,
            schema,
            description: resolvedParameter.description,
        };
        if (resolvedParameter.in === "query") {
            convertedParameters.queryParameters.push(convertedParameter);
        } else if (resolvedParameter.in === "path") {
            convertedParameters.pathParameters.push({
                ...convertedParameter,
                variableReference: getVariableReference(resolvedParameter),
            });
        } else if (resolvedParameter.in === "header") {
            if (!HEADERS_TO_SKIP.has(resolvedParameter.name) && !context.authHeaders.has(resolvedParameter.name)) {
                convertedParameters.headers.push(convertedParameter);
            } else {
                context.logger.debug(
                    `Ignoring ${resolvedParameter.name} header, in ${httpMethod.toUpperCase()} ${path}`
                );
            }
        } else {
            context.logger.warn(
                `Skipping ${resolvedParameter.in} parameter, ${
                    resolvedParameter.name
                }, in ${httpMethod.toUpperCase()} ${path}`
            );
        }
    }
    return convertedParameters;
}

const HEADERS_TO_SKIP = new Set([
    "User-Agent",
    "Content-Length",
    "Content-Type",
    "X-Forwarded-For",
    "Cookie",
    "Origin",
    "Content-Disposition",
    "X-Ping-Custom-Domain",
]);
