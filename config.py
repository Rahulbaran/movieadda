import os
from dotenv import load_dotenv

load_dotenv(os.path.abspath('.env'))
baseDir = os.path.abspath('Databases')



class BaseConfig :

    # Default Configuration
    FLASK_ENV='development'
    DEBUG = False
    TESTING = False

    # Configuration for all environments
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False



class DevConfig (BaseConfig):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///'+ os.path.join(baseDir,'dev.db')


class ProdConfig (BaseConfig):
    FLASK_ENV='production'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///'+ os.path.join(baseDir,'prod.db')


class TestConfig (BaseConfig):
    TESTING = True
    FLASK_ENV='testing'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///'+ os.path.join(baseDir,'test.db')