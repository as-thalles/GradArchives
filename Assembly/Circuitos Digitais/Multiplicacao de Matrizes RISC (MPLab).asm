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
;=====================================================
;|| Resultados salvos nos registradores de r1 a r9	||
;|| Matriz 1 carregada em r11 a r33 (rLC)			||
;|| Matriz 2 carregada em s11 a s33 (rLC)			||
;=====================================================

#include<p16f84a.inc> ; Include do modelo do MPU

;=== Registradores ===
cblock H'0F'
lin
col

r11
r12
r13
r21
r22
r23
r31
r32
r33

s11
s12
s13
s21
s22
s23
s31
s32
s33

p1
p2
p3
p4
p5
p6
p7
p8
p9
p10
p11
p12
p13
p14
p15
p16
p17
p18
p19
p20
p21
p22
p23
p24
p25
p26
p27

r1
r2
r3
r4
r5
r6
r7
r8
r9

endc

;=== Limpar Registradores ===
clrf r1
clrf r2
clrf r3
clrf r4
clrf r5
clrf r6
clrf r7
clrf r8
clrf r9

clrf r11
clrf r12
clrf r13
clrf r21
clrf r22
clrf r23
clrf r31
clrf r32
clrf r33

clrf s11
clrf s12
clrf s13
clrf s21
clrf s22
clrf s23
clrf s31
clrf s32
clrf s33

clrf p1
clrf p2
clrf p3
clrf p4
clrf p5
clrf p6
clrf p7
clrf p8
clrf p9
clrf p10
clrf p11
clrf p12
clrf p13
clrf p14
clrf p15
clrf p16
clrf p17
clrf p18
clrf p19
clrf p20
clrf p21
clrf p22
clrf p23
clrf p24
clrf p25
clrf p26
clrf p27

;=== CARREGAR MATRIZES ===
;=== Matriz 1 ===
movlw D'01'
movwf r11

movlw D'02'
movwf r12

movlw D'03'
movwf r13

movlw D'04'
movwf r21

movlw D'05'
movwf r22

movlw D'06'
movwf r23

movlw D'07'
movwf r31

movlw D'08'
movwf r32

movlw D'09'
movwf r33

;=== Matriz 2 ===
movlw D'09'
movwf s11

movlw D'08'
movwf s12

movlw D'07'
movwf s13

movlw D'06'
movwf s21

movlw D'05'
movwf s22

movlw D'04'
movwf s23

movlw D'03'
movwf s31

movlw D'02'
movwf s32

movlw D'01'
movwf s33

;=== Multiplicações L1 M1 === 
		clrf	p1		
		movf  r11,0
		MULT_11	
		addwf	p1,1		
		decfsz	s11		
		goto	MULT_11	


		clrf	p2		
		movf  r12,0
		MULT_12	
		addwf	p2,1		
		decfsz	s21		
		goto	MULT_12	

		clrf	p3		
		movf  r13,0
		MULT_13	
		addwf	p3,1		
		decfsz	s31		
		goto	MULT_13	

		clrf	p4		
		movf  r11,0
		MULT_14	
		addwf	p4,1		
		decfsz	s12		
		goto	MULT_14	

		clrf	p5		
		movf  r12,0
		MULT_15	
		addwf	p5,1		
		decfsz	s22		
		goto	MULT_15	

		clrf	p6		
		movf  r13,0
		MULT_16	
		addwf	p6,1		
		decfsz	s32		
		goto	MULT_16	

		clrf	p7		
		movf  r11,0
		MULT_17	
		addwf	p7,1		
		decfsz	s13		
		goto	MULT_17	

		clrf	p8		
		movf  r12,0
		MULT_18	
		addwf	p8,1		
		decfsz	s23		
		goto	MULT_18	
		
		clrf	p9		
		movf  r13,0
		MULT_19	;
		addwf	p9,1	
		decfsz	s33	
		goto	MULT_19	

; --- Reseta Matriz 2 (fora decrementada) ---
movlw D'09'
movwf s11

movlw D'08'
movwf s12

movlw D'07'
movwf s13

movlw D'06'
movwf s21

movlw D'05'
movwf s22

movlw D'04'
movwf s23

movlw D'03'
movwf s31

movlw D'02'
movwf s32

