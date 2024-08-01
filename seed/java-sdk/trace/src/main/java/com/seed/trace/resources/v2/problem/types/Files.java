/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.trace.resources.v2.problem.types;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.trace.core.ObjectMappers;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = Files.Builder.class)
public final class Files {
    private final List<FileInfoV2> files;

    private final Map<String, Object> additionalProperties;

    private Files(List<FileInfoV2> files, Map<String, Object> additionalProperties) {
        this.files = files;
        this.additionalProperties = additionalProperties;
    }

    @JsonProperty("files")
    public List<FileInfoV2> getFiles() {
        return files;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof Files && equalTo((Files) other);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    private boolean equalTo(Files other) {
        return files.equals(other.files);
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.files);
    }

    @java.lang.Override
    public String toString() {
        return ObjectMappers.stringify(this);
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder {
        private List<FileInfoV2> files = new ArrayList<>();

        @JsonAnySetter
        private Map<String, Object> additionalProperties = new HashMap<>();

        private Builder() {}

        public Builder from(Files other) {
            files(other.getFiles());
            return this;
        }

        @JsonSetter(value = "files", nulls = Nulls.SKIP)
        public Builder files(List<FileInfoV2> files) {
            this.files.clear();
            this.files.addAll(files);
            return this;
        }

        public Builder addFiles(FileInfoV2 files) {
            this.files.add(files);
            return this;
        }

        public Builder addAllFiles(List<FileInfoV2> files) {
            this.files.addAll(files);
            return this;
        }

        public Files build() {
            return new Files(files, additionalProperties);
        }
    }
}
