from flask import render_template, redirect, request, url_for, session
from app import app
import sqlite3

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")
