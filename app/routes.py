#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09

from flask import render_template, redirect, request, url_for, session
from app import app
from app import user
import sqlite3

@app.route("/", methods=['GET', 'POST'])
def index():
    ''' Display login page if there is no username in session, else display the
       response with the session username passed in. '''

    # Renders response if there is a user logged in, else render login page
    board = '''
    0100
    0010
    1101
    0000
    '''
    return render_template('dashboard.html',username=session['username'], board=board, isLoggedIn = session.get("username") is not None)

# authetication of login
@app.route("/auth", methods=['GET','POST'])
def authenticate():
    ''' Checks whether method is get, post. If get method, then redirect to
       loginpage. If post, then authenticate the username and password, rendering
       the error page if incorrect and the dashboard.html if correct username/pass. '''

    # Variables
    method = request.method
    username = request.form.get('username')
    password = request.form.get('password')

    # Get vs Post
    if method == 'GET':
        return render_template("login.html")

    auth_state = user.auth_user(username, password)
    if auth_state == True:
        session['username'] = username
        return redirect(url_for('index'))
    elif auth_state == "bad_pass":
        return render_template('login.html', input="bad_pass")
    elif auth_state == "bad_user":
        return render_template('login.html', input="bad_user")

@app.route("/register")
def register():
    ''' Displays register page '''

    return render_template('register.html')

@app.route("/rAuth", methods =['GET', 'POST'])
def rAuthenticate():
    ''' Authentication of username and passwords given in register page from user '''

    method = request.method
    username = request.form.get('username')
    password0 = request.form.get('password0')
    password1 = request.form.get('password1')

    if method == 'GET':
        return redirect(url_for('register'))

    if method == 'POST':
        # error when no username is inputted
        if len(username) == 0:
            return render_template('register.html', given = "username")
        # error when no password is inputted
        elif len(password0) == 0:
            return render_template('register.html', given = "password")
        # a username and password is inputted
        # a username and password is inputted
        else:
            # if the 2 passwords given don't match, will display error saying so
            if password0 != password1:
                return render_template('register.html', mismatch = True)
            else:
                # creates user account b/c no fails
                if user.create_user(username, password0):
                    return render_template('login.html', input='success')
                # does not create account because create_user failed (username is taken)
                else:
                    return render_template('register.html', taken = True)


@app.route("/logout")
def logout():
    ''' Logout user by deleting user from session dict. Redirects to loginpage '''

    # Delete user. This try... except... block prevent an error from ocurring when the logout page is accessed from the login page
    try:
        session.pop('username')
    except KeyError:
        return redirect(url_for('index'))
    # Redirect to login page
    return redirect(url_for('index'))
