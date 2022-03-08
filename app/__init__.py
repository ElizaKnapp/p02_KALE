from os import urandom
from flask import Flask

app = Flask(__name__)

from app import routes

# Secret key 32 bytes
app.secret_key = urandom(32)

app.debug = True
app.run()
