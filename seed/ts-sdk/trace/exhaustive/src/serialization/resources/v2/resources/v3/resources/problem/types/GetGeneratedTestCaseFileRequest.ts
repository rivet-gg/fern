/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../../index";
import * as SeedTrace from "../../../../../../../../api/index";
import * as core from "../../../../../../../../core";
import { TestCaseTemplate } from "./TestCaseTemplate";
import { TestCaseV2 } from "./TestCaseV2";

export const GetGeneratedTestCaseFileRequest: core.serialization.ObjectSchema<serializers.v2.v3.GetGeneratedTestCaseFileRequest.Raw, SeedTrace.v2.v3.GetGeneratedTestCaseFileRequest> = core.serialization.object({
        "template": TestCaseTemplate.optional(),
        "testCase": TestCaseV2
    });

export declare namespace GetGeneratedTestCaseFileRequest {
    interface Raw {
        "template"?: TestCaseTemplate.Raw | null;
        "testCase": TestCaseV2.Raw;
    }
}
