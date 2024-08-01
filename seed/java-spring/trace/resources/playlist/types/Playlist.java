/**
 * This file was auto-generated by Fern from our API Definition.
 */

package resources.playlist.types;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import core.ObjectMappers;
import java.lang.Object;
import java.lang.String;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import resources.commons.types.ProblemId;
import resources.commons.types.UserId;

@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(
    builder = Playlist.Builder.class
)
public final class Playlist implements IPlaylistCreateRequest {
  private final String name;

  private final List<ProblemId> problems;

  private final PlaylistId playlistId;

  private final UserId ownerId;

  private Playlist(String name, List<ProblemId> problems, PlaylistId playlistId, UserId ownerId) {
    this.name = name;
    this.problems = problems;
    this.playlistId = playlistId;
    this.ownerId = ownerId;
  }

  @JsonProperty("name")
  @java.lang.Override
  public String getName() {
    return name;
  }

  @JsonProperty("problems")
  @java.lang.Override
  public List<ProblemId> getProblems() {
    return problems;
  }

  @JsonProperty("playlist_id")
  public PlaylistId getPlaylistId() {
    return playlistId;
  }

  @JsonProperty("owner-id")
  public UserId getOwnerId() {
    return ownerId;
  }

  @java.lang.Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof Playlist && equalTo((Playlist) other);
  }

  private boolean equalTo(Playlist other) {
    return name.equals(other.name) && problems.equals(other.problems) && playlistId.equals(other.playlistId) && ownerId.equals(other.ownerId);
  }

  @java.lang.Override
  public int hashCode() {
    return Objects.hash(this.name, this.problems, this.playlistId, this.ownerId);
  }

  @java.lang.Override
  public String toString() {
    return ObjectMappers.stringify(this);
  }

  public static NameStage builder() {
    return new Builder();
  }

  public interface NameStage {
    PlaylistIdStage name(String name);

    Builder from(Playlist other);
  }

  public interface PlaylistIdStage {
    OwnerIdStage playlistId(PlaylistId playlistId);
  }

  public interface OwnerIdStage {
    _FinalStage ownerId(UserId ownerId);
  }

  public interface _FinalStage {
    Playlist build();

    _FinalStage problems(List<ProblemId> problems);

    _FinalStage addProblems(ProblemId problems);

    _FinalStage addAllProblems(List<ProblemId> problems);
  }

  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  public static final class Builder implements NameStage, PlaylistIdStage, OwnerIdStage, _FinalStage {
    private String name;

    private PlaylistId playlistId;

    private UserId ownerId;

    private List<ProblemId> problems = new ArrayList<>();

    private Builder() {
    }

    @java.lang.Override
    public Builder from(Playlist other) {
      name(other.getName());
      problems(other.getProblems());
      playlistId(other.getPlaylistId());
      ownerId(other.getOwnerId());
      return this;
    }

    @java.lang.Override
    @JsonSetter("name")
    public PlaylistIdStage name(String name) {
      this.name = name;
      return this;
    }

    @java.lang.Override
    @JsonSetter("playlist_id")
    public OwnerIdStage playlistId(PlaylistId playlistId) {
      this.playlistId = playlistId;
      return this;
    }

    @java.lang.Override
    @JsonSetter("owner-id")
    public _FinalStage ownerId(UserId ownerId) {
      this.ownerId = ownerId;
      return this;
    }

    @java.lang.Override
    public _FinalStage addAllProblems(List<ProblemId> problems) {
      this.problems.addAll(problems);
      return this;
    }

    @java.lang.Override
    public _FinalStage addProblems(ProblemId problems) {
      this.problems.add(problems);
      return this;
    }

    @java.lang.Override
    @JsonSetter(
        value = "problems",
        nulls = Nulls.SKIP
    )
    public _FinalStage problems(List<ProblemId> problems) {
      this.problems.clear();
      this.problems.addAll(problems);
      return this;
    }

    @java.lang.Override
    public Playlist build() {
      return new Playlist(name, problems, playlistId, ownerId);
    }
  }
}
