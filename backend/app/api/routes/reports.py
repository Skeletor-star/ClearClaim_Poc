from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from app.middleware.auth_middleware import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/download/{claim_id}")
async def download_report(claim_id: str, current_user: User = Depends(get_current_user)):
    from app.core.config import settings
    from pathlib import Path
    file_path = Path(settings.STORAGE_PATH) / "reports" / f"{claim_id}_report.pdf"
    if not file_path.exists():
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Report not found")
    return FileResponse(str(file_path), media_type="application/pdf", filename=f"clearclaim_report_{claim_id}.pdf")
