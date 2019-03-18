/////////////////////////////////////////////////
//DRAG AND DROP//
/////////////////////////////////////////////////
function movePoint(figure){
	figure.pointPos.x = mouse.x
	figure.pointPos.y = mouse.y
}

function moveLine(figure, mousePos){
	figure.pointIn.x += (mouse.x - mousePos.x)
	figure.pointIn.y += (mouse.y - mousePos.y)

	figure.pointFin.x+= (mouse.x - mousePos.x)
	figure.pointFin.y+= (mouse.y - mousePos.y)
}

function movePolygon(figure, mousePos){
	for(var i=0; i<figure.pointsArray.length; i++){
		figure.pointsArray[i].x += (mouse.x - mousePos.x)
		figure.pointsArray[i].y += (mouse.y - mousePos.y)
	}
}

function moveArc(figure, mousePos){
	figure.center.x += (mouse.x - mousePos.x)
	figure.center.y += (mouse.y - mousePos.y)
}

function moveBezier(figure, mousePos){
	figure.pointIn.x 	+= (mouse.x - mousePos.x)
	figure.pointIn.y 	+= (mouse.y - mousePos.y)

	figure.pointFin.x	+= (mouse.x - mousePos.x)
	figure.pointFin.y	+= (mouse.y - mousePos.y)

	figure.ctrlPoint1.x += (mouse.x - mousePos.x)
	figure.ctrlPoint1.y += (mouse.y - mousePos.y)

	figure.ctrlPoint2.x += (mouse.x - mousePos.x)
	figure.ctrlPoint2.y += (mouse.y - mousePos.y)
}

function dragNdrop(figurePos, mousePos){	
	if(figurePos != -1){
		if(figureStack[figurePos].id == 'Ponto'){
			movePoint(figureStack[figurePos])
		}else if(figureStack[figurePos].id == 'Linha'){
			moveLine(figureStack[figurePos], mousePos)
		}else if(figureStack[figurePos].id == 'Poligono'){
			movePolygon(figureStack[figurePos], mousePos)
		}else if(figureStack[figurePos].id == 'Arco'){
			moveArc(figureStack[figurePos], mousePos)
		}else if(figureStack[figurePos].id == 'Bezier'){
			moveBezier(figureStack[figurePos], mousePos)
		}
	}
}
/////////////////////////////////////////////////
//RESIZE//
/////////////////////////////////////////////////
function resizeLine(figure, mousePos){
	var dumbDistance = {x:figure.pointIn.x, y:figure.pointIn.y}
	var factor = (mouse.x/mousePos.x)
	figure.pointIn.x *= factor
	figure.pointIn.y *= factor
	figure.pointFin.x*= factor
	figure.pointFin.y*= factor
	dumbDistance.x -= figure.pointIn.x
	dumbDistance.y -= figure.pointIn.y
	figure.pointIn.x += dumbDistance.x
	figure.pointIn.y += dumbDistance.y
	figure.pointFin.x+= dumbDistance.x
	figure.pointFin.y+= dumbDistance.y
	

}
//Ficou desnecessária
function get_polygon_centroid(points){
	var pts = points.slice()
	var area =0
	for(var i=0; i<pts.length-1; i++){
		area += ((pts[i].x*pts[i+1].y)-(pts[i+1].x*pts[i].y))
	}
	area = (area/2)
	var cx=0, cy=0
	for(var i=0; i<pts.length-1; i++){
		cx += ((pts[i].x+pts[i+1].x)*((pts[i].x*pts[i+1].y)-(pts[i+1].x*pts[i].y)))
	}
	cx = (cx/(6*area))
	for(var i=0; i<pts.length-1; i++){
		cy += ((pts[i].y+pts[i+1].y)*((pts[i].x*pts[i+1].y)-(pts[i+1].x*pts[i].y)))
	}
	cy = (cy/(6*area))
	return {x:cx, y:cy}
}

