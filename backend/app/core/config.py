from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "ClearClaim AI"
    DEBUG: bool = True
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    DATABASE_URL: str
    GEMINI_API_KEY: str
    STORAGE_PATH: str

    class Config:
        env_file = ".env"

settings = Settings()
