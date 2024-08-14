/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as FernIr from "../../..";

export type NamedTypeDefault = FernIr.NamedTypeDefault.Enum;

export declare namespace NamedTypeDefault {
    interface Enum extends FernIr.EnumValue, _Utils {
        type: "enum";
    }

    interface _Utils {
        _visit: <_Result>(visitor: FernIr.NamedTypeDefault._Visitor<_Result>) => _Result;
    }

    interface _Visitor<_Result> {
        enum: (value: FernIr.EnumValue) => _Result;
        _other: (value: { type: string }) => _Result;
    }
}

export const NamedTypeDefault = {
    enum: (value: FernIr.EnumValue): FernIr.NamedTypeDefault.Enum => {
        return {
            ...value,
            type: "enum",
            _visit: function <_Result>(
                this: FernIr.NamedTypeDefault.Enum,
                visitor: FernIr.NamedTypeDefault._Visitor<_Result>
            ) {
                return FernIr.NamedTypeDefault._visit(this, visitor);
            },
        };
    },

    _visit: <_Result>(value: FernIr.NamedTypeDefault, visitor: FernIr.NamedTypeDefault._Visitor<_Result>): _Result => {
        switch (value.type) {
            case "enum":
                return visitor.enum(value);
            default:
                return visitor._other(value as any);
        }
    },
} as const;
