import google.generativeai as genai
from app.core.config import settings
import json, re

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

SYSTEM_PROMPT = """You are ClearClaim AI, an expert health insurance claim analyst for the Indian market.
Analyse the provided policy and claim details carefully.
Always respond in valid JSON format only with these exact fields:
{
  "covered": true,
  "confidence": "high",
  "ai_decision": "Approved",
  "estimated_amount": 0.0,
  "copay_percentage": 0,
  "missing_documents": [],
  "rejection_risks": [],
  "recommendations": [],
  "summary": "brief summary"
}"""

async def analyse_claim(claim_type: str, policy_text: str, claim_details: str) -> dict:
    prompt = f"""{SYSTEM_PROMPT}

Claim Type: {claim_type}
Policy Document: {policy_text}
Claim Details: {claim_details}

Return JSON only."""
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        text = re.sub(r"```json|```", "", text).strip()
        return json.loads(text)
    except Exception as e:
        return {
            "covered": False,
            "confidence": "low",
            "ai_decision": "Needs Review",
            "estimated_amount": 0.0,
            "copay_percentage": 0,
            "missing_documents": [],
            "rejection_risks": ["AI analysis failed — manual review needed"],
            "recommendations": ["Please contact support"],
            "summary": f"Analysis error: {str(e)}"
        }
