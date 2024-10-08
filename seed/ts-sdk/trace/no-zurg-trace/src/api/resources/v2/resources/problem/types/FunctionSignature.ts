/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedTrace from "../../../../../index";

export type FunctionSignature = 
    | SeedTrace.v2.FunctionSignature.Void
    | SeedTrace.v2.FunctionSignature.NonVoid
    /**
     * Useful when specifying custom grading for a testcase where actualResult is defined. */
    | SeedTrace.v2.FunctionSignature.VoidThatTakesActualResult;

export declare namespace FunctionSignature {
    interface Void extends SeedTrace.v2.VoidFunctionSignature {
        type: "void";
    }

    interface NonVoid extends SeedTrace.v2.NonVoidFunctionSignature {
        type: "nonVoid";
    }

    interface VoidThatTakesActualResult extends SeedTrace.v2.VoidFunctionSignatureThatTakesActualResult {
        type: "voidThatTakesActualResult";
    }
}
