from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.claim import Claim
from app.models.user import User, UserRole
from app.middleware.auth_middleware import require_role
from app.schemas.claim import ClaimOut
from typing import List

router = APIRouter()

@router.get("/claims", response_model=List[ClaimOut])
async def get_all_claims(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.support, UserRole.admin))
):
    result = await db.execute(select(Claim))
    return result.scalars().all()
