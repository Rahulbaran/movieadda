import os
from os import environ

import requests as req
from requests.exceptions import ConnectionError, HTTPError
from flask import Flask, render_template, request, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy

from config import DevConfig, ProdConfig, TestConfig
from form import SearchForm




app = Flask(__name__)
env = os.environ.get('FLASK_ENV')
if env == "development":
    app.config.from_object(DevConfig)
elif env == "production":
    app.config.from_object(ProdConfig)
else :
    app.config.from_object(TestConfig)

db = SQLAlchemy(app)




@app.route('/', methods=["GET", "POST"])
@app.route('/home', methods=["GET", "POST"])
def home():
    form = SearchForm()
    return render_template('home.html', title='Homepage', form=form)



def getInfo(movieName):
    url = f'https://api.themoviedb.org/3/search/movie?api_key={environ.get("TMDB_API_KEY")}'
    try:
        res = req.get(url, params={'query' : movieName, 'page' : 1, 'include_adult' : 'false'})
        res.raise_for_status()
    except HTTPError:
        return {'code' : 404, 'msg' : 'Did not get the correct result'}
    except ConnectionError:
        return {'code' : 500, 'msg' : 'Connection Issue'}
    except Exception:
        return {'code' : 500, 'error' : 'Something unexpected occured'}
    else:
        return res.json()


@app.route('/getMovie', methods=["POST"])
def getMovie():
    movieName = request.get_json()
    res = getInfo(movieName.get('movie'))
    return res







if __name__=="__main__":
    app.run(debug=True, port=5000,load_dotenv=True)




