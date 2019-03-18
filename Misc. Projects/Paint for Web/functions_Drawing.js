//Limpar Canvas e redesenha
function reDrawCanvas(){
	context_drawing.clearRect(0, 0, canvas_drawing.width,
		canvas_drawing.height)
	for(var i=0; i < figureStack.length; i++){
		figureStack[i].draw(context_drawing)
	}
}
// Reinicia as variáveis
function resetVariables(){
	tempFigure 	= undefined
	clickCount 	= 0
	mousePos 	= undefined
	pick		= -1
}
// Distância entre pontos
function getDistance(point1, point2){
	var distance = Math.sqrt(Math.pow(point1.x - point2.x,2)
			+ Math.pow(point1.y - point2.y, 2))
	return distance
}

function createPoint(){
	if(tempFigure == undefined){
		tempFigure = new Ponto(getMousePos())
		tempFigure.color = global_Color
		tempFigure.lineWidth = global_linWid
	}else{
		figureStack.push(tempFigure)
		resetVariables()
	}
}

function createLine(){
	if(tempFigure == undefined){
		tempFigure = new Linha(getMousePos())
		tempFigure.color = global_Color
		tempFigure.lineWidth = global_linWid
	}else{
		figureStack.push(tempFigure)
		resetVariables()
	}
}

function createPolygon(){
	if(tempFigure == undefined){
		var temPos = getMousePos()
		tempFigure = new Poligono(temPos)
		tempFigure.pointsArray.push(temPos)
		tempFigure.color = global_Color
		tempFigure.lineWidth = global_linWid
	}else if(tempFigure.isDrawing == false){
		figureStack.push(tempFigure)
		resetVariables()
	}else{
		if(mouseIsDown == false){
			tempFigure.pointsArray.push(getMousePos())
		}
	}
}

function createBezier(){
	if(tempFigure == undefined){
		tempFigure = new Bezier(getMousePos())
		tempFigure.color = global_Color
		tempFigure.lineWidth = global_linWid
		clickCount = 3
	}else if(mouseIsDown == false){
		if(clickCount == 0){
			figureStack.push(tempFigure)
			resetVariables()
		}
	}
}

function createArc(){
	if(tempFigure == undefined){
		tempFigure = new Arco(getMousePos())
		console.log(tempFigure)
		tempFigure.color = global_Color
		tempFigure.lineWidth = global_linWid
		clickCount = 2
	}else if(mouseIsDown == false){
		if(clickCount == 0){
			figureStack.push(tempFigure)
			resetVariables()	
		}else if(clickCount < 0){
			tempFigure.control = 0
			figureStack.push(tempFigure)
			resetVariables()
		}
	}
}

function createCurve(){
	if(tempFigure == undefined){
		tempFigure = new Bezier(getMousePos())
		tempFigure.color = global_Color
		tempFigure.lineWidth = global_linWid
		clickCount = 2
	}else if(mouseIsDown == false){
		if(clickCount == 0){
			figureStack.push(tempFigure)
			resetVariables()
		}
	}
}