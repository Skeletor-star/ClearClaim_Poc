from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.user import User
from app.middleware.auth_middleware import get_current_user

router = APIRouter()

@router.post("/upload")
async def upload_document(
    claim_id: str = Form(...),
    doc_type: str = Form(...),
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    from app.services.document_service import save_file
    content = await file.read()
    file_path = await save_file(content, str(current_user.id), claim_id, file.filename)
    return {"message": "File uploaded successfully", "file_path": file_path}
