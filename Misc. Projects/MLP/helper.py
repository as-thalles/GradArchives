import csv
from copy import copy
import matplotlib.pyplot as plt

def csv_read(filepath):
    file = []
    with open(filepath, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in spamreader:
            file.append(', '.join(row).split(','))
    return file
    pass


def split_io(mat):
    temp = copy(mat[1:])
    data_in = [list(map(int, x[0:2])) for x in temp]
    data_out = [int(x[2]) for x in temp]
    return data_in, data_out
    pass


def plot_graph(data, xlabel='x', ylabel='y', legends=None):
    if type(data) is not list:
        plt.plot(data)
    else:
        for i in data:
            plt.plot(i)
    if legends is not None:
        plt.legend(legends)
    plt.ylabel(ylabel)
    plt.xlabel(xlabel)
    plt.show()
    pass

