;=============================
;||	Thalles Alencar Silva	||
;||	2012 034 847			||
;||							||
;||	PIC 16F84A				||
;||	Multiplicação 3x3		||
;=============================
;=========================
;|| Matrizes Utilizadas	||
;|| | 1 2 3 | 9 8 7 |	||
;|| | 4 5 6 | 6 5 4 |	||
;|| | 7 8 9 | 3 2 1 |	||
;=========================

; Matrizes P/ multiplicar
	ORG	$0000
;============
; Matriz 1	|
;============
m1l1c1	FCB	$00
m1l1c2	FCB	$01
m1l1c3	FCB	$02
m1l1c4	FCB	$03
m1l2c1	FCB	$04
m1l2c2	FCB	$05
m1l2c3	FCB	$06
m1l2c4	FCB	$07
m1l3c1	FCB	$08
m1l3c2	FCB	$09
m1l3c3	FCB	$0A
m1l3c4	FCB	$0B
m1l4c1	FCB	$0C
m1l4c2	FCB	$0D
m1l4c3	FCB	$0E
m1l4c4	FCB	$0F
;============
; Matriz 2	|
;============
m2l1c1	FCB	$10
m2l1c2	FCB	$11
m2l1c3	FCB	$12
m2l1c4	FCB	$13
m2l2c1	FCB	$14
m2l2c2	FCB	$15
m2l2c3	FCB	$16
m2l2c4	FCB	$17
m2l3c1	FCB	$18
m2l3c2	FCB	$19
m2l3c3	FCB	$1A
m2l3c4	FCB	$1B
m2l4c1	FCB	$1C
m2l4c2	FCB	$1D
m2l4c3	FCB	$1E
m2l4c4	FCB	$1F
;================
end	FCB	$00		|
;====================
; Matriz resultado	|
;====================
	ORG	$0050
mRl1c1	FDB	$00
mRl1c2	FDB	$00
mRl1c3	FDB	$00
mRl1c4	FDB	$00
mRl2c1	FDB	$00
mRl2c2	FDB	$00
mRl2c3	FDB	$00
mRl2c4	FDB	$00
mRl3c1	FDB	$00
mRl3c2	FDB	$00
mRl3c3	FDB	$00
mRl3c4	FDB	$00
mRl4c1	FDB	$00
mRl4c2	FDB	$00
mRl4c3	FDB	$00
mRl4c4	FDB	$00
;=============================
;=============================
; Algoritmo
	ORG	$B600
; LINHA 1
	ldx	#m1l1c1
	ldy	#m2l1c1
r1	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl1c1
	std	mRl1c1
	inx
	iny
	iny
	iny
	iny
	cpx	#m1l2c1
	bne	r1

	ldx	#m1l1c1
	ldy	#m2l1c2
r2	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl1c2
	std	mRl1c2
	inx
	iny
	iny
	iny
	iny
	cpx	#m1l2c1
	bne	r2

	ldx	#m1l1c1
	ldy	#m2l1c3
r3	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl1c3
	std	mRl1c3
	inx
	iny
	iny
	iny
	iny
	cpx	#m1l2c1
	bne	r3

	ldx	#m1l1c1
	ldy	#m2l1c4
r4	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl1c4
	std	mRl1c4
	inx
	iny
	iny
	iny
	iny
	cpx	#m1l2c1
	bne	r4

; LINHA 2
	ldx	#m1l2c1
	ldy	#m2l1c1
r5	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl2c1
	std	mRl2c1
	inx
	iny
	iny
	iny
	iny
	cpx	#m1l3c1
	bne	r5

	ldx	#m1l2c1
	ldy	#m2l1c2
r6	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl2c2
	std	mRl2c2
	inx
	iny
	iny
	iny
	iny
	cpx	#m1l3c1
	bne	r6

	ldx	#m1l2c1
	ldy	#m2l1c3
r7	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl2c3
	std	mRl2c3
	inx
	iny
	iny
	iny
	iny
	cpx	#m1l3c1
	bne	r7

	ldx	#m1l2c1
	ldy	#m2l1c4
r8	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl2c4
	std	mRl2c4
	inx
	iny
	iny
	iny
	iny
	cpx	#m1l3c1
	bne	r8
; LINHA 3
	ldx	#m1l3c1
	ldy	#m2l1c1
r9	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl3c1
	std	mRl3c1
	inx
	iny
	iny
	iny
	iny
	cpx	#m1l4c1
	bne	r9

	ldx	#m1l3c1
	ldy	#m2l1c2
r10	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl3c2
	std	mRl3c2
	inx
	iny
	iny
	iny
	iny
	cpx	#m1l4c1
	bne	r10

	ldx	#m1l3c1
	ldy	#m2l1c3
r11	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl3c3
	std	mRl3c3
	inx
	iny
	iny
	iny
	iny
	cpx	#m1l4c1
	bne	r11

	ldx	#m1l3c1
	ldy	#m2l1c4
r12	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl3c4
	std	mRl3c4
	inx
	iny
	iny
	iny
	iny
	cpx	#m1l4c1
	bne	r12
; LINHA 4
	ldx	#m1l4c1
	ldy	#m2l1c1
r13	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl4c1
	std	mRl4c1
	inx
	iny
	iny
	iny
	iny
	cpx	#$0010
	bne	r13

	ldx	#m1l4c1
	ldy	#m2l1c2
r14	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl4c2
	std	mRl4c2
	inx
	iny
	iny
	iny
	iny
	cpx	#$0010
	bne	r14

	ldx	#m1l4c1
	ldy	#m2l1c3
r15	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl4c3
	std	mRl4c3
	inx
	iny
	iny
	iny
	iny
	cpx	#$0010
	bne	r15

	ldx	#m1l4c1
	ldy	#m2l1c4
r16	ldaa	$0,x
	ldab	$0,y
	mul
	addd	mRl4c4
	std	mRl4c4
	inx
	iny
	iny
	iny
	iny
	cpx	#$0010
	bne	r16

	stop
;=============================
;=============================
;=============================
		