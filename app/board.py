#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09

import numpy as np

class Board:
    def __init__(self, size, bombs, leaderboard, author):
        self.size = size
        self.bombs = bombs
        self.leaderboard = leaderboard
        self.author = author

    def custom_board(size, level, x, y):
        ''' Generates a board (numpy array) of a certain size '''
        bombs = 0
        if (level == 'easy'):
            bombs = 15
        # TODO- adjust the bomb numbers for the other levels
        



        pass

    def save_board(board):
        ''' Saves the board to the database '''
        pass

    def get_boards(user):
        ''' Gets the boards of a user '''
        pass

    def update_leaderboard():
        ''' Updates the leaderboard '''

    
# b = Board(2,3)
# print(b.bombs)