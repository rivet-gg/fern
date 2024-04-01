using System.Text.Json.Serialization;
using StringEnum;
using Client;
using Client.V2;

namespace Client.V2;

public class GeneratedFiles
{
    [JsonPropertyName("generatedTestCaseFiles")]
    public Dictionary<StringEnum<Language>, Files> GeneratedTestCaseFiles { get; init; }

    [JsonPropertyName("generatedTemplateFiles")]
    public Dictionary<StringEnum<Language>, Files> GeneratedTemplateFiles { get; init; }

    [JsonPropertyName("other")]
    public Dictionary<StringEnum<Language>, Files> Other { get; init; }
}