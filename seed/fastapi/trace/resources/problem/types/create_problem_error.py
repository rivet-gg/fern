# This file was auto-generated by Fern from our API Definition.

from __future__ import annotations

import typing

import pydantic

from ....core.pydantic_utilities import IS_PYDANTIC_V2, UniversalRootModel, update_forward_refs
from .generic_create_problem_error import GenericCreateProblemError

T_Result = typing.TypeVar("T_Result")


class _Factory:
    def generic(self, value: GenericCreateProblemError) -> CreateProblemError:
        if IS_PYDANTIC_V2:
            return CreateProblemError(
                root=_CreateProblemError.Generic(**value.dict(exclude_unset=True), error_type="generic")
            )
        else:
            return CreateProblemError(
                __root__=_CreateProblemError.Generic(**value.dict(exclude_unset=True), error_type="generic")
            )


class CreateProblemError(UniversalRootModel):
    factory: typing.ClassVar[_Factory] = _Factory()

    if IS_PYDANTIC_V2:
        root: typing.Union[_CreateProblemError.Generic]

        def get_as_union(self) -> typing.Union[_CreateProblemError.Generic]:
            return self.root

    else:
        __root__: typing.Union[_CreateProblemError.Generic]

        def get_as_union(self) -> typing.Union[_CreateProblemError.Generic]:
            return self.__root__

    def visit(self, generic: typing.Callable[[GenericCreateProblemError], T_Result]) -> T_Result:
        unioned_value = self.get_as_union()
        if unioned_value.error_type == "generic":
            return generic(GenericCreateProblemError(**unioned_value.dict(exclude_unset=True, exclude={"_type"})))


class _CreateProblemError:
    class Generic(GenericCreateProblemError):
        error_type: typing.Literal["generic"] = pydantic.Field(alias="_type", default="generic")


update_forward_refs(CreateProblemError)
