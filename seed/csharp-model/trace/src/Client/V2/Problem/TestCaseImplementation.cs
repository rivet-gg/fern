using System.Text.Json.Serialization;
using Client.V2;
using OneOf;

namespace Client.V2;

public class TestCaseImplementation
{
    [JsonPropertyName("description")]
    public TestCaseImplementationDescription Description { get; init; }

    [JsonPropertyName("function")]
    public OneOf<TestCaseFunction._WithActualResult, TestCaseFunction._Custom> Function { get; init; }
}