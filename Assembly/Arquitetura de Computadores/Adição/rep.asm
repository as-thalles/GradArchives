codigo segment

	assume cs: codigo; ds: codigo; es: codigo; ss: codigo
	org 100h

entrada: jmp proc1

msg1 db 0dh,0ah, "Entre com o primeiro valor: $"
msg2 db 0dh,0ah, "Entre com o segundo valor: $"
msgResultado db 0dh,0ah, "Resultado: $"




proc1 proc near

DEZENA1     db ?
UNIDADE1    db ?

DEZENA2     db ?
UNIDADE2    db ?

RESULTADO_UNIDADE    db ?
RESULTADO_DEZENA     db ?
RESULTADO_CENTENA    db ?


;inicialização das varaives

	mov RESULTADO_UNIDADE, 0   ;Zera variavel parcela1
	mov RESULTADO_DEZENA,  0   ;Zera variavel parcela2
	mov RESULTADO_CENTENA, 0   ;Zera resultado	

;inicio do codigo principal

	lea dx, msg1
	CALL MOSTRA_STRING
	CALL LE_TECLA	
	MOV DEZENA1, AL
	CALL LE_TECLA	
	MOV UNIDADE1, AL

	lea dx, msg2
	CALL MOSTRA_STRING
	call LE_TECLA
	MOV DEZENA2, AL
	call LE_TECLA
	MOV UNIDADE2, AL


;Soma os dois valores das unidades	
	MOV BL,UNIDADE1
	MOV CL,UNIDADE2
	
	ADD BL, CL
	MOV AH, 0
	MOV AL, BL
	AAA
	ADD AX, 3030H
	MOV BX, AX
;Termina a soma e armazena em BX
;Guarda o resultado da unidade em RESULTADO_UNIDADE 
	mov RESULTADO_UNIDADE, BL
;e da dezena parcial 1 em RESULTADO_DEZENA
	mov RESULTADO_DEZENA, BH
	


;Soma os dois valores das dezenas
	MOV BL, DEZENA1
	MOV CL, DEZENA2

	ADD BL, CL
	MOV AH, 0
	MOV AL, BL
	AAA
	ADD AX, 3030H
	MOV BX, AX
;Termina a soma e armazena em BX
;Guarda o resultado da dezena parcial 2 em CL 
	mov CL, BL
;e da centena parcial 1 em RESULTADO_CENTENA
	mov RESULTADO_CENTENA, BH


;Soma as duas dezenas parciais
	MOV BL, RESULTADO_DEZENA
	;A SEGUNDA DEZENA PARCIAL JÁ ESTÁ EM CL

	
	ADD BL, CL
	MOV AH, 0
	MOV AL, BL
	AAA
	ADD AX, 3030H
	MOV BX, AX
;Termina a soma e armazena em BX
;Guarda o resultado da dezena final em RESULTADO_DEZENA
	mov RESULTADO_DEZENA, BL
;e da centena parcial 2 em RESULTADO_CENTENA
	mov CL, BH




;Soma as duas centenas parciais
	MOV BL, RESULTADO_CENTENA
	;A SEGUNDA CENTENA PARCIAL JÁ ESTÁ EM CL

	ADD BL, CL
	MOV AH, 0
	MOV AL, BL
	AAA
	ADD AX, 3030H
	MOV BX, AX
;Termina a soma e armazena em BX
;Guarda o resultado da dezena final em RESULTADO_DEZENA
	mov RESULTADO_CENTENA, BL



	lea dx, msgResultado
     	CALL MOSTRA_STRING

	MOV DL, RESULTADO_CENTENA	
	CALL MOSTRA_CHAR
	
	MOV DL, RESULTADO_DEZENA	
	CALL MOSTRA_CHAR

	
	MOV DL, RESULTADO_UNIDADE	
	CALL MOSTRA_CHAR
 

;fim do código principal

proc1 endp

  int 20H



SOMA_DOIS_NUMEROS Proc Near   ;Entrada: Registradores BL e CL
	ADD BL, CL
	MOV AH, 0
	MOV AL, BL
	AAA
	ADD AX, 3030H
	MOV BX, AX

	int 21h
	ret
SOMA_DOIS_NUMEROS ENDP        ;Saida: Registrador DX


Mostra_String Proc Near
	MOV AH,09H
	INT 21H
	RET
Mostra_String ENDP


LE_TECLA PROC NEAR
	MOV AH, 01H	
	int 21H
	RET
LE_TECLA ENDP

MOSTRA_CHAR PROC NEAR
	MOV AH, 02
	INT 21H
	RET
MOSTRA_CHAR ENDP


codigo ends
end entrada



