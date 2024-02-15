/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedTrace from "../../../../../../..";

export type TestCaseImplementationDescriptionBoard =
    | SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard.Html
    | SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard.ParamId
    | SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard._Unknown;

export declare namespace TestCaseImplementationDescriptionBoard {
    interface Html extends _Utils {
        type: "html";
        value: string;
    }

    interface ParamId extends _Utils {
        type: "paramId";
        value: SeedTrace.v2.v3.ParameterId;
    }

    interface _Unknown extends _Utils {
        type: void;
    }

    interface _Utils {
        _visit: <_Result>(visitor: SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard._Visitor<_Result>) => _Result;
    }

    interface _Visitor<_Result> {
        html: (value: string) => _Result;
        paramId: (value: SeedTrace.v2.v3.ParameterId) => _Result;
        _other: (value: { type: string }) => _Result;
    }
}

export const TestCaseImplementationDescriptionBoard = {
    html: (value: string): SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard.Html => {
        return {
            value: value,
            type: "html",
            _visit: function <_Result>(
                this: SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard.Html,
                visitor: SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard._Visitor<_Result>
            ) {
                return SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard._visit(this, visitor);
            },
        };
    },

    paramId: (value: SeedTrace.v2.v3.ParameterId): SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard.ParamId => {
        return {
            value: value,
            type: "paramId",
            _visit: function <_Result>(
                this: SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard.ParamId,
                visitor: SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard._Visitor<_Result>
            ) {
                return SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard._visit(this, visitor);
            },
        };
    },

    _unknown: (value: { type: string }): SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard._Unknown => {
        return {
            ...(value as any),
            _visit: function <_Result>(
                this: SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard._Unknown,
                visitor: SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard._Visitor<_Result>
            ) {
                return SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard._visit(this, visitor);
            },
        };
    },

    _visit: <_Result>(
        value: SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard,
        visitor: SeedTrace.v2.v3.TestCaseImplementationDescriptionBoard._Visitor<_Result>
    ): _Result => {
        switch (value.type) {
            case "html":
                return visitor.html(value.value);
            case "paramId":
                return visitor.paramId(value.value);
            default:
                return visitor._other(value as any);
        }
    },
} as const;
