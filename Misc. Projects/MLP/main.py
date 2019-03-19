# Atividade Prática 2 - Rede Neural MLP
# Implemente e treine uma rede neural MLP (conforme arquitetura vista em sala de aula)
#   para resolver o problema do XOR. Seu programa deverá:
##  - Fazer leitura de um conjunto e dados rotulado
##  - Permitir a escolha da função de ativação (linear, sigmoid, tangente hiperbólica ou gaussiana)
##  - Realize várias execuções gerando os pesos iniciais aleatoriamente e modificando a ordem da entrada na rede.
#   Apresente e discuta o resultado observado.

# Relatório da atividade prática apresentado resultados dos testes realizados, arquivo de dados utilizado nos testes
#   e código-fonte da MLP implementada

import neuralnetwork as nn
import evaluation as ev
import helper as hp


def main():
    file = hp.csv_read('and.csv')
    data_input, data_output = hp.split_io(file)

    linear_folder = []
    sigmoid_folder = []
    htangent_folder = []
    gaussian_folder = []
    legends = []
    print('Begin Training')
    for i in range(5):
        print(i)
        linear = nn.NNMLP(x=data_input, y=data_output, activ='linear', alpha=(1+i)/10,
            break_function=ev.dqm, criteria_error=0.001,  # Função de parada, erro máximo
            criteria_cicle=50000,  # Número máximo de épocas
            criteria_const=False  # Se deve parar quando atingir um erro mínimo em todas as entradas
        )
        linear.train()
        linear_folder.append(linear.evolution)

        sigmoid = nn.NNMLP(x=data_input, y=data_output, activ='sigmoid', alpha=(1+i)/10,
            break_function=ev.dqm, criteria_error=0.001,  # Função de parada, erro máximo
            criteria_cicle=50000,  # Número máximo de épocas
            criteria_const=False  # Se deve parar quando atingir um erro mínimo em todas as entradas
        )
        sigmoid.train()
        sigmoid_folder.append(sigmoid.evolution)

        hip_tangent = nn.NNMLP(x=data_input, y=data_output, activ='htangent', alpha=(1+i)/10,
            break_function=ev.dqm, criteria_error=0.001,  # Função de parada, erro máximo
            criteria_cicle=50000,  # Número máximo de épocas
            criteria_const=False  # Se deve parar quando atingir um erro mínimo em todas as entradas
        )
        hip_tangent.train()
        htangent_folder.append(hip_tangent.evolution)

        gaussian = nn.NNMLP(x=data_input, y=data_output, activ='gaussian', alpha=(1+i)/10,
            break_function=ev.dqm, criteria_error=0.001,  # Função de parada, erro máximo
            criteria_cicle=50000,  # Número máximo de épocas
            criteria_const=False  # Se deve parar quando atingir um erro mínimo em todas as entradas
        )
        gaussian.train()
        gaussian_folder.append(gaussian.evolution)

        legends.append('Execução ' + str(i+1))

    hp.plot_graph(linear_folder, xlabel='Epoch', ylabel='Error', legends=legends)
    hp.plot_graph(sigmoid_folder, xlabel = 'Epoch', ylabel = 'Error', legends=legends)
    hp.plot_graph(htangent_folder, xlabel = 'Epoch', ylabel = 'Error', legends=legends)
    hp.plot_graph(gaussian_folder, xlabel = 'Epoch', ylabel = 'Error', legends=legends)
    pass

if __name__ == '__main__':
    main()
    pass
