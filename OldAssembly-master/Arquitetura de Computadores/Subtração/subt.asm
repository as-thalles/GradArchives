codigo segment

	assume cs: codigo; ds: codigo; es: codigo; ss: codigo
	org 100h

entrada: jmp proc1

msg1 db 0dh,0ah, "Entre com o primeiro valor: $"
msg2 db 0dh,0ah, "Entre com o segundo valor: $"
msgResultado db 0dh,0ah, "Resultado: $"

msgNegativo db "-$"

proc1 proc near

	lea dx, msg1
	CALL MOSTRA_STRING
	CALL LE_TECLA	
	MOV BL, AL

	lea dx, msg2
	CALL MOSTRA_STRING
	call LE_TECLA
	MOV CL, AL
	
cmp BL, CL	
jg subtracaoMAIOR
jl subtracaoMENOR

subtracaoMAIOR:
	SUB BL, CL
	MOV AH, 0
	MOV AL, BL
	
	AAS
	ADD AX, 3030h
	MOV BX, AX

	lea dx, msgResultado
     	CALL MOSTRA_STRING

	MOV DL, BH	
	CALL MOSTRA_CHAR
	
	MOV DL, BL
	CALL MOSTRA_CHAR 

	jmp fim
	
subtracaoMENOR:
	SUB CL, BL
	MOV AH, 0
	MOV AL, CL
	
	AAS
	ADD AX, 3030h
	MOV BX, AX

	lea dx, msgResultado
   	CALL MOSTRA_STRING
	
	lea dx, msgNegativo
	CALL MOSTRA_STRING
	
	MOV DL, BH	
	CALL MOSTRA_CHAR
	
	MOV DL, BL
	CALL MOSTRA_CHAR 

fim:
proc1 endp
int 20H

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