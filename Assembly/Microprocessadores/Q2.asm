.model small

.stack 200

.data

.code
main proc
    mov ah,01h
    int 21h
    mov dh,al

    int 21h
    mov dl,al

    cmp dh,dl
    jg sw

bk:
	mov ah,02h
    int 21h

    mov ax,4c00h
    int 21h

sw:
	mov dl,dh
    jmp bk

main endp
end main