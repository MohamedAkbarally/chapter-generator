from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_restful import Api
from api.api_handler import api_handler, fetch_chapters
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_url_path="", static_folder="frontend/build/")
cors = CORS(app)
api = Api(app)

if os.environ.get("ENV") == "production":
    port = 80
    debug = False

    @app.route("/", defaults={"path": ""})
    def serve(path):
        return send_from_directory(app.static_folder, "index.html")

else:
    port = 8000
    debug = True

api.add_resource(api_handler, "/test")
api.add_resource(fetch_chapters, "/fetch_chapters")

if __name__ == "__main__":
    app.run(debug=debug, port=port)
ß
