/**
 * This file was auto-generated by Fern from our API Definition.
 */
package com.seed.multiLineDocs.resources.user.requests;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.seed.multiLineDocs.core.ObjectMappers;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = CreateUserRequest.Builder.class)
public final class CreateUserRequest {
    private final String name;

    private final Optional<Integer> age;

    private final Map<String, Object> additionalProperties;

    private CreateUserRequest(String name, Optional<Integer> age, Map<String, Object> additionalProperties) {
        this.name = name;
        this.age = age;
        this.additionalProperties = additionalProperties;
    }

    /**
     * @return The name of the user to create.
     * This name is unique to each user.
     */
    @JsonProperty("name")
    public String getName() {
        return name;
    }

    /**
     * @return The age of the user.
     * This propery is not required.
     */
    @JsonProperty("age")
    public Optional<Integer> getAge() {
        return age;
    }

    @java.lang.Override
    public boolean equals(Object other) {
        if (this == other) return true;
        return other instanceof CreateUserRequest && equalTo((CreateUserRequest) other);
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    private boolean equalTo(CreateUserRequest other) {
        return name.equals(other.name) && age.equals(other.age);
    }

    @java.lang.Override
    public int hashCode() {
        return Objects.hash(this.name, this.age);
    }

    @java.lang.Override
    public String toString() {
        return ObjectMappers.stringify(this);
    }

    public static NameStage builder() {
        return new Builder();
    }

    public interface NameStage {
        _FinalStage name(String name);

        Builder from(CreateUserRequest other);
    }

    public interface _FinalStage {
        CreateUserRequest build();

        _FinalStage age(Optional<Integer> age);

        _FinalStage age(Integer age);
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Builder implements NameStage, _FinalStage {
        private String name;

        private Optional<Integer> age = Optional.empty();

        @JsonAnySetter
        private Map<String, Object> additionalProperties = new HashMap<>();

        private Builder() {}

        @java.lang.Override
        public Builder from(CreateUserRequest other) {
            name(other.getName());
            age(other.getAge());
            return this;
        }

        /**
         * <p>The name of the user to create.
         * This name is unique to each user.</p>
         * @return Reference to {@code this} so that method calls can be chained together.
         */
        @java.lang.Override
        @JsonSetter("name")
        public _FinalStage name(String name) {
            this.name = name;
            return this;
        }

        /**
         * <p>The age of the user.
         * This propery is not required.</p>
         * @return Reference to {@code this} so that method calls can be chained together.
         */
        @java.lang.Override
        public _FinalStage age(Integer age) {
            this.age = Optional.ofNullable(age);
            return this;
        }

        @java.lang.Override
        @JsonSetter(value = "age", nulls = Nulls.SKIP)
        public _FinalStage age(Optional<Integer> age) {
            this.age = age;
            return this;
        }

        @java.lang.Override
        public CreateUserRequest build() {
            return new CreateUserRequest(name, age, additionalProperties);
        }
    }
}
