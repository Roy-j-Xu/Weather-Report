import unittest
import json
import os

import pandas.testing

import pipeline
import pipeline.pipeline

class TestPipeline(unittest.TestCase):

    def setUp(self):
        test_file_path = os.path.join(os.path.dirname(__file__), 'test_data.json')
        with open(test_file_path) as f:
            self.test_json = json.load(f)

    def test_forecast_raw_dataframe(self):
        df = pipeline.pipeline._raw_forcast_dataframe(self.test_json)
        self.assertEqual(df.shape, (14, 19), msg='Shape of raw forecast dataframe incorrect.')


    def test_forecast_pipeline(self):
        result = pipeline.forecast_pipeline(self.test_json)
        self.assertEqual(result.shape, (14, 14), msg='Shape of processed forecast data incorrect.')

if __name__ == '__main__':
    unittest.main()