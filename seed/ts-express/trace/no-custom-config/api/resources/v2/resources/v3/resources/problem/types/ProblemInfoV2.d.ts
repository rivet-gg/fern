/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as SeedTrace from "../../../../../../..";
export interface ProblemInfoV2 {
    problemId: SeedTrace.ProblemId;
    problemDescription: SeedTrace.ProblemDescription;
    problemName: string;
    problemVersion: number;
    supportedLanguages: Set<SeedTrace.Language>;
    customFiles: SeedTrace.v2.v3.CustomFiles;
    generatedFiles: SeedTrace.v2.v3.GeneratedFiles;
    customTestCaseTemplates: SeedTrace.v2.v3.TestCaseTemplate[];
    testcases: SeedTrace.v2.v3.TestCaseV2[];
    isPublic: boolean;
}
