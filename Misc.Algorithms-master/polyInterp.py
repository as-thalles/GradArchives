# Cálculo Numérico
# Métodos de Interpolação Polinomial

import numpy as np


def lagrange(points):
  P = []
  for point1 in points:
    temp_numerator = np.poly1d([1])  # Numerador do L atual
    temp_denominator = np.poly1d([1])  # Denominador do L atual
    #  Calculo de L
    for point2 in points:
      if point1 is point2:  # Se tiver operando com a própria tupla, skip
        continue
      else:  # Faz-se o multiplicador do que já se tem com o novo valor
        temp_numerator *= np.poly1d([1, -point2[0]])
        temp_denominator *= np.poly1d([point1[0]-point2[0]])
    # Polinômio
    P.append(((temp_numerator*point1[1])/temp_denominator)[0])
  return sum(P)  # Retorna-se o polinômio
  pass


def newton_difdiv(points):
  # Método das diferenças divididas calculado com recursão
  # Não tem o que explicar aqui, bem fácil de entender
  if len(points) == 1:
    return points[0][1]
  else:
    return (newton_difdiv(points[1:])-newton_difdiv(points[:-1]))/(points[-1][0]-points[0][0])
  pass


def newton(points):
  P = []
  # Um polinômio para cada ponto
  for i in range(len(points)):
    temp_pol = np.poly1d([1])
    # Calculando os polinômios a serem multiplicados com os f[x_n]
    for j in range(i):
      temp_pol *= np.poly1d([1, -points[j][0]])
    # Calculando o f[x_1,x_2,...,x_n] da vez
    difdiv = newton_difdiv(points[:1+i])
    # Salva na lista de polinômios
    P.append(temp_pol*difdiv)
  # Retorna-se o somatório dos sub-polinômios (polinômio completo)
  return sum(P)
  pass


# Função constante
def const(x):
  return 1
  # Função linear
def id(x):
  return x
  # Função quadrática
def sq(x):
  return x * x


def mmq(points, funcs):
  A = []
  B = []
  # Para cada g_i
  for i in range(len(funcs)):
    line = []
    # Para cada coluna
    for j in range(len(funcs)):
      sumA = 0
      # Somatório
      for k in range(len(points)):
        sumA += funcs[i](points[k][0]) * funcs[j](points[k][0])
      line.append(sumA)
    # Coloca na matriz A
    A.append(line)
  # Para cada g_i
  for i in range(len(funcs)):
    sumB = 0
    # Somatório
    for j in range(len(points)):
      sumB += points[j][1] * funcs[i](points[j][0])
    # Coloca na matriz B
    B.append(sumB)
  # Resolvendo o sistema e retornando a equação resultado em uma matriz
  return np.poly1d(np.linalg.solve(np.array(A), np.array(B)))
  pass


def solve(eq, value):
  return eq(value)
  pass


def main():
  points = [(1, 3), (2, 5), (3, 1)]
  test = 2.66
  # Teste para Lagrange
  lag_pol = lagrange(points)
  print('Polinômio de Lagrange:')
  print(lag_pol)
  print('Saída para ' + str(test) + ' (Lagrange): ' + str(solve(lag_pol, test)))
  # Teste para Newton
  nwt_pol = newton(points)
  print('Polinômio de Newton:')
  print(nwt_pol)
  print('Saída para ' + str(test) + ' (Newton): ' + str(solve(nwt_pol, 2.66)))
  # Teste para MMQ
  funcs = [sq, id, const]
  mmq_pol = mmq(points, funcs)
  print('Método dos Mínimos Quadrados:')
  print(mmq_pol)
  print('Saída para ' + str(test) + ' (MMQ): ' + str(solve(mmq_pol, 2.66)))
  pass


if __name__ == '__main__':
  main()
  pass
