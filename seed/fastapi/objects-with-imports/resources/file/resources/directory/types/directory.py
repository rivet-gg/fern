# This file was auto-generated by Fern from our API Definition.

from __future__ import annotations

import datetime as dt
import typing

from ......core.datetime_utils import serialize_datetime
from ....types.file import File

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore


class Directory(pydantic.BaseModel):
    """
    from seed.objects_with_imports import File, FileInfo
    from seed.objects_with_imports.resources.file import Directory

    Directory(
        name="root",
        files=[
            File(
                name="file.txt",
                contents="...",
                info=FileInfo.REGULAR,
            )
        ],
        directories=[
            Directory(
                name="tmp",
                files=[
                    File(
                        name="another_file.txt",
                        contents="...",
                        info=FileInfo.REGULAR,
                    )
                ],
            )
        ],
    )
    """

    name: str
    files: typing.Optional[typing.List[File]]
    directories: typing.Optional[typing.List["Directory"]]

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().dict(**kwargs_with_defaults)

    class Config:
        extra = pydantic.Extra.forbid
        json_encoders = {dt.datetime: serialize_datetime}


Directory.update_forward_refs(Directory=Directory)
