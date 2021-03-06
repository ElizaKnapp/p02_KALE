##Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09

from pydoc import render_doc
from flask import render_template, redirect, request, url_for, session
from app import app
from app import user
from app import board as B
import sqlite3
import json
import math

@app.route("/", methods=['GET', 'POST'])
def index():
    ''' READ ME!!!
        NOTE FOR FUTURE READERS
        - dashboard is WHEN YOU ARE LOGGED IN
        - index is when you are NOT logged in
        - however!!!!!! both can be reached at the endpoint "/"
        BECAUSE it depends on whether the username is in session
    '''

    ''' Display login page if there is no username in session, else display the
       response with the session username passed in. '''

    level = 10
    x = request.form.get('level')
    try:
        level = int(x)
    except:
        level = 10

    print(level)
    board = B.generate_board(level)

    if 'username' in session:
        return render_template('dashboard.html', board = board, isLoggedIn = True, username = session["username"])
    else:
        return render_template('index.html', board = board, isLoggedIn = False)

@app.route("/login", methods=['GET', 'POST'])
def login():
    return render_template('login.html')

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
        print("here")
        return render_template("login.html")

    auth_state = user.auth_user(username, password)
    if auth_state == True:
        session['username'] = username
        return redirect(url_for('index'))
    elif auth_state == "bad_pass":
        return render_template('login.html', input="bad_pass")
    elif auth_state == "bad_user":
        return render_template('login.html', input="bad_user")
    elif auth_state == "not_found":
        print("here")
        return render_template('login.html')

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

@app.route("/create")
def create():
    if 'username' not in session:
        return render_template('login.html')
    return render_template('create.html', select = False)

@app.route("/create_board", methods=['GET','POST'])
def create_board():
    if 'username' not in session:
        return render_template('login.html')

    method = request.method

    # Get vs Post
    if method == 'GET':
        return redirect(url_for('index'))

    size = request.form.get('size')
    try:
        size = int(size)
    except:
        return render_template('create.html', message="Please enter a valid number")

    if (size < 5 or size > 25):
        print("running")
        return render_template('create.html', size=size, message = "Your board must be between sizes 5 and 25!", select=False)

    return render_template('create.html', size = size, select = True)

@app.route("/submit_create_board", methods=['GET', 'POST'])
def submit_create_board():
    if 'username' not in session:
        return render_template('login.html')
    method = request.method
    if method == 'GET':
        return redirect(url_for('index'))

    created_board = request.form.get("board")
    board_arr = created_board.split(",")
    size = int(math.sqrt(len(board_arr)))
    i = 0
    db_board = []
    for j in range(size):
        to_add = []
        for k in range(size):
            to_add.append(board_arr[i])
            i += 1
        db_board.append(to_add)
    print(db_board)
    # db_board now has to go to the database
    board_obj = B.Board(size, session['username'], db_board)

    return redirect(url_for('index'))

@app.route("/find_boards", methods=['GET', 'POST'])
def see():
    # FIX FORMATTING
    boards = B.get_boards()
    if 'username' not in session:
        return render_template('find_boards.html', boards = boards, loggedin = False)
    # each element of the list is a tuple
    # [(board, username, size), (board2, username2, size2), (etc, etc, etc)]
    return render_template('find_boards.html', boards = boards, loggedin = True)

@app.route("/play_usermade_board", methods=['GET', 'POST'])
def play_usermade_board():
    if 'username' not in session:
        return render_template('login.html')
    method = request.method
    if method == 'GET':
        return redirect(url_for('index'))

    board = request.form.get("board")
    username = request.form.get("username")
    id = request.form.get("boardID")
    print(board)

    board = json.loads(board)
    board = [[int(num) for num in row] for row in board]

    return render_template('play_usermade_board.html', board = board, username = username, id = id)


@app.route("/dashboard/<username>", methods=['GET', 'POST'])
def dashboard(username):
    ''' Displays currently logged in user's dashboard '''

    boards = B.find_boards(username)

    return render_template('otherdashboard.html', username=username, boards=boards)

@app.route("/leaderboard/<id>", methods=['GET', 'POST'])
def leaderboard(id):
    ''' Displays leaderboard of a given board '''

    leaderboard = json.loads(B.get_leaderboard(id))
    print(leaderboard)
    i = 0
    while i < len(leaderboard):
        if leaderboard[i][1] == '0':
            leaderboard.remove(leaderboard[i])
            i -= 1
        i += 1
    print(leaderboard)

    return render_template('leaderboard.html', leaderboard = leaderboard)

@app.route("/register_score", methods=['GET', 'POST'])
def register_score():
    if 'username' not in session:
        return render_template('login.html')
    method = request.method
    if method == 'GET':
        return redirect(url_for('index'))
    score = request.form.get('score')
    id = request.form.get('id')

    print('score', score)
    print('id', id)
    if (score != '0'):
        B.add_score(id, session['username'], score)

    return redirect(url_for('index'))
