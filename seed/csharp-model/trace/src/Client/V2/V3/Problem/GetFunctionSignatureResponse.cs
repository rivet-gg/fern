using System.Text.Json.Serialization;
using StringEnum;
using Client;

namespace Client.V2.V3;

public class GetFunctionSignatureResponse
{
    [JsonPropertyName("functionByLanguage")]
    public Dictionary<StringEnum<Language>, string> FunctionByLanguage { get; init; }
}