function resizePolygon(figure, mousePos){
	var dumbDistance = {x:figure.pointsArray[0].x, y:figure.pointsArray[0].y}
	var factor = (mouse.x/mousePos.x)
	for(var i=0; i<figure.pointsArray.length; i++){
		figure.pointsArray[i].x *= factor
		if(figure.pointsArray[i].x <= 0){
			figure.pointsArray[i].x = 1
		}
		figure.pointsArray[i].y *= factor
		if(figure.pointsArray[i].y <= 0){
			figure.pointsArray[i].y = 1
		}
	}
	dumbDistance.x -= figure.pointsArray[0].x
	dumbDistance.y -= figure.pointsArray[0].y
	for(var i=0; i<figure.pointsArray.length; i++){
		figure.pointsArray[i].x += dumbDistance.x
		figure.pointsArray[i].y += dumbDistance.y		
	}
}

function resizeArc(figure, mousePos){
	figure.radius += mouse.x - mousePos.x
}

function resizeBezier(figure, mousePos){
	figure.pointIn.x	+= ((mouse.x - mousePos.x)/2)
	figure.pointIn.y	+= ((mouse.y - mousePos.y)/2)
	figure.pointFin.x	-= ((mouse.x - mousePos.x)/2)
	figure.pointFin.y	-= ((mouse.y - mousePos.y)/2)
	figure.ctrlPoint1.x	+= ((mouse.x - mousePos.x)/2)
	figure.ctrlPoint1.y	+= ((mouse.y - mousePos.y)/2)
	figure.ctrlPoint2.x	-= ((mouse.x - mousePos.x)/2)
	figure.ctrlPoint2.y	-= ((mouse.y - mousePos.y)/2)
}

function resize(figurePos, mousePos){
	if(figureStack[figurePos].id == 'Linha'){
		resizeLine(figureStack[figurePos], mousePos)
	}else if(figureStack[figurePos].id == 'Poligono'){
		resizePolygon(figureStack[figurePos], mousePos)
	}else if(figureStack[figurePos].id == 'Arco'){
		resizeArc(figureStack[figurePos], mousePos)
	}else if(figureStack[figurePos].id == 'Bezier'){
		resizeBezier(figureStack[figurePos], mousePos)
	}	
}
////////////////////////////////////////////////
//ROTATE//
////////////////////////////////////////////////
function rotLine(figure, mousePos){
	if((mouse.x - mousePos.x)>0){
		var pXIn = (figure.pointIn.x-mousePos.x)*Math.cos(0.1) - (figure.pointIn.y-mousePos.y)*Math.sin(0.1)
		var pYIn = (figure.pointIn.x-mousePos.x)*Math.sin(0.1) + (figure.pointIn.y-mousePos.y)*Math.cos(0.1)
		var pXOut = (figure.pointFin.x-mousePos.x)*Math.cos(0.1) - (figure.pointFin.y-mousePos.y)*Math.sin(0.1)
		var pYOut = (figure.pointFin.x-mousePos.x)*Math.sin(0.1) + (figure.pointFin.y-mousePos.y)*Math.cos(0.1)
	}else{
		var pXIn = (figure.pointIn.x-mousePos.x)*Math.cos(-0.1) - (figure.pointIn.y-mousePos.y)*Math.sin(-0.1)
		var pYIn = (figure.pointIn.x-mousePos.x)*Math.sin(-0.1) + (figure.pointIn.y-mousePos.y)*Math.cos(-0.1)
		var pXOut = (figure.pointFin.x-mousePos.x)*Math.cos(-0.1) - (figure.pointFin.y-mousePos.y)*Math.sin(-0.1)
		var pYOut = (figure.pointFin.x-mousePos.x)*Math.sin(-0.1) + (figure.pointFin.y-mousePos.y)*Math.cos(-0.1)
	}
	figure.pointIn.x = pXIn+mousePos.x
	figure.pointIn.y = pYIn+mousePos.y
	figure.pointFin.x= pXOut+mousePos.x
	figure.pointFin.y= pYOut+mousePos.y
}

