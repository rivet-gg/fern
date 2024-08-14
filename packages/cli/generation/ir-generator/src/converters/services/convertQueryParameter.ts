import { QueryParameter } from "@fern-api/ir-sdk";
import { RawSchemas } from "@fern-api/yaml-schema";
import { FernFileContext } from "../../FernFileContext";
import { convertDeclaration } from "../convertDeclaration";

export async function convertQueryParameter({
    file,
    queryParameterKey,
    queryParameter
}: {
    file: FernFileContext;
    queryParameterKey: string;
    queryParameter: RawSchemas.HttpQueryParameterSchema;
}): Promise<QueryParameter> {
    const { name } = getQueryParameterName({ queryParameterKey, queryParameter });
    const valueType = file.parseTypeReference(queryParameter);
    return {
        ...(await convertDeclaration(queryParameter)),
        name: file.casingsGenerator.generateNameAndWireValue({
            wireValue: queryParameterKey,
            name
        }),
        valueType,
        allowMultiple:
            typeof queryParameter !== "string" && queryParameter["allow-multiple"] != null
                ? queryParameter["allow-multiple"]
                : false
    };
}

export function getQueryParameterName({
    queryParameterKey,
    queryParameter
}: {
    queryParameterKey: string;
    queryParameter: RawSchemas.HttpQueryParameterSchema;
}): { name: string; wasExplicitlySet: boolean } {
    if (typeof queryParameter !== "string") {
        if (queryParameter.name != null) {
            return { name: queryParameter.name, wasExplicitlySet: true };
        }
    }
    return { name: queryParameterKey, wasExplicitlySet: false };
}
