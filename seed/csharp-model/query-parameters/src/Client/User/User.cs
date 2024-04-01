using System.Text.Json.Serialization;

namespace Client;

public class User
{
    [JsonPropertyName("name")]
    public string Name { get; init; }

    [JsonPropertyName("tags")]
    public List<string> Tags { get; init; }
}