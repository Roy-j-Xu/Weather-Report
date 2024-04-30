import unittest
import json
import os

import pipeline

class TestPipeline(unittest.TestCase):

    def setUp(self):
        test_file_path = os.path.join(os.path.dirname(__file__), 'test_data.json')
        with open(test_file_path) as f:
            self.test_json = json.load(f)

    def test_forecast_pipeline(self):
        result = pipeline.forecast_pipeline(self.test_json)
        print(result)

if __name__ == '__main__':
    unittest.main()