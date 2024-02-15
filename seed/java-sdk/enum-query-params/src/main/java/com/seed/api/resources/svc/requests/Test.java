/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.api.resources.svc.requests;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.api.core.ObjectMappers;
import com.seed.api.resources.svc.types.MyEnum;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonDeserialize(builder = Test.Builder.class)
public final class Test {
    private final Optional<MyEnum> someEnum;

    private final Map<String, Object> additionalProperties;

    private Test(Optional<MyEnum> someEnum, Map<String, Object> additionalProperties) {
        this.someEnum = someEnum;
        this.additionalProperties = additionalProperties;
    }

    @JsonProperty("some-enum")
    public Optional<MyEnum> getSomeEnum() {
        return someEnum;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof Test && equalTo((Test) other);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    private boolean equalTo(Test other) {
        return someEnum.equals(other.someEnum);
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.someEnum);
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
        private Optional<MyEnum> someEnum = Optional.empty();

        @JsonAnySetter
        private Map<String, Object> additionalProperties = new HashMap<>();

        private Builder() {}

        public Builder from(Test other) {
            someEnum(other.getSomeEnum());
            return this;
        }

        @JsonSetter(value = "some-enum", nulls = Nulls.SKIP)
        public Builder someEnum(Optional<MyEnum> someEnum) {
            this.someEnum = someEnum;
            return this;
        }

        public Builder someEnum(MyEnum someEnum) {
            this.someEnum = Optional.of(someEnum);
            return this;
        }

        public Test build() {
            return new Test(someEnum, additionalProperties);
        }
    }
}
