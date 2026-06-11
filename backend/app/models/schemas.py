from pydantic import BaseModel
from typing import Optional


class PassportData(BaseModel):
    surname: str
    given_names: str
    nationality: str
    date_of_birth: str
    sex: str
    place_of_birth: Optional[str] = None
    date_of_issue: str
    date_of_expiry: str
    passport_number: str
    personal_number: Optional[str] = None
    mrz_line1: Optional[str] = None
    mrz_line2: Optional[str] = None
