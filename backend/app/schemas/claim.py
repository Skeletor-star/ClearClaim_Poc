from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional
from app.models.claim import ClaimType, ClaimStatus

class ClaimCreate(BaseModel):
    claim_type: ClaimType
    notes: Optional[str] = None

class ClaimOut(BaseModel):
    id: UUID
    user_id: UUID
    claim_type: ClaimType
    status: ClaimStatus
    ai_decision: Optional[str]
    ai_summary: Optional[str]
    estimated_amount: Optional[float]
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