movlw D'01'
movwf s33

;=== Multiplicações L2 M1 === 
		clrf	p10		
		movf  r21,0
		MULT_21	
		addwf	p10,1		
		decfsz	s11		
		goto	MULT_21	


		clrf	p11		
		movf  r22,0
		MULT_22	
		addwf	p11,1		
		decfsz	s21		
		goto	MULT_22	

		clrf	p12		
		movf  r23,0
		MULT_23	
		addwf	p12,1	
		decfsz	s31		
		goto	MULT_23	

		clrf	p13		
		movf  r21,0
		MULT_24	
		addwf	p13,1		
		decfsz	s12		
		goto	MULT_24	

		clrf	p14		
		movf  r22,0
		MULT_25	
		addwf	p14,1		
		decfsz	s22		
		goto	MULT_25	

		clrf	p15		
		movf  r23,0
		MULT_26	
		addwf	p15,1		
		decfsz	s32		
		goto	MULT_26	

		clrf	p16		
		movf  r21,0
		MULT_27	
		addwf	p16,1		
		decfsz	s13		
		goto	MULT_27	

		clrf	p17		
		movf  r22,0
		MULT_28	
		addwf	p17,1		
		decfsz	s23		
		goto	MULT_28	
		
		clrf	p18		
		movf  r23,0
		MULT_29	
		addwf	p18,1		
		decfsz	s33	
		goto	MULT_29	

; --- Reseta Matriz 2 (fora decrementada) ---
movlw D'09'
movwf s11

movlw D'08'
movwf s12

movlw D'07'
movwf s13

movlw D'06'
movwf s21

movlw D'05'
movwf s22

movlw D'04'
movwf s23

movlw D'03'
movwf s31

movlw D'02'
movwf s32

movlw D'01'
movwf s33

;=== Multiplicações L3 M1 === 
		clrf	p19		
		movf  r31,0
		MULT_31	
		addwf	p19,1		
		decfsz	s11		
		goto	MULT_31	


		clrf	p20		
		movf  r32,0
		MULT_32	
		addwf	p20,1		
		decfsz	s21		
		goto	MULT_32	

		clrf	p21		
		movf  r33,0
		MULT_33	
		addwf	p21,1	
		decfsz	s31		
		goto	MULT_33	

		clrf	p22		
		movf  r31,0
		MULT_34	
		addwf	p22,1	
		decfsz	s12		
		goto	MULT_34	

		clrf	p23		
		movf  r32,0
		MULT_35	
		addwf	p23,1		
		decfsz	s22		
		goto	MULT_35	

		clrf	p24		
		movf  r33,0
		MULT_36	
		addwf	p24,1	
		decfsz	s32		
		goto	MULT_36	

		clrf	p25 	
		movf  r31,0
		MULT_37	
		addwf	p25,1	
		decfsz	s13		
		goto	MULT_37	

		clrf	p26		
		movf  r32,0
		MULT_38	
		addwf	p26,1		
		decfsz	s23		
		goto	MULT_38	
		
		clrf	p27		
		movf  r33,0
		MULT_39	
		addwf	p27,1		
		decfsz	s33	
		goto	MULT_39	

;=== Soma todos os Ps nas respectivas posições e resultados ===
	clrw
	movf r1
	addwf p1,0
	addwf p2,0
	addwf p3,0
	movwf r1

	clrw
	movf r2
	addwf p4,0
	addwf p5,0
	addwf p6,0
	movwf r2

	clrw
	movf r3
	addwf p7,0
	addwf p8,0
	addwf p9,0
	movwf r3

	clrw
	movf r4
	addwf p10,0
	addwf p11,0
	addwf p12,0
	movwf r4

	clrw
	movf r5
	addwf p13,0
	addwf p14,0
	addwf p15,0
	movwf r5

	clrw
	movf r6
	addwf p16,0
	addwf p17,0
	addwf p18,0
	movwf r6

	clrw
	movf r7
	addwf p19,0
	addwf p20,0
	addwf p21,0
	movwf r7

	clrw
	movf r8
	addwf p22,0
	addwf p23,0
	addwf p24,0
	movwf r8

	clrw
	movf r9
	addwf p25,0
	addwf p26,0
	addwf p27,0
	movwf r9

end