## Fazer leitura de um conjunto e dados rotulado
## Permitir a escolha do valor K
## Permitir a escolha da função de distância utilizada.
## Permitir a escolha do percentual treino/teste utilizando durante a execução
## Apresentar a acurácia do classificador.

import weka.classifiers as wc
import csv
import helper as hp
from KNN import knn
from numpy import random
from copy import copy


if __name__ == '__main__':
    data_x = []
    data_y = []
    # Reading CSV data
    with open('iris_dataset.csv', newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar=' ')
        for row in spamreader:
            data_x.append(row[:4])
            data_y.append(row[4])

    # Throwing away column label
    data_x = data_x[1:]
    data_y = data_y[1:]

    # Normalising and splitting dataset
    for i in range(len(data_x)):            # |
        data_x[i].insert(0, data_y[i])      # |
    random.shuffle(data_x)                  # |
                                            # |  Trecho todo só pra dar o shuffle
    mimic = copy(data_x)                    # |
    data_x, data_y = [], []                 # |
    for row in mimic:                       # |
        data_x.append(row[1:])              # |
        data_y.append(row[0])               # |
    data_x = hp.normalize(data_x)  # Normaliza

    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # The THING itself
    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    ratio = 0.40  # Known base %
    k = 3  # K
    distance_func = 'euclidean'
    bound = int(ratio*len(data_y))

    # The classification algorithm
    my_output_labels = knn(x_train=data_x[:bound], y_train=data_y[:bound], x_test=data_x[bound+1:],
                           distance=distance_func, k=k)

    print('Objective: ' + str(data_y[bound+1:]))
    print('Obtained:  ' + str(my_output_labels))

    # Matriz de Confusão
    i = 0
    tp, tn, fp, fn = 0, 0, 0, 0
    for label in data_y[bound+1:]:
        if label == my_output_labels[i] and label == 'Iris-setosa':  # True Positive
            tp += 1
        elif label == my_output_labels[i] and label == 'Iris-versicolor':  # True Negative
            tn += 1
        elif label != my_output_labels[i] and label == 'Iris-versicolor':  # False Positive
            fp += 1
        elif label != my_output_labels[i] and label == 'Iris-setosa':  # False Negative
            fn += 1
        i += 1

    accuracy = ((tp + tn) / (tp + fn + fp + tn))
    precision = ((tp) / (tp + fp))
    print(str(ratio*100)+'% and K = ' + str(k) + ':\nAcc: ' + str(accuracy))

    pass
