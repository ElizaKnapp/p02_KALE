#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09

import sqlite3
import json

DB_FILE = "discobandit.db"

class Board:
    def __init__(self, size, author, board = -1):
        self.db = sqlite3.connect(DB_FILE)
        self.c = self.db.cursor()
        self.c.execute("CREATE TABLE IF NOT EXISTS boards (size INTEGER, board TEXT, leaderboard TEXT, author TEXT, uniqueID INTEGER);")

        self.size = size

        # if it's default so you don't construct w board, set it randomly
        if (board == -1):
            self.board = generate_board(size)
        # otherwise, set it to the given board
        else:
            self.board = board

        self.leaderboard = []
        self.author = author

        id = 1 # to be randomly generated

        print("ran the init")

        self.c.execute("INSERT INTO boards VALUES (?, ?, ?, ?, ?);", (size, json.dumps(self.board), json.dumps(self.leaderboard), author, id))
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
        return [[0 for i in range(size)] for j in range(size)]
    

def get_last5_boards():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS boards (size INTEGER, board TEXT, leaderboard TEXT, author TEXT, uniqueID INTEGER);")
    c.execute("SELECT board FROM boards")
    board = c.fetchall()
    print(board)
    print(len(board))
    db.commit()


get_last5_boards()
