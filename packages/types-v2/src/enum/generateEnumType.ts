import { EnumTypeDeclaration, EnumValue } from "@fern-fern/ir-model/types";
import {
    FernWriters,
    getTextOfTsNode,
    getWriterForMultiLineUnionType,
    maybeAddDocs,
    visitorUtils,
} from "@fern-typescript/commons";
import { File } from "@fern-typescript/declaration-handler";
import lowerFirst from "lodash-es/lowerFirst";
import { ts, VariableDeclarationKind, WriterFunction } from "ts-morph";
import { getKeyForEnum } from "./utils";

export const ENUM_VALUES_PROPERTY_KEY = "_values";

export function generateEnumType({
    file,
    typeName,
    docs,
    shape,
}: {
    file: File;
    typeName: string;
    docs: string | null | undefined;
    shape: EnumTypeDeclaration;
}): void {
    const typeAlias = file.sourceFile.addTypeAlias({
        name: typeName,
        type: getWriterForMultiLineUnionType(
            shape.values.map((value) => ({
                node: ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(value.value)),
                docs: value.docs,
            }))
        ),
        isExported: true,
    });
    maybeAddDocs(typeAlias, docs);

    const visitorItems: visitorUtils.VisitableItems = {
        items: shape.values.map((value) => ({
            caseInSwitchStatement: getEnumValueReference({ typeName, enumValue: value }),
            keyInVisitor: lowerFirst(getKeyForEnum(value)),
            visitorArgument: undefined,
        })),
        unknownArgument: undefined,
    };

    file.sourceFile.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name: typeName,
                initializer: createUtils({ shape, typeName, visitorItems }),
            },
        ],
        isExported: true,
    });

    const moduleDeclaration = file.sourceFile.addModule({
        name: typeName,
        isExported: true,
        hasDeclareKeyword: true,
    });

    for (const value of shape.values) {
        moduleDeclaration.addTypeAlias({
            name: getKeyForEnum(value),
            type: getTextOfTsNode(ts.factory.createStringLiteral(value.value)),
        });
    }

    moduleDeclaration.addInterface(visitorUtils.generateVisitorInterface({ items: visitorItems }));
}

function createUtils({
    shape,
    typeName,
    visitorItems,
}: {
    shape: EnumTypeDeclaration;
    typeName: string;
    visitorItems: visitorUtils.VisitableItems;
}): WriterFunction {
    const writer = FernWriters.object.writer({ asConst: true });

    for (const value of shape.values) {
        writer.addProperty({
            key: getKeyForEnum(value),
            value: getTextOfTsNode(ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(value.value))),
        });
    }

    writer.addNewLine();
    writer.addProperty({
        key: visitorUtils.VISIT_PROPERTY_NAME,
        value: getTextOfTsNode(
            visitorUtils.generateVisitMethod({
                typeName,
                switchOn: ts.factory.createIdentifier(visitorUtils.VALUE_PARAMETER_NAME),
                items: visitorItems,
            })
        ),
    });

    writer.addNewLine();

    writer.addProperty({
        key: ENUM_VALUES_PROPERTY_KEY,
        value: getTextOfTsNode(
            ts.factory.createArrowFunction(
                undefined,
                undefined,
                [],
                ts.factory.createArrayTypeNode(
                    ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(typeName))
                ),
                undefined,
                ts.factory.createArrayLiteralExpression(
                    shape.values.map((enumValue) => getEnumValueReference({ typeName, enumValue }))
                )
            )
        ),
    });

    return writer.toFunction();
}

function getEnumValueReference({ typeName, enumValue }: { typeName: string; enumValue: EnumValue }) {
    return ts.factory.createPropertyAccessExpression(
        ts.factory.createIdentifier(typeName),
        ts.factory.createIdentifier(getKeyForEnum(enumValue))
    );
}
