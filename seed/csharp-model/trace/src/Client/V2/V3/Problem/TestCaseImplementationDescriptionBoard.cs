using System.Text.Json.Serialization;

namespace Client.V2.V3;

public class TestCaseImplementationDescriptionBoard
{
    public class _Html
    {
        [JsonPropertyName("type")]
        public string Type { get; } = "html";

        [JsonPropertyName("value")]
        public string Value { get; init; }
    }
    public class _ParamId
    {
        [JsonPropertyName("type")]
        public string Type { get; } = "paramId";

        [JsonPropertyName("value")]
        public string Value { get; init; }
    }
}