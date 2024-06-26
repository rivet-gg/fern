/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as SeedTrace from "../../../../api";
import * as core from "../../../../core";

export const TestCaseGrade: core.serialization.Schema<serializers.TestCaseGrade.Raw, SeedTrace.TestCaseGrade> =
    core.serialization
        .union("type", {
            hidden: core.serialization.lazyObject(async () => (await import("../../..")).TestCaseHiddenGrade),
            nonHidden: core.serialization.lazyObject(async () => (await import("../../..")).TestCaseNonHiddenGrade),
        })
        .transform<SeedTrace.TestCaseGrade>({
            transform: (value) => {
                switch (value.type) {
                    case "hidden":
                        return SeedTrace.TestCaseGrade.hidden(value);
                    case "nonHidden":
                        return SeedTrace.TestCaseGrade.nonHidden(value);
                    default:
                        return SeedTrace.TestCaseGrade._unknown(value);
                }
            },
            untransform: ({ _visit, ...value }) => value as any,
        });

export declare namespace TestCaseGrade {
    type Raw = TestCaseGrade.Hidden | TestCaseGrade.NonHidden;

    interface Hidden extends serializers.TestCaseHiddenGrade.Raw {
        type: "hidden";
    }

    interface NonHidden extends serializers.TestCaseNonHiddenGrade.Raw {
        type: "nonHidden";
    }
}
