#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09

from os import urandom
from flask import Flask

app = Flask(__name__)

from app import routes

# Secret key 32 bytes
app.secret_key = urandom(32)
    
app.debug = True
app.run()