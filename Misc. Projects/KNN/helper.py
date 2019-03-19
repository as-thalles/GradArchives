from numpy import matrix
from copy import copy


def normalize(mat_data):
    mat_data = matrix(mat_data).astype(float)
    for i in range(mat_data.shape[1]):
        top = copy(max(mat_data[:, i]))
        bottom = copy(min(mat_data[:, i]))
        for j in range(mat_data.shape[0]):
            mat_data[j, i] = ((2 * (mat_data[j, i] - bottom)) / (top - bottom)) - 1
    return mat_data
    pass
