from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from api.api_handler import api_handler, fetch_chapters

app = Flask(__name__, static_url_path="", static_folder="frontend/build/")
cors = CORS(app)
api = Api(app)

if app.config["ENV"] == "production":
    port = 80
    debug = False
else:
    port = 5000
    debug = True


if app.config["ENV"] == "production":

    @app.route("/", defaults={"path": ""})
    def serve(path):
        return send_from_directory(app.static_folder, "index.html")


api.add_resource(api_handler, "/test")
api.add_resource(fetch_chapters, "/fetch_chapters")

if __name__ == "__main__":
    app.run(debug=debug, port=port)
