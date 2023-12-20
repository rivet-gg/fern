/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../..";
import * as SeedTrace from "../../../../../../api";
import * as core from "../../../../../../core";
export declare const ProblemInfoV2: core.serialization.ObjectSchema<serializers.v2.ProblemInfoV2.Raw, SeedTrace.v2.ProblemInfoV2>;
export declare namespace ProblemInfoV2 {
    interface Raw {
        problemId: serializers.ProblemId.Raw;
        problemDescription: serializers.ProblemDescription.Raw;
        problemName: string;
        problemVersion: number;
        supportedLanguages: serializers.Language.Raw[];
        customFiles: serializers.v2.CustomFiles.Raw;
        generatedFiles: serializers.v2.GeneratedFiles.Raw;
        customTestCaseTemplates: serializers.v2.TestCaseTemplate.Raw[];
        testcases: serializers.v2.TestCaseV2.Raw[];
        isPublic: boolean;
    }
}
