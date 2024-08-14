/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedTrace from "../../../index";

export type ErrorInfo = 
    | SeedTrace.ErrorInfo.CompileError
    /**
     * If the submission cannot be executed and throws a runtime error before getting to any of the testcases.
     *  */
    | SeedTrace.ErrorInfo.RuntimeError
    /**
     * If the trace backend encounters an unexpected error.
     *  */
    | SeedTrace.ErrorInfo.InternalError;

export declare namespace ErrorInfo {
    interface CompileError extends SeedTrace.CompileError {
        type: "compileError";
    }

    interface RuntimeError extends SeedTrace.RuntimeError {
        type: "runtimeError";
    }

    interface InternalError extends SeedTrace.InternalError {
        type: "internalError";
    }
}
