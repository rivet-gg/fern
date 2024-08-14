/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.trace.resources.submission.types;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.trace.core.ObjectMappers;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = WorkspaceTracedUpdate.Builder.class)
public final class WorkspaceTracedUpdate {
    private final int traceResponsesSize;

    private final Map<String, Object> additionalProperties;

    private WorkspaceTracedUpdate(int traceResponsesSize, Map<String, Object> additionalProperties) {
        this.traceResponsesSize = traceResponsesSize;
        this.additionalProperties = additionalProperties;
    }

    @JsonProperty("traceResponsesSize")
    public int getTraceResponsesSize() {
        return traceResponsesSize;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof WorkspaceTracedUpdate && equalTo((WorkspaceTracedUpdate) other);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    private boolean equalTo(WorkspaceTracedUpdate other) {
        return traceResponsesSize == other.traceResponsesSize;
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.traceResponsesSize);
    }

    @java.lang.Override
    public String toString() {
        return ObjectMappers.stringify(this);
    }

    public static TraceResponsesSizeStage builder() {
        return new Builder();
    }

    public interface TraceResponsesSizeStage {
        _FinalStage traceResponsesSize(int traceResponsesSize);

        Builder from(WorkspaceTracedUpdate other);
    }

    public interface _FinalStage {
        WorkspaceTracedUpdate build();
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder implements TraceResponsesSizeStage, _FinalStage {
        private int traceResponsesSize;

        @JsonAnySetter
        private Map<String, Object> additionalProperties = new HashMap<>();

        private Builder() {}

        @java.lang.Override
        public Builder from(WorkspaceTracedUpdate other) {
            traceResponsesSize(other.getTraceResponsesSize());
            return this;
        }

        @java.lang.Override
        @JsonSetter("traceResponsesSize")
        public _FinalStage traceResponsesSize(int traceResponsesSize) {
            this.traceResponsesSize = traceResponsesSize;
            return this;
        }

        @java.lang.Override
        public WorkspaceTracedUpdate build() {
            return new WorkspaceTracedUpdate(traceResponsesSize, additionalProperties);
        }
    }
}
