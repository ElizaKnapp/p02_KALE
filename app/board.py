#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09

import sqlite3
import json

class Board:
    def __init__(self, DB_FILE, size, author):
        self.db = sqlite3.connect(DB_FILE)
        self.c = self.db.cursor()
        self.c.execute("CREATE TABLE IF NOT EXISTS boards (size INTEGER, board TEXT, leaderboard TEXT, author TEXT, uniqueID INTEGER);")

        self.size = size
        self.board = generate_board(size)
        self.leaderboard = []
        self.author = author

        id = 1 # to be randomly generated

        self.c.execute("INSERT INTO boards VALUES (?, ?, ?, ?, ?);", (size, json.dumps(self.board), json.dumps(self.leaderboard), author, id))
        self.db.commit()
        
    def custom_board(size, level, x, y):
        ''' Generates a board (numpy array) of a certain size '''
        bombs = 0
        if (level == 'easy'):
            bombs = 15
        # TODO- adjust the bomb numbers for the other levels

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

# TESTING
b = Board("board.db", 2, "bob")
# b.generate_board(2)
db = sqlite3.connect("board.db")
c = db.cursor()
c.execute("SELECT board FROM boards")
board = json.loads(c.fetchall()[0][0])
print(board[0])
