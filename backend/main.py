from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import auth, claims, documents, reports, admin, support
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="ClearClaim AI - Enterprise Health Insurance Claim Assistant"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(claims.router, prefix="/api/claims", tags=["Claims"])
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(support.router, prefix="/api/support", tags=["Support"])

@app.get("/")
def root():
    return {"message": "ClearClaim AI API is running", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy"}
