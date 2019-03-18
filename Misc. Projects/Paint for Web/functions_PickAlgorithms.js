/*
PICK ALGORITHMS - CG Canvas
O que estas funções retornam são as posições
	dos items em figureStack.
*/

//Tolerance value:
var tol = 0.1

//Pick de Ponto:
function pointPick(){
	for(var i=0; i<figureStack.length; i++){
		if(figureStack[i].id == 'Ponto'){
			var dist = getDistance(figureStack[i].pointPos, getMousePos())
			if(dist < (tol+3)){
				return i
			}
		}
	}
	return -1
}

//Pick de Linha
function getBox(){
	var clickBox = getMousePos()
	var box = ({xMin:clickBox.x-tol, xMax:clickBox.x+tol,
		yMin:clickBox.y-tol, yMax:clickBox+tol})
	return box
}

function getPickCode(point){
	var pickCode = ({l:0, r:0, d:0, u:0})
	var box = getBox()
	if(point.x < box.xMin)
		pickCode.l = 1	
	if(point.x > box.xMax)
		pickCode.r = 1	
	if(point.y < box.yMin)
		pickCode.u = 1	
	if(point.y > box.yMax)
		pickCode.d = 1
	
	return [pickCode.l, pickCode.r, pickCode.d, pickCode.u]
}

function linePick(){
	var cod0, cod1
	
	var box = getBox()
	var xmin = box.xMin
	var xmax = box.xMax
	var ymin = box.yMin
	var ymax = box.yMax

	for(var i=0; i<figureStack.length; i++){
		if(figureStack[i].id == 'Linha'){
			var p0 = ({x:figureStack[i].pointIn.x, y:figureStack[i].pointIn.y})
			var p1 = ({x:figureStack[i].pointFin.x, y:figureStack[i].pointFin.y})
			cod1 = getPickCode (p1)
			while(true){
				cod0 = getPickCode (p0)
				for (var j=0; j<4; j++){
					if ((cod0[j] + cod1[j])>1){
						break
					}
				}
				if (j != 4){
					break
				}
				if (cod0.l){
					p0.y += ((xmin - p0.x) * (p1.y - p0.y)) / (p1.x - p0.x)
					p0.x = xmin
				}else if (cod0.r){
					p0.y += ((xmax - p0.x) * (p1.y - p0.y)) / (p1.x - p0.x)
					p0.x = xmax
				}else if (cod0.d){
					p0.x += ((ymin - p0.y) * (p1.x - p0.x)) / (p1.y - p0.y)
					p0.y = ymin
				}else if (cod0.u){
					p0.x += ((ymax - p0.y) * (p1.x - p0.x)) / (p1.y - p0.y)
					p0.y = ymax
				}else{
					return i
				}
			}
		}
	}
	return -1;
}

//Pick de Polígono
function checkPolygonPick(element, mousePos){
	var shot = 0
	var first = ((element.pointsArray.length)-1)
	var p1, p2
	var firsTime = 0

	for(var i=0; i<element.pointsArray.length; i++){
		p1 = element.pointsArray[i]
		p2 = element.pointsArray[first]
		if (!(p1.y == p2.y) &&
			!((p1.y > mousePos.y)&&(p2.y > mousePos.y)) &&
			!((p1.y < mousePos.y)&&(p2.y < mousePos.y)) &&
			!((p1.x < mousePos.x)&&(p2.x < mousePos.x))){
   			if(p1.y == mousePos.y){
     			if((p1.x > mousePos.x) && (p2.y > mousePos.y)){
       				shot++
     			}
   			}else{
     			if(p2.y == mousePos.y){
     				if((p2.x > mousePos.x) && (p1.y > mousePos.y)){
      					shot++
     				}
    			}else{
     				if((p1.x > mousePos.x) && (p2.x > mousePos.x)){
      					shot++
     				}else{
      					var dx = p1.x - p2.x
      					var xc = p1.x
      					if ( dx != 0 ){
							xc += ( mousePos.y - p1.y ) * dx / ( p1.y - p2.y )
      					}
      					if (xc > mousePos.x){
							shot++
      					}
     				}
    			}
   			}
  		}
  		first = i
	}
	if(shot % 2 == 1){
		return true
	}
	return false
}

function polygonPick(){
	var polygons = []
	var clickPos = getMousePos()
	for(var i=0; i<figureStack.length; i++){
		if(figureStack[i].id == 'Poligono'){
			if(checkPolygonPick(figureStack[i], clickPos) == true){
				return i
			}
		}
	}
	return -1
}

//Pick de Arco:
function arcPick(){
	for(var i=0; i<figureStack.length; i++){
		if(figureStack[i].id == 'Arco'){
			if(getDistance(figureStack[i].center, getMousePos())
					< figureStack[i].radius){
				return i
			}
		}
	}
	return -1
}

//Pick de Bezier:
function bezierPick(){
	click = getMousePos()
	for(var i=0; i<figureStack.length; i++){
		if(figureStack[i].id == 'Bezier'){
			if((getDistance(click, figureStack[i].pointIn) <= tol+3)
			|| (getDistance(click, figureStack[i].pointFin) <= tol+3))
				return i
		}
	}
	return -1
}

//Main Pick Function:
function generalPick(){
	var desiredForm = -1
	desiredForm = pointPick()
	if(desiredForm != -1){
		console.log(desiredForm)
		return desiredForm
	}
	desiredForm = linePick()
	if(desiredForm != -1){
		console.log(desiredForm)
		return desiredForm
	}
	desiredForm = polygonPick()
	if(desiredForm != -1){
		console.log(desiredForm)
		return desiredForm
	}
	desiredForm = arcPick()
	if(desiredForm != -1){
		console.log(desiredForm)
		return desiredForm
	}
	desiredForm = bezierPick()
	if(desiredForm != -1){
		console.log(desiredForm)
		return desiredForm
	}
	return desiredForm
}