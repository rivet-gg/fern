/**
 * This file was auto-generated by Fern from our API Definition.
 */

package resources.v2.v3.problem.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.fasterxml.jackson.annotation.JsonValue;
import java.lang.Object;
import java.lang.String;
import java.util.Objects;
import java.util.Optional;

public final class TestCaseFunction {
  private final Value value;

  @JsonCreator(
      mode = JsonCreator.Mode.DELEGATING
  )
  private TestCaseFunction(Value value) {
    this.value = value;
  }

  public <T> T visit(Visitor<T> visitor) {
    return value.visit(visitor);
  }

  public static TestCaseFunction withActualResult(TestCaseWithActualResultImplementation value) {
    return new TestCaseFunction(new WithActualResultValue(value));
  }

  public static TestCaseFunction custom(VoidFunctionDefinition value) {
    return new TestCaseFunction(new CustomValue(value));
  }

  public boolean isWithActualResult() {
    return value instanceof WithActualResultValue;
  }

  public boolean isCustom() {
    return value instanceof CustomValue;
  }

  public boolean _isUnknown() {
    return value instanceof _UnknownValue;
  }

  public Optional<TestCaseWithActualResultImplementation> getWithActualResult() {
    if (isWithActualResult()) {
      return Optional.of(((WithActualResultValue) value).value);
    }
    return Optional.empty();
  }

  public Optional<VoidFunctionDefinition> getCustom() {
    if (isCustom()) {
      return Optional.of(((CustomValue) value).value);
    }
    return Optional.empty();
  }

  public Optional<Object> _getUnknown() {
    if (_isUnknown()) {
      return Optional.of(((_UnknownValue) value).value);
    }
    return Optional.empty();
  }

  @JsonValue
  private Value getValue() {
    return this.value;
  }

  public interface Visitor<T> {
    T visitWithActualResult(TestCaseWithActualResultImplementation withActualResult);

    T visitCustom(VoidFunctionDefinition custom);

    T _visitUnknown(Object unknownType);
  }

  @JsonTypeInfo(
      use = JsonTypeInfo.Id.NAME,
      property = "type",
      visible = true,
      defaultImpl = _UnknownValue.class
  )
  @JsonSubTypes({
      @JsonSubTypes.Type(WithActualResultValue.class),
      @JsonSubTypes.Type(CustomValue.class)
  })
  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  private interface Value {
    <T> T visit(Visitor<T> visitor);
  }

  @JsonTypeName("withActualResult")
  private static final class WithActualResultValue implements Value {
    @JsonUnwrapped
    private TestCaseWithActualResultImplementation value;

    @JsonCreator(
        mode = JsonCreator.Mode.PROPERTIES
    )
    private WithActualResultValue() {
    }

    private WithActualResultValue(TestCaseWithActualResultImplementation value) {
      this.value = value;
    }

    @java.lang.Override
    public <T> T visit(Visitor<T> visitor) {
      return visitor.visitWithActualResult(value);
    }

    @java.lang.Override
    public boolean equals(Object other) {
      if (this == other) return true;
      return other instanceof WithActualResultValue && equalTo((WithActualResultValue) other);
    }

    private boolean equalTo(WithActualResultValue other) {
      return value.equals(other.value);
    }

    @java.lang.Override
    public int hashCode() {
      return Objects.hash(this.value);
    }

    @java.lang.Override
    public String toString() {
      return "TestCaseFunction{" + "value: " + value + "}";
    }
  }

  @JsonTypeName("custom")
  private static final class CustomValue implements Value {
    @JsonUnwrapped
    private VoidFunctionDefinition value;

    @JsonCreator(
        mode = JsonCreator.Mode.PROPERTIES
    )
    private CustomValue() {
    }

    private CustomValue(VoidFunctionDefinition value) {
      this.value = value;
    }

    @java.lang.Override
    public <T> T visit(Visitor<T> visitor) {
      return visitor.visitCustom(value);
    }

    @java.lang.Override
    public boolean equals(Object other) {
      if (this == other) return true;
      return other instanceof CustomValue && equalTo((CustomValue) other);
    }

    private boolean equalTo(CustomValue other) {
      return value.equals(other.value);
    }

    @java.lang.Override
    public int hashCode() {
      return Objects.hash(this.value);
    }

    @java.lang.Override
    public String toString() {
      return "TestCaseFunction{" + "value: " + value + "}";
    }
  }

  private static final class _UnknownValue implements Value {
    private String type;

    @JsonValue
    private Object value;

    @JsonCreator(
        mode = JsonCreator.Mode.PROPERTIES
    )
    private _UnknownValue(@JsonProperty("value") Object value) {
    }

    @java.lang.Override
    public <T> T visit(Visitor<T> visitor) {
      return visitor._visitUnknown(value);
    }

    @java.lang.Override
    public boolean equals(Object other) {
      if (this == other) return true;
      return other instanceof _UnknownValue && equalTo((_UnknownValue) other);
    }

    private boolean equalTo(_UnknownValue other) {
      return type.equals(other.type) && value.equals(other.value);
    }

    @java.lang.Override
    public int hashCode() {
      return Objects.hash(this.type, this.value);
    }

    @java.lang.Override
    public String toString() {
      return "TestCaseFunction{" + "type: " + type + ", value: " + value + "}";
    }
  }
}
