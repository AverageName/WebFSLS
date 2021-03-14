from pydantic import BaseModel
from typing import Any, List
import numpy


class ArrayMeta(type):
    def __getitem__(self, t):
        return type('Array', (Array,), {'__dtype__': t})


class Array(numpy.ndarray, metaclass=ArrayMeta):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate_type

    @classmethod
    def validate_type(cls, val):
        dtype = getattr(cls, '__dtype__', Any)
        if dtype is Any:
            return numpy.array(val)
        else:
            return numpy.array(val, dtype=dtype)


class segmTask(BaseModel):
    id: int
    video_path: str
    num_frames: List[int]
    few_labels: List[List[List[float]]]
    result_labels: List[List[List[float]]]