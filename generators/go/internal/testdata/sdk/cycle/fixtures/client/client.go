// This file was auto-generated by Fern from our API Definition.

package client

import (
	core "github.com/fern-api/fern-go/internal/testdata/sdk/cycle/fixtures/core"
	option "github.com/fern-api/fern-go/internal/testdata/sdk/cycle/fixtures/option"
	userclient "github.com/fern-api/fern-go/internal/testdata/sdk/cycle/fixtures/user/client"
	http "net/http"
)

type Client struct {
	baseURL string
	caller  *core.Caller
	header  http.Header

	User *userclient.Client
}

func NewClient(opts ...option.RequestOption) *Client {
	options := core.NewRequestOptions(opts...)
	return &Client{
		baseURL: options.BaseURL,
		caller: core.NewCaller(
			&core.CallerParams{
				Client:      options.HTTPClient,
				MaxAttempts: options.MaxAttempts,
			},
		),
		header: options.ToHeader(),
		User:   userclient.NewClient(opts...),
	}
}
