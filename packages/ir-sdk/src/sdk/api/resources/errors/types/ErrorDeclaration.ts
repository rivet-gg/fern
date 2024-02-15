/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernIr from "../../..";

export interface ErrorDeclaration extends FernIr.WithDocs {
    name: FernIr.DeclaredErrorName;
    discriminantValue: FernIr.NameAndWireValue;
    type: FernIr.TypeReference | undefined;
    statusCode: number;
}
