using System.Text.Json.Serialization;

namespace Client.V2;

public class FunctionImplementation
{
    [JsonPropertyName("impl")]
    public string Impl { get; init; }

    [JsonPropertyName("imports")]
    public string? Imports { get; init; }
}