from flask_restful import Api, Resource, reqparse
import time
import json


class api_handler(Resource):
    def get(self):
        return {"resultStatus": "SUCCESS", "message": "Hello Api Handler"}


class fetch_chapters(Resource):
    def post(self):
        time.sleep(2)
        with open("sample_data.json", "r") as f:
            sample_data = json.load(f)

        return sample_data, 200
