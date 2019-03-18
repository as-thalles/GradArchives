.model small

.stack 200

.data

.code
main proc
    mov dx,255
    mov ah,02h
envia:
	mov al,20h
    int 21h
    dec dx
    jnz envia

    mov	ax,4c00h
    int	21h
main endp
end main