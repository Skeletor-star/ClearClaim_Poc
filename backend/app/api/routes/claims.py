from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.claim import Claim
from app.models.user import User
from app.schemas.claim import ClaimCreate, ClaimOut
from app.middleware.auth_middleware import get_current_user
from typing import List

router = APIRouter()

@router.post("/", response_model=ClaimOut)
async def create_claim(
    data: ClaimCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    claim = Claim(user_id=current_user.id, claim_type=data.claim_type, notes=data.notes)
    db.add(claim)
    await db.commit()
    await db.refresh(claim)
    return claim

@router.get("/my", response_model=List[ClaimOut])
async def my_claims(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(select(Claim).where(Claim.user_id == current_user.id))
    return result.scalars().all()

@router.get("/{claim_id}", response_model=ClaimOut)
async def get_claim(
    claim_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(select(Claim).where(Claim.id == claim_id))
    claim = result.scalar_one_or_none()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    return claim
