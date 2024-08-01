// This file was auto-generated by Fern from our API Definition.

package queryparameters

import (
	json "encoding/json"
	fmt "fmt"
	core "github.com/query-parameters/fern/core"
)

type NestedUser struct {
	Name string `json:"name" url:"name"`
	User *User  `json:"user,omitempty" url:"user,omitempty"`

	extraProperties map[string]interface{}
}

func (n *NestedUser) GetExtraProperties() map[string]interface{} {
	return n.extraProperties
}

func (n *NestedUser) UnmarshalJSON(data []byte) error {
	type unmarshaler NestedUser
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*n = NestedUser(value)

	extraProperties, err := core.ExtractExtraProperties(data, *n)
	if err != nil {
		return err
	}
	n.extraProperties = extraProperties

	return nil
}

func (n *NestedUser) String() string {
	if value, err := core.StringifyJSON(n); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", n)
}

type User struct {
	Name string   `json:"name" url:"name"`
	Tags []string `json:"tags,omitempty" url:"tags,omitempty"`

	extraProperties map[string]interface{}
}

func (u *User) GetExtraProperties() map[string]interface{} {
	return u.extraProperties
}

func (u *User) UnmarshalJSON(data []byte) error {
	type unmarshaler User
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*u = User(value)

	extraProperties, err := core.ExtractExtraProperties(data, *u)
	if err != nil {
		return err
	}
	u.extraProperties = extraProperties

	return nil
}

func (u *User) String() string {
	if value, err := core.StringifyJSON(u); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", u)
}
