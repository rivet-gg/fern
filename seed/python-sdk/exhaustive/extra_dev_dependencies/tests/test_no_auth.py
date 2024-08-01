# This file was auto-generated by Fern from our API Definition.

import typing

from seed import AsyncSeedExhaustive, SeedExhaustive

from .utilities import validate_response


async def test_post_with_no_auth(client: SeedExhaustive, async_client: AsyncSeedExhaustive) -> None:
    expected_response: typing.Any = True
    expected_types: typing.Any = None
    response = client.no_auth.post_with_no_auth(request={"key": "value"})
    validate_response(response, expected_response, expected_types)

    async_response = await async_client.no_auth.post_with_no_auth(request={"key": "value"})
    validate_response(async_response, expected_response, expected_types)
