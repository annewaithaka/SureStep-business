from flask import Blueprint, jsonify
from modules.leads.models import Lead

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/dashboard")

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
            "created_at": lead.created_at
        })

    return jsonify(result), 200
