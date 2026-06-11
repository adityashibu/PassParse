import pandas as pd
from pathlib import Path
from app.core.config import settings
from app.models.schemas import PassportData


def append_to_excel(data: PassportData) -> None:
    path = Path(settings.excel_path)
    path.parent.mkdir(parents=True, exist_ok=True)

    row = data.model_dump()

    if path.exists():
        df = pd.read_excel(path)
        df = pd.concat([df, pd.DataFrame([row])], ignore_index=True)
    else:
        df = pd.DataFrame([row])

    df.to_excel(path, index=False)
