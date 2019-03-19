import numpy as np
from random import uniform as rand


lazy_constant = 2.4


class NNMLP:
    # Só funciona pra esta configuração de rede:
    # 2 neurônios de entrada, 2 na camada oculta, 1 de saída!
    def __init__(self,
                 x,  # Input data
                 y,  # Expected output data
                 break_function,  # Função de avaliação
                 criteria_error,  # Margem de erro máxima
                 criteria_cicle=1000,  # Número de épocas
                 criteria_const=False,  # Para saídas binárias
                 activ='sigmoid',  # Activation function
                 # n=2,  # Number of neurons in hidden layer
                 alpha=0.01
                 ):
        self.data_input = x  # Define data input
        self.data_output = y  # Define expected data output
        # Funções de ativação
        activation = {
            'linear': self._linear,
            'sigmoid': self._sigmoid,
            'htangent': self._h_tangent,
            'gaussian': self._gaussian
        }
        self.act_function = activation[activ.lower()]  # Define função de ativação de acordo com o dicionário
        self.weights = self.__selfInitializeWeights(2)  # Gera os pesos aleatoriamente
        self.thetas = self.__selfInitializeThetas(2)  # Gera os limiares aleatoriamente
        self.alpha = alpha  # Taxa de aprendizado
        self.evolution = []  # Evolução do erro
        self.num_epoch = 0  # Época de convergência
        self.stop_function = break_function  # Função de parada
        self.stop_error = criteria_error  # Erro máximo permitido
        self.stop_epochs = criteria_cicle  # Número máximo de épocas
        self.stop_constant = criteria_const  # Se deve parar quando atingir um erro mínimo em todas as entradas
        pass

    def train(self):
        cicle = 0
        while True:
            error = []
            for i in range(len(self.data_input)):
                error.append(self.__iteration(self.data_input[i][0], self.data_input[i][1], self.data_output[i]))
            temp = self.stop_function(self.data_output, error)
            self.evolution.append(temp)
            if (
                (temp <= self.stop_error) or  # Erro abaixo de
                (cicle >= self.stop_epochs) or  # Número de épocas atingidas
                (self.stop_constant and max(error) <= 0.001)  # Se o erro pra
               ):
                self.stop_epochs = cicle
                break
            cicle += 1
        pass

    def test(self, a, b):
        y3 = self.act_function(a * self.weights['w13'] + b * self.weights['w23'] - self.thetas['t3'])[0]
        y4 = self.act_function(a * self.weights['w14'] + b * self.weights['w24'] - self.thetas['t4'])[0]
        y5 = self.act_function(y3 * self.weights['w35'] + y4 * self.weights['w45'] - self.thetas['t5'])[0]
        return round(y5)
        pass

    def __iteration(self, i1, i2, o):
        # Ativação // Feed Forward
        y3, dy3 = self.act_function(i1 * self.weights['w13'] + i2 * self.weights['w23'] - self.thetas['t3'])
        y4, dy4 = self.act_function(i1 * self.weights['w14'] + i2 * self.weights['w24'] - self.thetas['t4'])
        y5, dy5 = self.act_function(y3 * self.weights['w35'] + y4 * self.weights['w45'] - self.thetas['t5'])

        # Error
        error = o-y5

        # y5 gradient
        gradient_y5 = dy5 * error

        # Weight "correction"
        delta_w35 = self.alpha * y3 * gradient_y5
        delta_w45 = self.alpha * y4 * gradient_y5
        delta_t5 = self.alpha * (-1) * gradient_y5

        # y3, y4 gradients
        gradient_y3 = dy3 * gradient_y5 * self.weights['w35']
        gradient_y4 = dy4 * gradient_y5 * self.weights['w45']

        # Weight "correction"
        delta_w13 = self.alpha * i1 * gradient_y3
        delta_w23 = self.alpha * i2 * gradient_y3
        delta_t3 = self.alpha * (-1) * gradient_y3
        delta_w14 = self.alpha * i1 * gradient_y4
        delta_w24 = self.alpha * i2 * gradient_y4
        delta_t4 = self.alpha * (-1) * gradient_y4

        # Updating network
        self.weights['w13'] += delta_w13
        self.weights['w14'] += delta_w14
        self.weights['w23'] += delta_w23
        self.weights['w24'] += delta_w24
        self.weights['w35'] += delta_w35
        self.weights['w45'] += delta_w45
        self.thetas['t3'] += delta_t3
        self.thetas['t4'] += delta_t4
        self.thetas['t5'] += delta_t5
        return y5
        pass

    @staticmethod
    def _linear(x):
        return x, 1
        pass

    @staticmethod
    def _sigmoid(x):
        return 1 / (1 + np.exp(-x)), (1 / (1 + np.exp(-x)))*(1-(1 / (1 + np.exp(-x))))

    @staticmethod
    def _h_tangent(x):
        a = 1.716
        b = 0.667
        return ((2*a)/(1+np.exp(-b*x)))-a, (2*a*b*np.exp(b*x))/((np.exp(b*x)+1)**2)
        pass

    @staticmethod
    def _gaussian(x):
        return np.exp(-(x**2)), -2*x*np.exp(-(x**2))
        pass

    def __selfInitializeWeights(self, num_hl_neurons=2):
        weights = {
            'w13': rand(-lazy_constant / num_hl_neurons, lazy_constant / num_hl_neurons),
            'w14': rand(-lazy_constant / num_hl_neurons, lazy_constant / num_hl_neurons),
            'w23': rand(-lazy_constant / num_hl_neurons, lazy_constant / num_hl_neurons),
            'w24': rand(-lazy_constant / num_hl_neurons, lazy_constant / num_hl_neurons),
            'w35': rand(-lazy_constant / num_hl_neurons, lazy_constant / num_hl_neurons),
            'w45': rand(-lazy_constant / num_hl_neurons, lazy_constant / num_hl_neurons)
        }
        return weights
        pass

    def __selfInitializeThetas(self, num_hl_neurons=2):
        neurons = {
            't3': rand(-lazy_constant / num_hl_neurons, lazy_constant / num_hl_neurons),
            't4': rand(-lazy_constant / num_hl_neurons, lazy_constant / num_hl_neurons),
            't5': rand(-lazy_constant / num_hl_neurons, lazy_constant / num_hl_neurons)
        }
        return neurons
        pass

    """
    def __selfInitializeWeights(self, num_hl_neurons=2):
        weights = {
            'w13': 0.5,
            'w14': 0.9,
            'w23': 0.4,
            'w24': 1,
            'w35': -1.2,
            'w45': 1.1
        }
        return weights
        pass

    def __selfInitializeThetas(self, num_hl_neurons=2):
        neurons = {
            't3': 0.8,
            't4': -0.1,
            't5': 0.3
        }
        return neurons
        pass
    """
    pass
