/*-----------------------------------------*/
//Drawing Canvas
var canvas_drawing  = document.getElementById('canvasCG')
var context_drawing	= canvas_drawing.getContext('2d')
var rect 			= canvas_drawing.getBoundingClientRect()
function firstSetup(){
	context_drawing.clearRect(0, 0, canvas_drawing.width, canvas_drawing.height)
	document.getElementById("canvasCG").style.backgroundColor = 'rgb(255, 255, 255)'

	tempHull = new Poligono({x:0, y:0}) //Fecho convexo. Mostra em Drag 'n' Drop.
	tempHull.isDrawing = false	//Pra desenhar assim que os pontos já forem definidos
	tempHull.color = 'red'
}
/*-----------------------------------------*/
//SELEÇÃO DE FERRAMENTAS
var currDTool = 'point'	//Ferramenta Desenho
var currMTool = 'dndrop'//Desenhando/manipulando
var action 	  = 'draw'	//Pega açao atual (desenhando/draw ou manipulando/manip)
/*-----------------------------------------*/
//Pega ferramenta de desenho
function swapDTool(){
	currDTool = document.getElementById("toolType_dTools").value
	console.log('currDTool to ' + currDTool)
}
//Pega ferramenta de manipulação
function swapManTool(){
	currMTool = document.getElementById("toolType_manipTools").value
	console.log('currMTool to ' + currMTool)
}
//Pega se desenhando ou manipulando
function switchDraw(){	//Desenhando
	action = document.getElementById("radioPaint").value
	console.log('action to ' + action)
}
function switchManip(){	//Manipulando
	action = document.getElementById("radioManip").value
	console.log('action to ' + action)
}
/*-----------------------------------------*/
//VARIÁVEIS DE EVENTOS
//Mais importantes
var figureStack = []		//Toda a stack de desenho aqui
var mouse 		= {x:0, y:0}//Mantém posição de mouse
// Retorna posição atual do mouse
function getMousePos(){
	var pos = {x: mouse.x, y:mouse.y}
	return pos
}
var polygonCenter = {x:0, y:0}
//Style
var global_Color = 'rgb(0,0,0)'
var global_linWid= 1
//Uso flutuante e gambiarras
var tempFigure 	= undefined	//Para desenhar em tempo de execução
var tempHull	= undefined
var clickCount 	= 0 //Gambiarra-ish para criação de formas multi-click
					//Edit: agora virou gambiarra mesmo (rotacionar)
var mousePos 	= undefined	//Not sure yet
var mouseIsDown = false //Nome óbvio, explicar é desnecessário
var pick 		= -1 //Posição em figureStack da figura selecionada
