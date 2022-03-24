#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09

import sqlite3
import json
import random

DB_FILE = "discobandit.db"

class Board:
    def __init__(self, size, author, board = -1):
        self.db = sqlite3.connect(DB_FILE)
        self.c = self.db.cursor()
        self.c.execute("CREATE TABLE IF NOT EXISTS boards (size INTEGER, board TEXT, leaderboard TEXT, author TEXT, uniqueID INTEGER PRIMARY KEY AUTOINCREMENT);")

        self.size = size

        # if it's default so you don't construct w board, set it randomly
        if (board == -1):
            self.board = generate_board(size)
        # otherwise, set it to the given board
        else:
            self.board = board

        self.leaderboard = []
        self.author = author

        print("ran the init")

        self.c.execute("INSERT INTO boards VALUES (?, ?, ?, ?, null);", (size, json.dumps(self.board), json.dumps(self.leaderboard), author))
        self.db.commit()

    def custom_board(size, level, x, y):
        pass

    def delete_board(self, boardID):
        pass

    def save_board(self, board):
        ''' Saves the board to the database '''
        pass

    def get_boards(user):
        ''' Gets the boards of a user '''
        pass

    def update_leaderboard(leaderboard):
        ''' Updates the leaderboard '''


def generate_board(size):
    ''' Generates a board (numpy array) of a certain size '''
    board = [[0 for i in range(size)] for j in range(size)]
    if size < 15:
        num_mines = size
    elif size < 20:
        num_mines = size * 2
    elif size < 40:
        num_mines = size * 4

    for i in range(num_mines):
        x = random.randrange(0,size)
        y = random.randrange(0,size)
        board[x][y] = 1
    print(board)
    return board


def get_boards():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS boards (size INTEGER, board TEXT, leaderboard TEXT, author TEXT, uniqueID INTEGER PRIMARY KEY AUTOINCREMENT);")
    c.execute("SELECT * FROM boards")
    board = c.fetchall()
    board = board[::-1]
    things = []
    for size, board, leaderboard, author, id in board[:]:
        things.append((board, author, size, id))
    return things

def find_boards(username):
    ''' returns the all of the board, author, size of a specific user'''

    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS boards (size INTEGER, board TEXT, leaderboard TEXT, author TEXT, uniqueID INTEGER PRIMARY KEY AUTOINCREMENT);")
    c.execute("SELECT * FROM boards")
    board = c.fetchall()
    board = board[::-1]
    things = []
    for size, board, leaderboard, author, id in board[:5]:
        if author == username:
            things.append((board, author, size))
    return things

def get_leaderboard(id):
    ''' returns the all of the board, author, size of a specific user'''
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS boards (size INTEGER, board TEXT, leaderboard TEXT, author TEXT, uniqueID INTEGER PRIMARY KEY AUTOINCREMENT);")
    c.execute("SELECT * FROM boards")
    board = c.fetchall()
    board = board[::-1]
    things = []
    for size, board, leaderboard, author, id in board[:5]:
        if id == id:
            things = leaderboard
    return things

def add_score(id, user, score):
    # adds a specific user and score to a board's leaderboard
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS boards (size INTEGER, board TEXT, leaderboard TEXT, author TEXT, uniqueID INTEGER);")
    c.execute("SELECT * FROM boards WHERE uniqueID = (?);", (id,))
    board = c.fetchall()
    print(board)
    current_leaderboard = json.loads(board[0][2])
    to_add = (user, score)
    current_leaderboard.append(to_add)
    c.execute("UPDATE boards SET leaderboard = (?) WHERE uniqueID = (?);", (json.dumps(current_leaderboard), id))
    c.execute("SELECT * FROM boards WHERE uniqueID = (?);", (id,))
    board = c.fetchall()
    print(board)
    db.commit()
# TESTING
# Board(2, "andre", [])
# db = sqlite3.connect(DB_FILE)
# c = db.cursor()
# c.execute("CREATE TABLE IF NOT EXISTS boards (size INTEGER, board TEXT, leaderboard TEXT, author TEXT, uniqueID INTEGER);")
# c.execute("SELECT * FROM boards")
# board = c.fetchall()
# print(board)
# print(find_boards("andrew"))
