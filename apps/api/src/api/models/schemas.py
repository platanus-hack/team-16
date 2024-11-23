from pydantic import BaseModel, HttpUrl
from typing import List, Dict, Optional, Union
from enum import Enum


class ActionType(str, Enum):
    CLICK = "click"
    TYPE = "type"
    WAIT = "wait"
    SCROLL = "scroll"


class Action(BaseModel):
    type: ActionType
    selector: Optional[str] = None
    text: Optional[str] = None
    duration: Optional[int] = None


class CrawlOptions(BaseModel):
    max_pages: Optional[int] = 10
    max_depth: Optional[int] = 3
    timeout: Optional[int] = 30000
    scroll: Optional[bool] = True
    screenshot: Optional[bool] = False
    wait_for_selector: Optional[str] = None
    actions: Optional[List[Action]] = None
    # auth: Optional[AuthConfig] = None


class ScrapeRequest(BaseModel):
    url: HttpUrl


class CrawlRequest(BaseModel):
    url: HttpUrl
    options: Optional[CrawlOptions] = None
