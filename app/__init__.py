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
<<<<<<< HEAD
app.run(host='0.0.0.0')
=======
app.run()
>>>>>>> c62c46dbfd19465de4a3c5f01c8690ca3cc85cc2
