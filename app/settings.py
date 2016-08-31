import os


class BaseSettings:
    pass


class DevSettings(BaseSettings):
    HOST = '0.0.0.0'
    PORT = 8888

    STATIC_DIR = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'static/public')
    STATIC_PATH = '/'


settings = DevSettings
