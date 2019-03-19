import math
from numpy import matrix
from collections import Counter


def euclidean_dist(a, b):
    if len(a) != len(b):
        return False
    dist = 0
    for i in range(len(a)):
        dist += (abs(a[0, i] - b[0, i]))**2
    return math.sqrt(dist)
    pass


def manhattan_dist(a, b):
    if len(a) != len(b):
        return False
    dist = 0
    for i in range(len(a)):
        dist += abs(a[0, i] - b[0, i])
    return dist
    pass


def knn(x_train, y_train, x_test, distance='euclidean', k=5):
    x_train = matrix(x_train).astype(float)
    x_test = matrix(x_test).astype(float)
    # Making sure K won't suck
    if k > len(x_train):
        k = len(x_train)
    if (k % 2) == 0:
        k -= 1
    # Defining distance function
    try:
        if distance == 'euclidean':
            distance_func = euclidean_dist
        elif distance == 'manhattan':
            distance_func = manhattan_dist
    except:
        print('ERROR: Invalid distance function.')
        return []*k
    # Generic code
    output = [''] * len(x_test)
    for i in range(len(x_test)):  # For each instance to be tested
        value = [math.inf] * k
        label = [''] * k
        for j in range(len(x_train)):  # For each instance to be tested against
            dist = distance_func(x_test[i], x_train[j])  # Distance
            if dist is False:
                print('ERROR: Characteristics of datasets are of different size.')
                return output
            if sum(value) == math.inf:  # If there's still infinite in the vector
                for l in range(k):
                    if value[l] == math.inf:
                        value[l] = dist
                        label[l] = y_train[j]
                        break
            else:  # Replacing the highest distance in the list
                for l in range(k):
                    if value[l] == max(value):
                        value[l] = dist
                        label[l] = y_train[j]
                        break
        output[i] = Counter(label).most_common(1)[0][0]  # Storing as classified label
        # Note that the first instance given by Counter.most_common is taken in consideration.
        # This is the criteria given for evaluation. Not a mathematical method.
    return output
    pass
