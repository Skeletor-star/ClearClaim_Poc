from sqlalchemy import Column, String, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
from datetime import datetime, timezone
import uuid
import enum

class DocumentType(str, enum.Enum):
    policy = "policy"
    bill = "bill"
    discharge_summary = "discharge_summary"
    prescription = "prescription"
    lab_report = "lab_report"
    denial_letter = "denial_letter"
    claim_form = "claim_form"
    other = "other"

class Document(Base):
    __tablename__ = "documents"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    claim_id = Column(UUID(as_uuid=True), ForeignKey("claims.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    file_name = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    doc_type = Column(Enum(DocumentType), default=DocumentType.other)
    uploaded_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
