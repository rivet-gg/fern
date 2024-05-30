# This file was auto-generated by Fern from our API Definition.

import typing

from seed.client import AsyncSeedCodeSamples, SeedCodeSamples

from .utilities import validate_response


async def test_hello(client: SeedCodeSamples, async_client: AsyncSeedCodeSamples) -> None:
    expected_response = {"id": "123", "name": "hello"}
    expected_types: typing.Any = {"id": None, "name": None}
    response = client.service.hello(num_events=5)
    validate_response(response, expected_response, expected_types)

    async_response = await async_client.service.hello(num_events=5)
    validate_response(async_response, expected_response, expected_types)
