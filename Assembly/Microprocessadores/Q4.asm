.model small

.stack 200

.data
buffer  db  31          ;30 caracteres
        db  ?           ;Nº caracteres inseridos
        db  31 dup(0)   ;Caracteres inseridos

.code
main proc
    mov ax,@data
    mov ds,ax
            
    mov ah,0Ah              ;Int de ler string
    mov dx,offset buffer
    int 21h

    mov si,offset buffer+1  ;Numero de caracteres inseridos
    mov cl,[si]             ;Move pra final de CL
    mov ch,0                
    inc cx                  ;Final da string+1
    add si,cx               
    mov al,'$'              
    mov [si],al             ;Coloca $ no final

    lea bx,offset buffer+2
    mov cx,30
A:
	mov ah,[bx]
    cmp ah,61h
    jb  B
    cmp ah,7Ah
    ja  B
    xor ah,00100000b
    mov [bx],ah

B:
	inc bx
    loop A
    
    mov ah,09h
    mov dx,offset buffer+2
    int 21h
            
    mov ax,4c00h
    int 21h
            
main endp
end main