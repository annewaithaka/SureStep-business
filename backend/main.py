# backend/main.py
from flask import Flask
from flask_cors import CORS

from extensions import db, bcrypt, jwt, migrate
import modules.core.models

from modules.ai_readiness.routes import ai_bp
from modules.notifications.routes import notifications_bp
from modules.portfolio.routes import portfolio_bp
from modules.dashboard.routes import dashboard_bp
from modules.services.routes import services_bp
from modules.leads.routes import leads_bp
from modules.contact.routes import contact_bp
from modules.auth.routes import auth_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    # Enable CORS
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "http://localhost:5173",
                    "https://loquacious-parfait-fed603.netlify.app",
                ]
            }
        },
        supports_credentials=True,
    )

    # Init extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(contact_bp, url_prefix="/api/contact")
    app.register_blueprint(leads_bp, url_prefix="/api/leads")
    app.register_blueprint(services_bp, url_prefix="/api/services")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")
    app.register_blueprint(portfolio_bp, url_prefix="/api/portfolio")
    app.register_blueprint(notifications_bp, url_prefix="/api/notifications")
    app.register_blueprint(ai_bp, url_prefix="/api/ai-readiness")

    @app.route("/")
    def index():
        return "SureStep backend is running!"

    return app
