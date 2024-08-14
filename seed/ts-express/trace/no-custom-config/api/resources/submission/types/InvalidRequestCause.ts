/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedTrace from "../../../index";

export type InvalidRequestCause =
    /**
     * The submission request references a submission id that doesn't exist. */
    | SeedTrace.InvalidRequestCause.SubmissionIdNotFound
    | SeedTrace.InvalidRequestCause.CustomTestCasesUnsupported
    /**
     * The submission request was routed to an incorrect language executor. */
    | SeedTrace.InvalidRequestCause.UnexpectedLanguage;

export declare namespace InvalidRequestCause {
    interface SubmissionIdNotFound extends SeedTrace.SubmissionIdNotFound {
        type: "submissionIdNotFound";
    }

    interface CustomTestCasesUnsupported extends SeedTrace.CustomTestCasesUnsupported {
        type: "customTestCasesUnsupported";
    }

    interface UnexpectedLanguage extends SeedTrace.UnexpectedLanguageError {
        type: "unexpectedLanguage";
    }
}
