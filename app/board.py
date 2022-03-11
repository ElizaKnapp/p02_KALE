#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09

import sqlite3

class Board:
    def __init__(self, DB_FILE, size, board, leaderboard, author):
        self.db = sqlite3.connect(DB_FILE)
        self.c = self.db.cursor()
        self.c.execute("CREATE TABLE IF NOT EXISTS users (usernames TEXT, passwords TEXT);")
        self.size = size
        self.board = board
        self.leaderboard = leaderboard
        self.author = author

    def generate_board(self, size):
        ''' Generates a board (numpy array) of a certain size '''
        self.board = [[0 for i in range(size)] for j in range(size)]
        print(self.board)


    def custom_board(size, level, x, y):
        ''' Generates a board (numpy array) of a certain size '''
        bombs = 0
        if (level == 'easy'):
            bombs = 15
        # TODO- adjust the bomb numbers for the other levels

        pass

    def save_board(self, board):
        ''' Saves the board to the database '''
        pass

    def get_boards(self, user):
        ''' Gets the boards of a user '''
        pass

    def update_leaderboard(self, leaderboard):
        ''' Updates the leaderboard '''


b = Board("board.db", 2, [], [], "bob")
b.generate_board(2)
print(b.board)
