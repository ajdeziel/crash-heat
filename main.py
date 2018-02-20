from flask import Flask, render_template
import os
import requests

app = Flask(__name__)

# TODO: Write configuration file for URLs
API_URL = 'https://services2.arcgis.com/18ajPSI0b3ppsmMt/arcgis/rest/services/' \
          'Crashes_Last_Five_Years/FeatureServer/0/query?' \
          'where=1%3D1&outFields=LONGITUDE,LATITUDE&outSR=4326&f=json'

# TODO: Create scheduler to call API only once a month (on first of every month @ 0:00 AM)

@app.route('/')
def main(name=None):
    # data_fetch_cond = verify_data_fetch()
    return render_template('index.html', name=name, api_url=API_URL)


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
