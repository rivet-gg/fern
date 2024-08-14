import { FERN_PACKAGE_MARKER_FILENAME } from "@fern-api/configuration";
import { RelativeFilePath } from "@fern-api/fs-utils";
import { QueryParameter, Schema } from "@fern-api/openapi-ir-sdk";
import { generateEnumNameFromValue, VALID_ENUM_NAME_REGEX } from "@fern-api/openapi-parser";
import { RawSchemas } from "@fern-api/yaml-schema";
import { buildTypeReference } from "./buildTypeReference";
import { OpenApiIrConverterContext } from "./OpenApiIrConverterContext";
import { convertAvailability } from "./utils/convertAvailability";
import { getTypeFromTypeReference } from "./utils/getTypeFromTypeReference";

export function buildQueryParameter({
    queryParameter,
    context,
    fileContainingReference
}: {
    queryParameter: QueryParameter;
    context: OpenApiIrConverterContext;
    fileContainingReference: RelativeFilePath;
}): RawSchemas.HttpQueryParameterSchema | undefined {
    const typeReference = getQueryParameterTypeReference({
        schema: queryParameter.schema,
        context,
        fileContainingReference
    });
    if (typeReference == null) {
        return undefined;
    }

    let queryParameterType = getTypeFromTypeReference(typeReference.value);

    // we can assume unknown-typed query parameteters are strings by default
    if (queryParameterType === "unknown") {
        queryParameterType = "string";
    } else if (queryParameterType === "optional<unknown>") {
        queryParameterType = "optional<string>";
    }

    if (
        queryParameter.description == null &&
        !typeReference.allowMultiple &&
        queryParameter.parameterNameOverride == null &&
        queryParameter.availability == null
    ) {
        return queryParameterType;
    }

    const queryParameterSchema: RawSchemas.HttpQueryParameterSchema = {
        type: queryParameterType
    };

    if (typeReference.allowMultiple) {
        queryParameterSchema["allow-multiple"] = true;
    }

    if (queryParameter.description != null) {
        queryParameterSchema.docs = queryParameter.description;
    }

    if (queryParameter.parameterNameOverride != null) {
        queryParameterSchema.name = queryParameter.parameterNameOverride;
    }

    if (queryParameter.availability != null) {
        queryParameterSchema.availability = convertAvailability(queryParameter.availability);
    }

    return queryParameterSchema;
}

interface QueryParameterTypeReference {
    value: RawSchemas.TypeReferenceWithDocsSchema;
    allowMultiple: boolean;
}

