/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../..";
import * as Fiddle from "../../../../../../api";
import * as core from "../../../../../../core";

export const Animal: core.serialization.Schema<serializers.types.Animal.Raw, Fiddle.types.Animal> = core.serialization
    .union("animal", {
        dog: core.serialization.lazyObject(async () => (await import("../../../../..")).types.Dog),
        cat: core.serialization.lazyObject(async () => (await import("../../../../..")).types.Cat),
    })
    .transform<Fiddle.types.Animal>({
        transform: (value) => {
            switch (value.animal) {
                case "dog":
                    return Fiddle.types.Animal.dog(value);
                case "cat":
                    return Fiddle.types.Animal.cat(value);
                default:
                    return Fiddle.types.Animal._unknown(value);
            }
        },
        untransform: ({ _visit, ...value }) => value as any,
    });

export declare namespace Animal {
    type Raw = Animal.Dog | Animal.Cat;

    interface Dog extends serializers.types.Dog.Raw {
        animal: "dog";
    }

    interface Cat extends serializers.types.Cat.Raw {
        animal: "cat";
    }
}