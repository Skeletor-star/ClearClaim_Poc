from sqlalchemy import Column, String, DateTime, Enum, Text, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
from datetime import datetime, timezone
import uuid
import enum

class ClaimType(str, enum.Enum):
    before_treatment = "before_treatment"
    after_treatment = "after_treatment"
    denied_appeal = "denied_appeal"

class ClaimStatus(str, enum.Enum):
    draft = "draft"
    submitted = "submitted"
    analysing = "analysing"
    completed = "completed"
    rejected = "rejected"

class Claim(Base):
    __tablename__ = "claims"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    claim_type = Column(Enum(ClaimType), nullable=False)
    status = Column(Enum(ClaimStatus), default=ClaimStatus.draft)
    ai_decision = Column(String, nullable=True)
    ai_summary = Column(Text, nullable=True)
    estimated_amount = Column(Float, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
