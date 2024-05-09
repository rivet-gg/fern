import { TaskContext } from "@fern-api/task-context";
import { GeneratorGroupSchema } from "./schemas/GeneratorGroupSchema";
import {
    DEFAULT_GROUP_GENERATORS_CONFIG_KEY,
    GeneratorsConfigurationSchema
} from "./schemas/GeneratorsConfigurationSchema";

export async function updateGeneratorGroup({
    generatorsConfiguration,
    groupName = generatorsConfiguration[DEFAULT_GROUP_GENERATORS_CONFIG_KEY],
    context,
    update
}: {
    generatorsConfiguration: GeneratorsConfigurationSchema;
    groupName: string | undefined;
    context: TaskContext;
    update: (draft: GeneratorGroupSchema, groupName: string) => Promise<void>;
}): Promise<GeneratorsConfigurationSchema> {
    if (groupName == null) {
        return context.failAndThrow("No group specified.");
    }
    const groups = (generatorsConfiguration.groups ??= {});
    for (const groupName of Object.keys(groups)) {
        const draftGroup = (groups[groupName] ??= { generators: [] });
        await update(draftGroup, groupName);
    }

    return generatorsConfiguration;
}
