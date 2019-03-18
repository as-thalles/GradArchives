.model small

.stack 200

.data
buffer  db  31          ;30 caracteres
        db  ?           ;N� caracteres inseridos
        db  31 dup(0)   ;Caracteres inseridos

.code
main proc
    ;Recebe entrada
    mov ax,@data
    mov ds,ax
            
    mov ah,0Ah              ;Int de ler string
    mov dx,offset buffer
    int 21h

    ;Coloca $ no final da string
    mov si,offset buffer+1  ;Numero de caracteres inseridos
    mov cl,[si]             ;Move pra final de CL
    mov ch,0                
    inc cx                  ;Final da string+1
    add si,cx               
    mov al,'$'              
    mov [si],al             ;Coloca $ no final

;Loop twice pra imprimir primeiro os n�meros, depois os s�mbolos
    ;1a vez pra operandos
    lea bx,offset buffer+2
    mov cx,30

A1: ;Faz o teste se � operando
    mov ah,[bx]
    cmp ah,30h
    jge Operando    ;Se � n�mero/letra
        
B1: ;Loop
    inc bx          ;Pr�ximo valor da string
    loop A1         ;Repete (30x - n�mero m�ximo de d�gitos)

    ;2a vez pra operadores
    lea bx,offset buffer+2
    mov cx,30
    
A2: ;Faz o teste se � operador
    mov ah,[bx]
    cmp ah,30h
    jl  Operador    ;Se � operador
    
B2: ;Loop
    inc bx          ;Pr�ximo valor da string
    loop A2         ;Repete (30x - n�mero m�ximo de d�gitos)

    mov ax,4c00h
    int 21h

Operando:
    mov ah,02h
    mov dl,[bx]
    int 21h
    jmp B1
    
Operador:
    mov ah,02h
    mov dl,[bx]
    int 21h
    jmp B2

main endp
end main