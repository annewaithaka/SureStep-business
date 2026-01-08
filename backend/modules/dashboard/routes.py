# backend/modules/dashboard/routes.py
from flask import Blueprint, jsonify
from modules.leads.models import Lead
from modules.contact.models import ContactMessage
from modules.ai_readiness.models import AIReadiness

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/api/dashboard")


# =========================
# EXISTING: Leads
# =========================
@dashboard_bp.route("/leads", methods=["GET"])
def get_leads():
    leads = Lead.query.all()

    result = []
    for lead in leads:
        result.append({
            "id": lead.id,
            "name": lead.name,
            "email": lead.email,
            "source": lead.source,
            "ai_score": lead.ai_readiness.score if lead.ai_readiness else None,
            "messages": len(lead.contact_messages),
            "created_at": lead.created_at.isoformat(),
        })

    return jsonify(result), 200


# =========================
# EXISTING: Messages
# =========================
@dashboard_bp.route("/messages", methods=["GET"])
def get_messages():
    messages = ContactMessage.query.order_by(
        ContactMessage.created_at.desc()
    ).all()

    data = [
        {
            "id": msg.id,
            "name": msg.name,
            "email": msg.email,
            "message": msg.message,
            "created_at": msg.created_at.isoformat(),
        }
        for msg in messages
    ]

    return jsonify(data), 200


# =========================
# NEW: Recent Activity
# =========================
@dashboard_bp.route("/recent-activity", methods=["GET"])
def recent_activity():
    activities = []

    # 🔹 Recent Leads
    leads = Lead.query.order_by(Lead.created_at.desc()).limit(5).all()
    for lead in leads:
        activities.append({
            "type": "lead",
            "title": "New lead created",
            "description": f"{lead.name or 'Unknown'} ({lead.email})",
            "created_at": lead.created_at.isoformat(),
        })

    # 🔹 Recent Contact Messages
    messages = (
        ContactMessage.query
        .order_by(ContactMessage.created_at.desc())
        .limit(5)
        .all()
    )
    for msg in messages:
        activities.append({
            "type": "message",
            "title": "New contact message",
            "description": f"From {msg.name} ({msg.email})",
            "created_at": msg.created_at.isoformat(),
        })

    # 🔹 Recent AI Readiness
    readiness = (
        AIReadiness.query
        .order_by(AIReadiness.created_at.desc())
        .limit(5)
        .all()
    )
    for r in readiness:
        lead = r.lead
        activities.append({
            "type": "ai_readiness",
            "title": "AI readiness submitted",
            "description": f"{lead.name or 'Company'} — Score {r.score}",
            "created_at": r.created_at.isoformat(),
        })

    # 🔹 Sort by newest first
    activities.sort(key=lambda x: x["created_at"], reverse=True)

    # 🔹 Return only the latest 5
    return jsonify(activities[:5]), 200
