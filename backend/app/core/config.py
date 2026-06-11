from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    ollama_host: str = "http://localhost:11434"
    ollama_model: str = "llama3.2-vision:11b"
    excel_path: str = str(Path(__file__).parents[3] / "data" / "database" / "passport_database.xlsx")

    class Config:
        env_file = ".env"


settings = Settings()
