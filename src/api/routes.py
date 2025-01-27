from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, TokenBlockedList
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, get_jwt_identity
from flask_bcrypt import Bcrypt


api = Blueprint('api', __name__)

CORS(api)

@api.route("/signup", methods=["POST"])
def user_signup():
    body = request.get_json()
    if body.get("email") is None:
        return jsonify({"msg": "Debe especificar un email"}), 400
    if body.get("password") is None:
        return jsonify({"msg": "Debe especificar una contraseña"}), 400
    body["password"] = Bcrypt.generate_password_hash(body["password"]).decode("utf-8")
    user = User(email=body["email"], password=body["password"], is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Usuario creado", "user": user.serialize()})

@api.route("/login", methods=["POST"])
def user_login():
    body = request.get_json()
    if body.get("email") is None:
        return jsonify({"msg": "Debe especificar un email"}), 400
    if body.get("password") is None:
        return jsonify({"msg": "Debe especificar una contraseña"}), 400
    user = User.query.filter_by(email=body["email"]).first()
    if user is None or not Bcrypt.check_password_hash(user.password, body["password"]):
        return jsonify({"msg": "Credenciales inválidas"}), 401
    token = create_access_token(identity=str(user.id), additional_claims={"role": "admin"})
    return jsonify({"token": token}), 200
