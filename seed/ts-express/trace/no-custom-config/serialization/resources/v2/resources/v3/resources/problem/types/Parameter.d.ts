/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../../..";
import * as SeedTrace from "../../../../../../../../api";
import * as core from "../../../../../../../../core";
export declare const Parameter: core.serialization.ObjectSchema<serializers.v2.v3.Parameter.Raw, SeedTrace.v2.v3.Parameter>;
export declare namespace Parameter {
    interface Raw {
        parameterId: serializers.v2.v3.ParameterId.Raw;
        name: string;
        variableType: serializers.VariableType.Raw;
    }
}
