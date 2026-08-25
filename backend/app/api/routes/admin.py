from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.user import User, UserRole
from app.middleware.auth_middleware import require_role
from typing import List
from app.schemas.user import UserOut

router = APIRouter()

@router.get("/users", response_model=List[UserOut])
async def get_all_users(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.admin))
):
    result = await db.execute(select(User))
    return result.scalars().all()
