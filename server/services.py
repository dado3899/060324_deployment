from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/dist',
    template_folder='../client/dist'
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('postgres_url')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_`%(constraint_name)s`",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
    })

db = SQLAlchemy(metadata=metadata)

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)
CORS(app)
bcrypt = Bcrypt(app)

app.secret_key = os.getenv('secret_key')
# python -c 'import os; print(os.urandom(16))'