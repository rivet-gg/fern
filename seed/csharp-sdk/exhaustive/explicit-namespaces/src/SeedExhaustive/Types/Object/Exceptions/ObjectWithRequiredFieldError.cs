using SeedExhaustive.Core;
using SeedExhaustive.Types.Object;

#nullable enable

namespace SeedExhaustive.Types.Object;

/// <summary>
/// This exception type will be thrown for any non-2XX API responses.
/// </summary>
public class ObjectWithRequiredFieldError(ObjectWithRequiredField body)
    : SeedExhaustiveApiException("ObjectWithRequiredFieldError", 400, body)
{
    /// <summary>
    /// The body of the response that triggered the exception.
    /// </summary>
    public new ObjectWithRequiredField Body { get; } = body;
}
