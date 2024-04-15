using System.Text.Json.Serialization;
using SeedExamples;

namespace SeedExamples;

public class Node
{
    [JsonPropertyName("name")]
    public string Name { get; init; }

    [JsonPropertyName("nodes")]
    public List<List<List<Node>>?> Nodes { get; init; }

    [JsonPropertyName("trees")]
    public List<List<List<Tree>>?> Trees { get; init; }
}