function rotPolygon(figure, mousePos){
	for(var i=0; i<figure.pointsArray.length; i++){
		if((mouse.x - mousePos.x)>0){
			var pXIn = (figure.pointsArray[i].x-mousePos.x)*Math.cos(0.1) - (figure.pointsArray[i].y-mousePos.y)*Math.sin(0.1)
			var pYIn = (figure.pointsArray[i].x-mousePos.x)*Math.sin(0.1) + (figure.pointsArray[i].y-mousePos.y)*Math.cos(0.1)
		}else{
			var pXIn = (figure.pointsArray[i].x-mousePos.x)*Math.cos(-0.1) - (figure.pointsArray[i].y-mousePos.y)*Math.sin(-0.1)
			var pYIn = (figure.pointsArray[i].x-mousePos.x)*Math.sin(-0.1) + (figure.pointsArray[i].y-mousePos.y)*Math.cos(-0.1)
		}
		figure.pointsArray[i].x = pXIn+mousePos.x
		figure.pointsArray[i].y = pYIn+mousePos.y
	}
}

function rotArc(figure, mousePos){
	if((mouse.x - mousePos.x)>0){
		var pXIn = (figure.center.x-mousePos.x)*Math.cos(0.1) - (figure.center.y-mousePos.y)*Math.sin(0.1)
		var pYIn = (figure.center.x-mousePos.x)*Math.sin(0.1) + (figure.center.y-mousePos.y)*Math.cos(0.1)
	}else{
		var pXIn = (figure.center.x-mousePos.x)*Math.cos(-0.1) - (figure.center.y-mousePos.y)*Math.sin(-0.1)
		var pYIn = (figure.center.x-mousePos.x)*Math.sin(-0.1) + (figure.center.y-mousePos.y)*Math.cos(-0.1)
	}
	figure.center.x = pXIn+mousePos.x
	figure.center.y = pYIn+mousePos.y
}

function rotBezier(figure, mousePos){
	if((mouse.x - mousePos.x)>0){
		var pXIn = (figure.pointIn.x-mousePos.x)*Math.cos(0.1) - (figure.pointIn.y-mousePos.y)*Math.sin(0.1)
		var pYIn = (figure.pointIn.x-mousePos.x)*Math.sin(0.1) + (figure.pointIn.y-mousePos.y)*Math.cos(0.1)
		var pXOut = (figure.pointFin.x-mousePos.x)*Math.cos(0.1) - (figure.pointFin.y-mousePos.y)*Math.sin(0.1)
		var pYOut = (figure.pointFin.x-mousePos.x)*Math.sin(0.1) + (figure.pointFin.y-mousePos.y)*Math.cos(0.1)

		var pXCtr1 = (figure.ctrlPoint1.x-mousePos.x)*Math.cos(0.1) - (figure.ctrlPoint1.y-mousePos.y)*Math.sin(0.1)
		var pYCtr1 = (figure.ctrlPoint1.x-mousePos.x)*Math.sin(0.1) + (figure.ctrlPoint1.y-mousePos.y)*Math.cos(0.1)
		var pXCtr2 = (figure.ctrlPoint2.x-mousePos.x)*Math.cos(0.1) - (figure.ctrlPoint2.y-mousePos.y)*Math.sin(0.1)
		var pYCtr2 = (figure.ctrlPoint2.x-mousePos.x)*Math.sin(0.1) + (figure.ctrlPoint2.y-mousePos.y)*Math.cos(0.1)
	}else{
		var pXIn = (figure.pointIn.x-mousePos.x)*Math.cos(-0.1) - (figure.pointIn.y-mousePos.y)*Math.sin(-0.1)
		var pYIn = (figure.pointIn.x-mousePos.x)*Math.sin(-0.1) + (figure.pointIn.y-mousePos.y)*Math.cos(-0.1)
		var pXOut = (figure.pointFin.x-mousePos.x)*Math.cos(-0.1) - (figure.pointFin.y-mousePos.y)*Math.sin(-0.1)
		var pYOut = (figure.pointFin.x-mousePos.x)*Math.sin(-0.1) + (figure.pointFin.y-mousePos.y)*Math.cos(-0.1)

		var pXCtr1 = (figure.ctrlPoint1.x-mousePos.x)*Math.cos(-0.1) - (figure.ctrlPoint1.y-mousePos.y)*Math.sin(-0.1)
		var pYCtr1 = (figure.ctrlPoint1.x-mousePos.x)*Math.sin(-0.1) + (figure.ctrlPoint1.y-mousePos.y)*Math.cos(-0.1)
		var pXCtr2 = (figure.ctrlPoint2.x-mousePos.x)*Math.cos(-0.1) - (figure.ctrlPoint2.y-mousePos.y)*Math.sin(-0.1)
		var pYCtr2 = (figure.ctrlPoint2.x-mousePos.x)*Math.sin(-0.1) + (figure.ctrlPoint2.y-mousePos.y)*Math.cos(-0.1)
	}
	figure.pointIn.x = pXIn+mousePos.x
	figure.pointIn.y = pYIn+mousePos.y
	figure.pointFin.x= pXOut+mousePos.x
	figure.pointFin.y= pYOut+mousePos.y	

	figure.ctrlPoint1.x = pXCtr1+mousePos.x
	figure.ctrlPoint1.y = pYCtr1+mousePos.y
	figure.ctrlPoint2.x= pXCtr2+mousePos.x
	figure.ctrlPoint2.y= pYCtr2+mousePos.y	
}

