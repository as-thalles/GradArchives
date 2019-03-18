canvas_drawing.addEventListener('mousemove', function(e){
	//Mantém a posição do mouse atualizada
	mouse.x = Math.round((e.clientX-rect.left)/(rect.right-rect.left)*canvas_drawing.width)
	mouse.y = Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*canvas_drawing.height)
	//Limpa e desenha novamente na tela
	reDrawCanvas()
	//Atualizando desenho de figuras em tempo real
	if((tempFigure != undefined) && (mouseIsDown == true)){
		if(action == 'draw'){
			switch(currDTool){
				case 'point':
					tempFigure.pointPos = getMousePos()
					break
				case 'line':
					tempFigure.pointFin = getMousePos()
					break
				case 'polygon':
					tempFigure.dragPoint = getMousePos()
					break
				case 'bezier':
					if(clickCount==3){
						tempFigure.pointFin = getMousePos()
					}else if(clickCount==2){
						tempFigure.ctrlPoint1 = getMousePos()
					}else if(clickCount==1){
						tempFigure.ctrlPoint2 = getMousePos()
					}
					break					
				case 'arc':
					if(clickCount==2){
						tempFigure.radius  = getDistance(getMousePos(), tempFigure.center)
					}else if(clickCount==1){
						tempFigure.control = getDistance(getMousePos(), tempFigure.center)/10
					}
					break
				case 'curve':
					if(clickCount==2){
						tempFigure.pointFin = getMousePos()
					}else if(clickCount==1){
						tempFigure.ctrlPoint1 = getMousePos()
						tempFigure.ctrlPoint2 = getMousePos()
					}
					break
			}
		}
	}
	if(mouseIsDown == true && pick != -1){
		if(action == 'manip'){
			switch(currMTool){
				case 'dndrop':
					dragNdrop(pick, mousePos)
					mousePos = getMousePos()
					break
				case 'rotate':
					if(clickCount == 2){
						tempFigure.radius += getDistance(tempFigure.center, getMousePos())
						tempFigure.center = getMousePos()
					}else if(clickCount == 1){
						rotate(pick, tempFigure.center)
					}
					break
				case 'mirror':
					/*
					if(clickCount == 1){
						tempFigure.pointFin = getMousePos()
					}
					*/
					break
				case 'resize':
					resize(pick, mousePos)
					mousePos = getMousePos()
					break
			}
		}
	}
	if(tempFigure != undefined){
		tempFigure.draw(context_drawing)
	}
	if(tempHull.pointsArray.length >= 3){
		for(var i=0; i<tempHull.pointsArray.length; i++){
			tempHull.pointsArray[i].x += (mouse.x - mousePos.x)
			tempHull.pointsArray[i].y += (mouse.y - mousePos.y)
		}
		tempHull.draw(context_drawing)
	}
}, false)
//Redesenhar as imagens do Canvas. Ignorância, sim.
function reDrawMUp(){
	reDrawCanvas()
	if(tempFigure != undefined){
		tempFigure.draw(context_drawing)
	}
}
//Isso serve pra finalizar os desenhos de polígono e arco
canvas_drawing.addEventListener('contextmenu', function(e){
	e.preventDefault()
	if(action == 'draw' && currDTool == 'polygon'){
		if(tempFigure != undefined){
			tempFigure.isDrawing = false
		}
	}else if(action == 'draw' && currDTool == 'arc'){
		if(tempFigure != undefined){
			clickCount = 0
		}
	}
}, false)
//Toda operação se inicia com um clique
canvas_drawing.addEventListener('mousedown', function(e){
	mouseIsDown = true
	switch(action){
		case 'draw':
			switch(currDTool){
				case 'point':
					createPoint()
					break
				case 'line':
					createLine()
					break
				case 'polygon':
					createPolygon()
					break
				case 'bezier':
					createBezier()
					break					
				case 'arc':
					createArc()
					break
				case 'curve':
					createCurve()
					break
			}
			break
		case 'manip':
			console.log(action)
			console.log(currMTool)
			switch(currMTool){
				case 'dndrop':
					pick = generalPick()
					mousePos = getMousePos()
					console.log(getCHull(pick))
					tempHull.pointsArray = getCHull(pick)
					break
				case 'rotate':
					mousePos = getMousePos()
					if(clickCount == 0){
						tempFigure = new Arco(getMousePos())
						pick 		= generalPick()
						clickCount  = 2
					}
					break
				case 'mirrorX':
					pick = generalPick()
					mirror(pick)
					break
				case 'mirrorY':
					pick = generalPick()
					mirror(pick)
					break
				case 'resize':
					pick = generalPick()
					mousePos = getMousePos()
					break
			}
			break
	}
}, false)

canvas_drawing.addEventListener('mouseup', function(e){
	mouseIsDown = false
	switch(action){
		case 'draw':
			switch(currDTool){
				case 'point':
					createPoint()
					break
				case 'line':
					createLine()
					break
				case 'polygon':
					createPolygon()
					break
				case 'bezier':
					clickCount--
					createBezier()
					break
				case 'arc':
					clickCount--
					createArc()
					break
				case 'curve':
					clickCount--
					createBezier()
					break
			}
			break
		case 'manip':
			if(currMTool=='dndrop'){
				tempHull.pointsArray = []
			}else if(currMTool=='rotate'){
				clickCount--
				if(clickCount == 0){
					resetVariables()
				}
			}
			break
	}
	reDrawMUp()
}, false)