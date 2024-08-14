# This file was auto-generated by Fern from our API Definition.

import os

import pytest
from seed import AsyncSeedIdempotencyHeaders, SeedIdempotencyHeaders


@pytest.fixture
def client() -> SeedIdempotencyHeaders:
    return SeedIdempotencyHeaders(
        token=os.getenv("ENV_TOKEN", "token"), base_url=os.getenv("TESTS_BASE_URL", "base_url")
    )


@pytest.fixture
def async_client() -> AsyncSeedIdempotencyHeaders:
    return AsyncSeedIdempotencyHeaders(
        token=os.getenv("ENV_TOKEN", "token"), base_url=os.getenv("TESTS_BASE_URL", "base_url")
    )
