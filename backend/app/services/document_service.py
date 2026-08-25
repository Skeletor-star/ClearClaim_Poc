import fitz
import aiofiles
from pathlib import Path
from app.core.config import settings

async def save_file(file_content: bytes, user_id: str, claim_id: str, filename: str) -> str:
    folder = Path(settings.STORAGE_PATH) / "uploads" / user_id / claim_id
    folder.mkdir(parents=True, exist_ok=True)
    file_path = folder / filename
    async with aiofiles.open(file_path, "wb") as f:
        await f.write(file_content)
    return str(file_path)

def extract_text_from_pdf(file_path: str) -> str:
    try:
        doc = fitz.open(file_path)
        return "".join(page.get_text() for page in doc).strip()
    except Exception as e:
        return f"Could not extract text: {str(e)}"
