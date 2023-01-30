import { ImportsManager, Reference } from "@fern-typescript/commons";
import { GeneratedGenericAPISdkError, GenericAPISdkErrorContextMixin } from "@fern-typescript/contexts";
import { GenericAPISdkErrorGenerator } from "@fern-typescript/generic-sdk-error-generators";
import { SourceFile } from "ts-morph";
import { GenericAPISdkErrorDeclarationReferencer } from "../../declaration-referencers/GenericAPISdkErrorDeclarationReferencer";

export declare namespace GenericAPISdkErrorContextMixinImpl {
    export interface Init {
        genericAPISdkErrorDeclarationReferencer: GenericAPISdkErrorDeclarationReferencer;
        genericAPISdkErrorGenerator: GenericAPISdkErrorGenerator;
        importsManager: ImportsManager;
        sourceFile: SourceFile;
    }
}

export class GenericAPISdkErrorContextMixinImpl implements GenericAPISdkErrorContextMixin {
    private genericAPISdkErrorDeclarationReferencer: GenericAPISdkErrorDeclarationReferencer;
    private genericAPISdkErrorGenerator: GenericAPISdkErrorGenerator;
    private importsManager: ImportsManager;
    private sourceFile: SourceFile;

    constructor({
        genericAPISdkErrorDeclarationReferencer,
        genericAPISdkErrorGenerator,
        importsManager,
        sourceFile,
    }: GenericAPISdkErrorContextMixinImpl.Init) {
        this.importsManager = importsManager;
        this.sourceFile = sourceFile;
        this.genericAPISdkErrorDeclarationReferencer = genericAPISdkErrorDeclarationReferencer;
        this.genericAPISdkErrorGenerator = genericAPISdkErrorGenerator;
    }

    public getReferenceToGenericAPISdkError(): Reference {
        return this.genericAPISdkErrorDeclarationReferencer.getReferenceToError({
            importsManager: this.importsManager,
            referencedIn: this.sourceFile,
        });
    }

    public getGeneratedGenericAPISdkError(): GeneratedGenericAPISdkError {
        return this.genericAPISdkErrorGenerator.generateGenericAPISdkError({
            errorClassName: this.genericAPISdkErrorDeclarationReferencer.getExportedName(),
        });
    }
}
