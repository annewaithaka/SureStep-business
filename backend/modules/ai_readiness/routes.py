from flask import Blueprint, request, jsonify
from extensions import db
from modules.leads.models import Lead
from .models import AIReadiness

ai_bp = Blueprint("ai_readiness", __name__, url_prefix="/ai-readiness")

@ai_bp.route("", methods=["POST"])
def submit_ai_readiness():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    answers = data.get("answers")  # dict
    score = sum(answers.values())  # simple scoring logic

    lead = Lead.query.filter_by(email=email).first()
    if not lead:
        lead = Lead(name=name, email=email, source="ai_readiness")
        db.session.add(lead)
        db.session.flush()

    ai = AIReadiness(
        lead_id=lead.id,
        answers=answers,
        score=score
    )

    db.session.add(ai)
    db.session.commit()

    return jsonify({
        "message": "AI readiness submitted",
        "score": score
    }), 201
