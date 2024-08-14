// This file was auto-generated by Fern from our API Definition.

package literal

import (
	json "encoding/json"
	fmt "fmt"
	core "github.com/literal/fern/core"
)

type SendResponse struct {
	Message string `json:"message" url:"message"`
	Status  int    `json:"status" url:"status"`
	success bool

	extraProperties map[string]interface{}
	_rawJSON        json.RawMessage
}

func (s *SendResponse) GetExtraProperties() map[string]interface{} {
	return s.extraProperties
}

func (s *SendResponse) Success() bool {
	return s.success
}

func (s *SendResponse) UnmarshalJSON(data []byte) error {
	type embed SendResponse
	var unmarshaler = struct {
		embed
	}{
		embed: embed(*s),
	}
	if err := json.Unmarshal(data, &unmarshaler); err != nil {
		return err
	}
	*s = SendResponse(unmarshaler.embed)
	s.success = true

	extraProperties, err := core.ExtractExtraProperties(data, *s, "success")
	if err != nil {
		return err
	}
	s.extraProperties = extraProperties

	s._rawJSON = json.RawMessage(data)
	return nil
}

func (s *SendResponse) MarshalJSON() ([]byte, error) {
	type embed SendResponse
	var marshaler = struct {
		embed
		Success bool `json:"success"`
	}{
		embed:   embed(*s),
		Success: true,
	}
	return json.Marshal(marshaler)
}

func (s *SendResponse) String() string {
	if len(s._rawJSON) > 0 {
		if value, err := core.StringifyJSON(s._rawJSON); err == nil {
			return value
		}
	}
	if value, err := core.StringifyJSON(s); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", s)
}
