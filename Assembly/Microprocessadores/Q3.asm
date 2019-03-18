.model small

.stack 200

.data
par     db ' Par', "$"
impar   db ' Impar', "$"

.code
main proc
	mov ah,01h
    int 21h     ;Pega valor

    mov ah,0
    mov dh,2
    div dh
    cmp ah,0
    jg  setImpar

setPar:
	mov ax,@data
    mov ds,ax
    lea dx,offset par

bk: 
	mov ah,09h
    int 21h

    mov ax,4c00h
    int 21h
            
setImpar:
	mov ax,@data
    mov ds,ax
    lea dx,offset impar
    jmp bk
            
main endp
end main