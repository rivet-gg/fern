using System.Text.Json.Serialization;
using SeedObjectsWithImports.Commons;

#nullable enable

namespace SeedObjectsWithImports;

public record Node
{
    [JsonPropertyName("id")]
    public required string Id { get; set; }

    [JsonPropertyName("label")]
    public string? Label { get; set; }

    [JsonPropertyName("metadata")]
    public Metadata? Metadata { get; set; }
}
