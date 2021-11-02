from os import environ
import os
import requests as req
from requests.exceptions import ConnectionError, HTTPError
from dotenv import load_dotenv
import json


load_dotenv(os.path.abspath('.env'))


# try:
#     res = req.get(f'https://api.themoviedb.org/3/movie/upcoming?api_key={environ.get("TMDB_API_KEY")}&query=avengers', timeout=3)
#     res.raise_for_status()
# except HTTPError as httpError:
#     print(httpError)
# except ConnectionError as conError:
#     print(conError)
# except Exception:
#     print(Exception)
# else:
#     print(res.json())




def getInfo(movieName):
    url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={environ.get("TMDB_API_KEY")}'
    try:
        res = req.get(url)
        res.raise_for_status()
    except HTTPError as httpError:
        print(httpError)
    except ConnectionError as conError:
        print(conError)
    except Exception:
        print(Exception)
    else:
        genres = res.json()['genres']
        genresDict = {f'{genre["id"]}' : genre['name'] for genre in genres}
        with open("genres.json", "w") as file:
            json.dump(genresDict, file)
        print(genresDict)


getInfo('Avengers')