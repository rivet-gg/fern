/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../../index";
import * as SeedTrace from "../../../../../../../../api/index";
import * as core from "../../../../../../../../core";

export const TestCaseImplementation: core.serialization.ObjectSchema<
    serializers.v2.v3.TestCaseImplementation.Raw,
    SeedTrace.v2.v3.TestCaseImplementation
> = core.serialization.object({
    description: core.serialization.lazyObject(
        async () => (await import("../../../../../../..")).v2.v3.TestCaseImplementationDescription
    ),
    function: core.serialization.lazy(async () => (await import("../../../../../../..")).v2.v3.TestCaseFunction),
});

export declare namespace TestCaseImplementation {
    interface Raw {
        description: serializers.v2.v3.TestCaseImplementationDescription.Raw;
        function: serializers.v2.v3.TestCaseFunction.Raw;
    }
}