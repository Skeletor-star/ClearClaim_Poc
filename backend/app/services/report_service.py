from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.units import cm
from pathlib import Path
from app.core.config import settings

def generate_report(claim_id: str, user_name: str, claim_type: str, ai_result: dict) -> str:
    folder = Path(settings.STORAGE_PATH) / "reports"
    folder.mkdir(parents=True, exist_ok=True)
    file_path = folder / f"{claim_id}_report.pdf"
    doc = SimpleDocTemplate(str(file_path), pagesize=A4)
    styles = getSampleStyleSheet()
    dark_teal = colors.HexColor("#085041")
    story = []

    title_style = ParagraphStyle("title", fontSize=20, textColor=dark_teal, spaceAfter=6, fontName="Helvetica-Bold")
    sub_style = ParagraphStyle("sub", fontSize=11, textColor=colors.grey, spaceAfter=20)
    heading_style = ParagraphStyle("heading", fontSize=13, textColor=dark_teal, spaceAfter=8, fontName="Helvetica-Bold")
    body_style = ParagraphStyle("body", fontSize=10, spaceAfter=6, leading=16)

    story.append(Paragraph("ClearClaim AI", title_style))
    story.append(Paragraph("Health Insurance Claim Analysis Report", sub_style))

    info_data = [
        ["Claim ID", str(claim_id)],
        ["Patient Name", user_name],
        ["Claim Type", claim_type.replace("_", " ").title()],
        ["AI Decision", ai_result.get("ai_decision", "N/A")],
        ["Confidence", ai_result.get("confidence", "N/A").title()],
        ["Estimated Amount", f"Rs.{ai_result.get('estimated_amount', 0):,.2f}"],
        ["Copay", f"{ai_result.get('copay_percentage', 0)}%"],
    ]
    table = Table(info_data, colWidths=[5*cm, 12*cm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (0,-1), colors.HexColor("#E1F5EE")),
        ("TEXTCOLOR", (0,0), (0,-1), dark_teal),
        ("FONTNAME", (0,0), (0,-1), "Helvetica-Bold"),
        ("FONTSIZE", (0,0), (-1,-1), 10),
        ("GRID", (0,0), (-1,-1), 0.5, colors.HexColor("#9FE1CB")),
        ("PADDING", (0,0), (-1,-1), 8),
    ]))
    story.append(table)
    story.append(Spacer(1, 16))

    story.append(Paragraph("Summary", heading_style))
    story.append(Paragraph(ai_result.get("summary", "No summary available."), body_style))
    story.append(Spacer(1, 10))

    for section, key in [("Missing Documents", "missing_documents"), ("Rejection Risks", "rejection_risks"), ("Recommendations", "recommendations")]:
        items = ai_result.get(key, [])
        if items:
            story.append(Paragraph(section, heading_style))
            for item in items:
                story.append(Paragraph(f"• {item}", body_style))
            story.append(Spacer(1, 10))

    doc.build(story)
    return str(file_path)
