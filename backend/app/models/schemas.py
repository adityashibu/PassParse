from pydantic import BaseModel


class PassportData(BaseModel):
    surname: str
    given_names: str
    nationality: str
    date_of_birth: str
    sex: str
    place_of_birth: str
    date_of_issue: str
    date_of_expiry: str
    passport_number: str
