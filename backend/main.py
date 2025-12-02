# backend/main.py
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from extensions import db, bcrypt, jwt, migrate
from flask_jwt_extended.exceptions import JWTExtendedException


def create_app(test_config=None):
    app = Flask(__name__)

    # Load default config
    app.config.from_object(Config)

    # Override if test config is provided
    if test_config:
        app.config.update(test_config)

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Import all models so migrations detect them
    with app.app_context():
        from modules.auth import models as auth_models
        from modules.contact import models as contact_models
        from modules.leads import models as leads_models
        from modules.portfolio import models as portfolio_models
        from modules.services import models as services_models
        from modules.scoreapp_webhook import models as scoreapp_models

    # CORS
    CORS(app, resources={r"/api/*": {"origins": [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://surestep.vercel.app"
    ]}}, supports_credentials=True)

    # ------------------------------
    # Register SureStep blueprints
    # ------------------------------
    from modules.auth.routes import auth_bp
    from modules.dashboard.routes import dashboard_bp
    from modules.leads.routes import leads_bp
    # Add others as needed...

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")
    app.register_blueprint(leads_bp, url_prefix="/api/leads")

    # ------------------------------
    # Register ScoreApp webhook blueprint
    # ------------------------------
    from modules.scoreapp_webhook.routes import scoreapp_bp
    app.register_blueprint(scoreapp_bp, url_prefix="/api/scoreapp")

    # ------------------------------
    # JWT Error Handling
    # ------------------------------
    @app.errorhandler(JWTExtendedException)
    def handle_jwt_errors(e):
        return jsonify({"error": str(e)}), 422

    # ------------------------------
    # Simple test routes
    # ------------------------------
    @app.route("/")
    def index():
        return {"message": "Welcome to SureStep Web Backend!"}, 200

    @app.route("/api/health")
    def health():
        return {"status": "ok"}, 200

    return app


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()  # Do NOT use this in production; migrations are better.
    app.run(host="0.0.0.0", port=5000, debug=True)
