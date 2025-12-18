from extensions import db
from datetime import datetime

class AIReadiness(db.Model):
    __tablename__ = "ai_readiness"

    id = db.Column(db.Integer, primary_key=True)
    lead_id = db.Column(db.Integer, db.ForeignKey("leads.id"))
    score = db.Column(db.Integer)
    answers = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
