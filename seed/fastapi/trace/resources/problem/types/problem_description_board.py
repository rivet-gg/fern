# This file was auto-generated by Fern from our API Definition.

from __future__ import annotations

import datetime as dt
import typing

import typing_extensions

from ....core.datetime_utils import serialize_datetime
from ...commons.types.variable_value import VariableValue

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore

T_Result = typing.TypeVar("T_Result")


class _Factory:
    def html(self, value: str) -> ProblemDescriptionBoard:
        return ProblemDescriptionBoard(__root__=_ProblemDescriptionBoard.Html(type="html", value=value))

    def variable(self, value: VariableValue) -> ProblemDescriptionBoard:
        return ProblemDescriptionBoard(__root__=_ProblemDescriptionBoard.Variable(type="variable", value=value))

    def test_case_id(self, value: str) -> ProblemDescriptionBoard:
        return ProblemDescriptionBoard(__root__=_ProblemDescriptionBoard.TestCaseId(type="testCaseId", value=value))


class ProblemDescriptionBoard(pydantic.BaseModel):
    factory: typing.ClassVar[_Factory] = _Factory()

    def get_as_union(
        self,
    ) -> typing.Union[
        _ProblemDescriptionBoard.Html, _ProblemDescriptionBoard.Variable, _ProblemDescriptionBoard.TestCaseId
    ]:
        return self.__root__

    def visit(
        self,
        html: typing.Callable[[str], T_Result],
        variable: typing.Callable[[VariableValue], T_Result],
        test_case_id: typing.Callable[[str], T_Result],
    ) -> T_Result:
        if self.__root__.type == "html":
            return html(self.__root__.value)
        if self.__root__.type == "variable":
            return variable(self.__root__.value)
        if self.__root__.type == "testCaseId":
            return test_case_id(self.__root__.value)

    __root__: typing_extensions.Annotated[
        typing.Union[
            _ProblemDescriptionBoard.Html, _ProblemDescriptionBoard.Variable, _ProblemDescriptionBoard.TestCaseId
        ],
        pydantic.Field(discriminator="type"),
    ]

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().dict(**kwargs_with_defaults)

    class Config:
        extra = pydantic.Extra.forbid
        json_encoders = {dt.datetime: serialize_datetime}


class _ProblemDescriptionBoard:
    class Html(pydantic.BaseModel):
        type: typing_extensions.Literal["html"]
        value: str

    class Variable(pydantic.BaseModel):
        type: typing_extensions.Literal["variable"]
        value: VariableValue

    class TestCaseId(pydantic.BaseModel):
        type: typing_extensions.Literal["testCaseId"]
        value: str


ProblemDescriptionBoard.update_forward_refs()
