/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../..";
import * as SeedTrace from "../../../../../../../../api";
import * as core from "../../../../../../../../core";

export const TestCaseTemplateId: core.serialization.Schema<
    serializers.v2.v3.TestCaseTemplateId.Raw,
    SeedTrace.v2.v3.TestCaseTemplateId
> = core.serialization.string().transform({
    transform: SeedTrace.v2.v3.TestCaseTemplateId,
    untransform: (value) => value,
});

export declare namespace TestCaseTemplateId {
    type Raw = string;
}
