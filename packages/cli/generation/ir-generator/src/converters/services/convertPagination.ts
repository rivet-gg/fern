import { assertNever } from "@fern-api/core-utils";
import { Pagination } from "@fern-api/ir-sdk";
import { RawSchemas } from "@fern-api/yaml-schema";
import { FernFileContext } from "../../FernFileContext";
import { PropertyResolver } from "../../resolvers/PropertyResolver";
import { convertCursorPagination } from "./convertCursorPagination";
import { convertOffsetPagination } from "./convertOffsetPagination";
import { getPaginationPropertyComponents } from "./convertPaginationUtils";

export async function convertPagination({
    propertyResolver,
    file,
    endpointName,
    endpointSchema
}: {
    propertyResolver: PropertyResolver;
    file: FernFileContext;
    endpointName: string;
    endpointSchema: RawSchemas.HttpEndpointSchema;
}): Promise<Pagination | undefined> {
    const endpointPagination =
        typeof endpointSchema.pagination === "boolean" ? file.rootApiFile.pagination : endpointSchema.pagination;
    if (!endpointPagination) {
        return undefined;
    }
    const paginationPropertyComponents = getPaginationPropertyComponents(endpointPagination);
    switch (paginationPropertyComponents.type) {
        case "cursor":
            return await convertCursorPagination({
                propertyResolver,
                file,
                endpointName,
                endpointSchema,
                paginationPropertyComponents
            });
        case "offset":
            return convertOffsetPagination({
                propertyResolver,
                file,
                endpointName,
                endpointSchema,
                paginationPropertyComponents
            });
        default:
            assertNever(paginationPropertyComponents);
    }
}