// TODO(dsinghvi): list query parameters are automatically converted to exploded=true,
// this may be the incorrect wire format
function getQueryParameterTypeReference({
    schema,
    context,
    fileContainingReference
}: {
    schema: Schema;
    context: OpenApiIrConverterContext;
    fileContainingReference: RelativeFilePath;
}): QueryParameterTypeReference | undefined {
    if (schema.type === "reference") {
        const resolvedSchema = context.getSchema(schema.schema);
        if (resolvedSchema == null) {
            return undefined;
        } else if (resolvedSchema.type === "array") {
            return {
                value: buildTypeReference({
                    schema: Schema.optional({
                        nameOverride: schema.nameOverride,
                        generatedName: schema.generatedName,
                        value: resolvedSchema.value,
                        description: schema.description ?? resolvedSchema.description,
                        availability: schema.availability,
                        groupName: undefined
                    }),
                    context,
                    declarationFile: RelativeFilePath.of(FERN_PACKAGE_MARKER_FILENAME),
                    fileContainingReference
                }),
                allowMultiple: true
            };
        } else if (resolvedSchema.type === "oneOf" && resolvedSchema.value.type === "undisciminated") {
            // Try to generated enum from literal values
            const potentialEnumValues: (string | RawSchemas.EnumValueSchema)[] = [];
            for (const [_, schema] of Object.entries(resolvedSchema.value.schemas)) {
                if (schema.type === "literal" && schema.value.type === "string") {
                    if (VALID_ENUM_NAME_REGEX.test(schema.value.value)) {
                        potentialEnumValues.push(schema.value.value);
                    } else {
                        potentialEnumValues.push({
                            value: schema.value.value,
                            name: generateEnumNameFromValue(schema.value.value)
                        });
                    }
                }
            }

            if (potentialEnumValues.length > 0) {
                context.builder.addType(fileContainingReference, {
                    name: schema.generatedName,
                    schema: { enum: potentialEnumValues }
                });
                return {
                    value: schema.generatedName,
                    allowMultiple: false
                };
            }

            if (resolvedSchema.value.schemas.length === 2) {
                const [firstSchema, secondSchema] = resolvedSchema.value.schemas;
                if (
                    firstSchema != null &&
                    secondSchema != null &&
                    hasSamePrimitiveValueType({ array: firstSchema, primitive: secondSchema })
                ) {
                    return {
                        value: buildTypeReference({
                            schema: Schema.optional({
                                nameOverride: schema.nameOverride,
                                generatedName: schema.generatedName,
                                value: secondSchema,
                                description: schema.description,
                                availability: schema.availability,
                                groupName: undefined
                            }),
                            context,
                            fileContainingReference
                        }),
                        allowMultiple: true
                    };
                }
                if (
                    firstSchema != null &&
                    secondSchema != null &&
                    hasSamePrimitiveValueType({ array: firstSchema, primitive: secondSchema })
                ) {
                    return {
                        value: buildTypeReference({
                            schema: Schema.optional({
                                nameOverride: schema.nameOverride,
                                generatedName: schema.generatedName,
                                value: firstSchema,
                                description: schema.description,
                                availability: schema.availability,
                                groupName: undefined
                            }),
                            context,
                            fileContainingReference
                        }),
                        allowMultiple: true
                    };
                }
            }

            // If no literal values, just pick the first schema of the undiscriminated union
            for (const [_, schema] of Object.entries(resolvedSchema.value.schemas)) {
                return getQueryParameterTypeReference({
                    schema,
                    context,
                    fileContainingReference
                });
            }
        } else if (resolvedSchema.type === "object") {
            return undefined;
        }
    }

    if (schema.type === "optional" || schema.type === "nullable") {
        if (schema.value.type === "reference") {
            const resolvedSchema = context.getSchema(schema.value.schema);
            if (resolvedSchema == null) {
                return undefined;
            } else if (resolvedSchema.type === "array") {
                return {
                    value: buildTypeReference({
                        schema: Schema.optional({
                            nameOverride: schema.nameOverride,
                            generatedName: schema.generatedName,
                            value: resolvedSchema.value,
                            description: schema.description ?? resolvedSchema.description,
                            availability: schema.availability,
                            groupName: undefined
                        }),
                        context,
                        fileContainingReference,
                        declarationFile: RelativeFilePath.of(FERN_PACKAGE_MARKER_FILENAME)
                    }),
                    allowMultiple: true
                };
            }
        }
        if (schema.value.type === "array") {
            return {
                value: buildTypeReference({
                    schema: Schema.optional({
                        nameOverride: schema.nameOverride,
                        generatedName: schema.generatedName,
                        value: schema.value.value,
                        description: schema.description,
                        availability: schema.availability,
                        groupName: undefined
                    }),
                    context,
                    fileContainingReference
                }),
                allowMultiple: true
            };
        } else if (schema.value.type === "oneOf" && schema.value.value.type === "undisciminated") {
            // Try to generated enum from literal values
            const potentialEnumValues: (string | RawSchemas.EnumValueSchema)[] = [];
            for (const [_, oneOfSchema] of Object.entries(schema.value.value.schemas)) {
                if (oneOfSchema.type === "literal" && oneOfSchema.value.type === "string") {
                    if (VALID_ENUM_NAME_REGEX.test(oneOfSchema.value.value)) {
                        potentialEnumValues.push(oneOfSchema.value.value);
                    } else {
                        potentialEnumValues.push({
                            value: oneOfSchema.value.value,
                            name: generateEnumNameFromValue(oneOfSchema.value.value)
                        });
                    }
                }
            }

            if (potentialEnumValues.length > 0) {
                context.builder.addType(fileContainingReference, {
                    name: schema.generatedName,
                    schema: { enum: potentialEnumValues }
                });
                return {
                    value: `optional<${schema.value.value.generatedName}>`,
                    allowMultiple: false
                };
            }

            if (schema.value.value.schemas.length === 2) {
                const [firstSchema, secondSchema] = schema.value.value.schemas;
                if (
                    firstSchema != null &&
                    secondSchema != null &&
                    hasSamePrimitiveValueType({ array: firstSchema, primitive: secondSchema })
                ) {
                    return {
                        value: buildTypeReference({
                            schema: Schema.optional({
                                nameOverride: schema.nameOverride,
                                generatedName: schema.generatedName,
                                value: secondSchema,
                                description: schema.description,
                                availability: schema.availability,
                                groupName: undefined
                            }),
                            context,
                            fileContainingReference
                        }),
                        allowMultiple: true
                    };
                }
                if (
                    firstSchema != null &&
                    secondSchema != null &&
                    hasSamePrimitiveValueType({ array: secondSchema, primitive: firstSchema })
                ) {
                    return {
                        value: buildTypeReference({
                            schema: Schema.optional({
                                nameOverride: schema.nameOverride,
                                generatedName: schema.generatedName,
                                value: firstSchema,
                                description: schema.description,
                                availability: schema.availability,
                                groupName: undefined
                            }),
                            context,
                            fileContainingReference
                        }),
                        allowMultiple: true
                    };
                }
            }

            // If no literal values, just pick the first schema of the undiscriminated union
            for (const [_, oneOfSchema] of Object.entries(schema.value.value.schemas)) {
                return getQueryParameterTypeReference({
                    schema: Schema.optional({
                        nameOverride: schema.nameOverride,
                        generatedName: schema.generatedName,
                        value: oneOfSchema,
                        description: undefined,
                        availability: schema.availability,
                        groupName: undefined
                    }),
                    context,
                    fileContainingReference
                });
            }
        } else if (schema.value.type === "object") {
            return undefined;
        }
        return {
            value: buildTypeReference({
                schema,
                context,
                fileContainingReference
            }),
            allowMultiple: false
        };
    }

    if (schema.type === "array") {
        return {
            value: buildTypeReference({
                schema: Schema.optional({
                    nameOverride: schema.nameOverride,
                    generatedName: schema.generatedName,
                    value: schema.value,
                    description: schema.description,
                    availability: schema.availability,
                    groupName: undefined
                }),
                context,
                fileContainingReference
            }),
            allowMultiple: true
        };
    } else {
        return {
            value: buildTypeReference({
                schema,
                context,
                fileContainingReference
            }),
            allowMultiple: false
        };
    }
}

function hasSamePrimitiveValueType({ array, primitive }: { array: Schema; primitive: Schema }): boolean {
    return (
        array?.type === "array" &&
        array.value.type === "primitive" &&
        primitive?.type === "primitive" &&
        array.value.schema.type === primitive.schema.type
    );
}
