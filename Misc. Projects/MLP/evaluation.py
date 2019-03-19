from math import sqrt


def rmse(vecA, vecB):  # Root Mean Squared Deviation
    error = 0
    for a, b in zip(vecA, vecB):
        error += (a - b)**2
    return sqrt(error/len(vecA))
    pass


# MLP
def dqm(vecA, vecB):  # Desvio Quadrático Médio (MSD)
    error = 0
    a = vecA
    b = vecB
    for i in range(len(vecA)):
        error += abs((a[i]-b[i]))**2
    return error/len(vecA)
    pass


def mad(vecA, vecB):  # Desvio Absoluto Médio (MAD)
    error = 0
    for a, b in zip(vecA, vecB):
        error += abs(a - b)
    return error/len(vecA)
    pass
