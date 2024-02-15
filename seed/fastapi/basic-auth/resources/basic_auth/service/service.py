# This file was auto-generated by Fern from our API Definition.

import abc
import functools
import inspect
import logging
import typing

import fastapi

from ....core.abstract_fern_service import AbstractFernService
from ....core.exceptions.fern_http_exception import FernHTTPException
from ....core.route_args import get_route_args
from ....security import ApiAuth, FernAuth
from ...errors.errors.bad_request import BadRequest
from ...errors.errors.unauthorized_request import UnauthorizedRequest


class AbstractBasicAuthService(AbstractFernService):
    """
    AbstractBasicAuthService is an abstract class containing the methods that you should implement.

    Each method is associated with an API route, which will be registered
    with FastAPI when you register your implementation using Fern's register()
    function.
    """

    @abc.abstractmethod
    def get_with_basic_auth(self, *, auth: ApiAuth) -> bool:
        """
        GET request with basic auth scheme
        """
        ...

    @abc.abstractmethod
    def post_with_basic_auth(self, *, body: typing.Any, auth: ApiAuth) -> bool:
        """
        POST request with basic auth scheme
        """
        ...

    """
    Below are internal methods used by Fern to register your implementation.
    You can ignore them.
    """

    @classmethod
    def _init_fern(cls, router: fastapi.APIRouter) -> None:
        cls.__init_get_with_basic_auth(router=router)
        cls.__init_post_with_basic_auth(router=router)

    @classmethod
    def __init_get_with_basic_auth(cls, router: fastapi.APIRouter) -> None:
        endpoint_function = inspect.signature(cls.get_with_basic_auth)
        new_parameters: typing.List[inspect.Parameter] = []
        for index, (parameter_name, parameter) in enumerate(endpoint_function.parameters.items()):
            if index == 0:
                new_parameters.append(parameter.replace(default=fastapi.Depends(cls)))
            elif parameter_name == "auth":
                new_parameters.append(parameter.replace(default=fastapi.Depends(FernAuth)))
            else:
                new_parameters.append(parameter)
        setattr(cls.get_with_basic_auth, "__signature__", endpoint_function.replace(parameters=new_parameters))

        @functools.wraps(cls.get_with_basic_auth)
        def wrapper(*args: typing.Any, **kwargs: typing.Any) -> bool:
            try:
                return cls.get_with_basic_auth(*args, **kwargs)
            except UnauthorizedRequest as e:
                raise e
            except FernHTTPException as e:
                logging.getLogger(f"{cls.__module__}.{cls.__name__}").warn(
                    f"Endpoint 'get_with_basic_auth' unexpectedly threw {e.__class__.__name__}. "
                    + f"If this was intentional, please add {e.__class__.__name__} to "
                    + "the endpoint's errors list in your Fern Definition."
                )
                raise e

        # this is necessary for FastAPI to find forward-ref'ed type hints.
        # https://github.com/tiangolo/fastapi/pull/5077
        wrapper.__globals__.update(cls.get_with_basic_auth.__globals__)

        router.get(
            path="//basic-auth",
            response_model=bool,
            description=AbstractBasicAuthService.get_with_basic_auth.__doc__,
            **get_route_args(cls.get_with_basic_auth, default_tag="basic_auth"),
        )(wrapper)

    @classmethod
    def __init_post_with_basic_auth(cls, router: fastapi.APIRouter) -> None:
        endpoint_function = inspect.signature(cls.post_with_basic_auth)
        new_parameters: typing.List[inspect.Parameter] = []
        for index, (parameter_name, parameter) in enumerate(endpoint_function.parameters.items()):
            if index == 0:
                new_parameters.append(parameter.replace(default=fastapi.Depends(cls)))
            elif parameter_name == "body":
                new_parameters.append(parameter.replace(default=fastapi.Body(...)))
            elif parameter_name == "auth":
                new_parameters.append(parameter.replace(default=fastapi.Depends(FernAuth)))
            else:
                new_parameters.append(parameter)
        setattr(cls.post_with_basic_auth, "__signature__", endpoint_function.replace(parameters=new_parameters))

        @functools.wraps(cls.post_with_basic_auth)
        def wrapper(*args: typing.Any, **kwargs: typing.Any) -> bool:
            try:
                return cls.post_with_basic_auth(*args, **kwargs)
            except (UnauthorizedRequest, BadRequest) as e:
                raise e
            except FernHTTPException as e:
                logging.getLogger(f"{cls.__module__}.{cls.__name__}").warn(
                    f"Endpoint 'post_with_basic_auth' unexpectedly threw {e.__class__.__name__}. "
                    + f"If this was intentional, please add {e.__class__.__name__} to "
                    + "the endpoint's errors list in your Fern Definition."
                )
                raise e

        # this is necessary for FastAPI to find forward-ref'ed type hints.
        # https://github.com/tiangolo/fastapi/pull/5077
        wrapper.__globals__.update(cls.post_with_basic_auth.__globals__)

        router.post(
            path="//basic-auth",
            response_model=bool,
            description=AbstractBasicAuthService.post_with_basic_auth.__doc__,
            **get_route_args(cls.post_with_basic_auth, default_tag="basic_auth"),
        )(wrapper)
