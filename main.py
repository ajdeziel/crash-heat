from flask import Flask, render_template
import os
import requests

app = Flask(__name__)

# Get local static JSON data file
API_URL = 'static/crash_data.json'


@app.route('/')
def main(name=None):
    return render_template('index.html', name=name, api_url=API_URL)


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
