# This file was auto-generated by Fern from our API Definition.

import typing

import pydantic

from ......core.pydantic_utilities import IS_PYDANTIC_V2, UniversalBaseModel
from .....commons.types.language import Language
from .basic_test_case_template import BasicTestCaseTemplate
from .files import Files
from .non_void_function_signature import NonVoidFunctionSignature


class BasicCustomFiles(UniversalBaseModel):
    method_name: str = pydantic.Field(alias="methodName")
    signature: NonVoidFunctionSignature
    additional_files: typing.Dict[Language, Files] = pydantic.Field(alias="additionalFiles")
    basic_test_case_template: BasicTestCaseTemplate = pydantic.Field(alias="basicTestCaseTemplate")

    if IS_PYDANTIC_V2:
        model_config: typing.ClassVar[pydantic.ConfigDict] = pydantic.ConfigDict(extra="forbid")  # type: ignore # Pydantic v2
    else:

        class Config:
            extra = pydantic.Extra.forbid
