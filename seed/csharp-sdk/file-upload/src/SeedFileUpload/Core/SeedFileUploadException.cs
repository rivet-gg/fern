using System;

#nullable enable

namespace SeedFileUpload.Core;

/// <summary>
/// Base exception class for all exceptions thrown by the SDK.
/// </summary>
public class SeedFileUploadException(string message, Exception? innerException = null)
    : Exception(message, innerException) { }
