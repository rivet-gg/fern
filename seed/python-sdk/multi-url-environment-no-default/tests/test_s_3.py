# This file was auto-generated by Fern from our API Definition.

import typing

from seed.client import AsyncSeedMultiUrlEnvironmentNoDefault, SeedMultiUrlEnvironmentNoDefault

from .utilities import validate_response


async def test_get_presigned_url(
    client: SeedMultiUrlEnvironmentNoDefault, async_client: AsyncSeedMultiUrlEnvironmentNoDefault
) -> None:
    expected_response: typing.Any = "string"
    expected_types: typing.Any = None
    response = client.s_3.get_presigned_url(s_3_key="string")
    validate_response(response, expected_response, expected_types)

    async_response = await async_client.s_3.get_presigned_url(s_3_key="string")
    validate_response(async_response, expected_response, expected_types)