function rotate(figurePos, mousePos){
	console.log(figurePos)
	if(figureStack[figurePos].id == 'Linha'){
		rotLine(figureStack[figurePos], mousePos)
	}else if(figureStack[figurePos].id == 'Poligono'){
		rotPolygon(figureStack[figurePos], mousePos)
	}else if(figureStack[figurePos].id == 'Arco'){
		rotArc(figureStack[figurePos], mousePos)
	}else if(figureStack[figurePos].id == 'Bezier'){
		rotBezier(figureStack[figurePos], mousePos)
	}	
}
////////////////////////////////////////////////
//MIRROR//
////////////////////////////////////////////////
/*
function getAngle(pIn, pFin){
	if(pIn.y < pFin.y){
		return ((Math.PI/2)-(Math.atan2(pIn.y, pIn.x)))//Retornar o resto pra tornar 90º
	}else if(pFin.y < pIn.y){
		return ((Math.PI/2)-(Math.atan2(pFin.y, pFin.x)))//Retornar o resto pra tornar 90º
	}else{//pIn.y == pFin.y
		return (Math.PI/2)
	}
}
*/
function mirrorLine(figure){
	if(currMTool == 'mirrorX'){
		var aux = figure.pointIn.y
		figure.pointIn.y = figure.pointFin.y
		figure.pointFin.y = aux
	}else if(currMTool == 'mirrorY'){
		var aux = figure.pointIn.x
		figure.pointIn.x = figure.pointFin.x
		figure.pointFin.x = aux
	}
}

function mirrorPolygon(figure){
	var center = get_polygon_centroid(figure.pointsArray)
	for(var i=0; i<figure.pointsArray.length; i++){
		figure.pointsArray[i].x -= center.x
		figure.pointsArray[i].y -= center.y
	}
	if(currMTool == 'mirrorX'){
		for(var i=0; i<figure.pointsArray.length; i++){
			figure.pointsArray[i].y *= -1
		}	
	}else if(currMTool == 'mirrorY'){
		for(var i=0; i<figure.pointsArray.length; i++){
			figure.pointsArray[i].x *= -1
		}	
	}
	for(var i=0; i<figure.pointsArray.length; i++){
		figure.pointsArray[i].x += center.x
		figure.pointsArray[i].y += center.y
	}
}

function mirrorArc(figure){
	if(currMTool == 'mirrorX'){
		var aux = figure.control
		figure.control = figure.control2
		figure.control2 = aux
	}else if(currMTool == 'mirrorY'){
		
	}
}


function mirror(figurePos, pointIn, pointFin){
	if(figureStack[figurePos].id == 'Linha'){
		mirrorLine(figureStack[figurePos], pointIn, pointFin)
	}else if(figureStack[figurePos].id == 'Poligono'){
		mirrorPolygon(figureStack[figurePos], pointIn, pointFin)
	}else if(figureStack[figurePos].id == 'Arco'){
		mirrorArc(figureStack[figurePos], pointIn, pointFin)
	}else if(figureStack[figurePos].id == 'Bezier'){
		mirrorBezier(figureStack[figurePos], pointIn, pointFin)
	}	
}