/**
 * This file was auto-generated by Fern from our API Definition.
 */

package resources.service.types;

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

public final class Resource {
  private final Value value;

  @JsonCreator(
      mode = JsonCreator.Mode.DELEGATING
  )
  private Resource(Value value) {
    this.value = value;
  }

  public <T> T visit(Visitor<T> visitor) {
    return value.visit(visitor);
  }

  public static Resource user(User value) {
    return new Resource(new UserValue(value));
  }

  public static Resource organization(Organization value) {
    return new Resource(new OrganizationValue(value));
  }

  public boolean isUser() {
    return value instanceof UserValue;
  }

  public boolean isOrganization() {
    return value instanceof OrganizationValue;
  }

  public boolean _isUnknown() {
    return value instanceof _UnknownValue;
  }

  public Optional<User> getUser() {
    if (isUser()) {
      return Optional.of(((UserValue) value).value);
    }
    return Optional.empty();
  }

  public Optional<Organization> getOrganization() {
    if (isOrganization()) {
      return Optional.of(((OrganizationValue) value).value);
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
    T visitUser(User user);

    T visitOrganization(Organization organization);

    T _visitUnknown(Object unknownType);
  }

  @JsonTypeInfo(
      use = JsonTypeInfo.Id.NAME,
      property = "resource_type",
      visible = true,
      defaultImpl = _UnknownValue.class
  )
  @JsonSubTypes({
      @JsonSubTypes.Type(UserValue.class),
      @JsonSubTypes.Type(OrganizationValue.class)
  })
  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  private interface Value {
    <T> T visit(Visitor<T> visitor);
  }

  @JsonTypeName("user")
  private static final class UserValue implements Value {
    @JsonUnwrapped
    private User value;

    @JsonCreator(
        mode = JsonCreator.Mode.PROPERTIES
    )
    private UserValue() {
    }

    private UserValue(User value) {
      this.value = value;
    }

    @java.lang.Override
    public <T> T visit(Visitor<T> visitor) {
      return visitor.visitUser(value);
    }

    @java.lang.Override
    public boolean equals(Object other) {
      if (this == other) return true;
      return other instanceof UserValue && equalTo((UserValue) other);
    }

    private boolean equalTo(UserValue other) {
      return value.equals(other.value);
    }

    @java.lang.Override
    public int hashCode() {
      return Objects.hash(this.value);
    }

    @java.lang.Override
    public String toString() {
      return "Resource{" + "value: " + value + "}";
    }
  }

  @JsonTypeName("Organization")
  private static final class OrganizationValue implements Value {
    @JsonUnwrapped
    private Organization value;

    @JsonCreator(
        mode = JsonCreator.Mode.PROPERTIES
    )
    private OrganizationValue() {
    }

    private OrganizationValue(Organization value) {
      this.value = value;
    }

    @java.lang.Override
    public <T> T visit(Visitor<T> visitor) {
      return visitor.visitOrganization(value);
    }

    @java.lang.Override
    public boolean equals(Object other) {
      if (this == other) return true;
      return other instanceof OrganizationValue && equalTo((OrganizationValue) other);
    }

    private boolean equalTo(OrganizationValue other) {
      return value.equals(other.value);
    }

    @java.lang.Override
    public int hashCode() {
      return Objects.hash(this.value);
    }

    @java.lang.Override
    public String toString() {
      return "Resource{" + "value: " + value + "}";
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
      return "Resource{" + "type: " + type + ", value: " + value + "}";
    }
  }
}
