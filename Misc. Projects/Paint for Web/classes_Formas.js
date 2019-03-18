// Point
function Ponto (_mousePos){
	this.pointPos 	= _mousePos
	this.id 	  	= 'Ponto'
	this.lineWidth 	= 1
	this.color 		= "rgb(0,0,0)"
}

Ponto.prototype.draw = function(context){
	context.beginPath()
	context.fillStyle = this.color
	context.lineWidth = this.lineWidth
	context.fillRect(this.pointPos.x, this.pointPos.y, 4, 4)
	context.stroke()
}

// LINHA
function Linha(_pointIn){
	this.pointIn  	= _pointIn
	this.pointFin 	= undefined
	this.id 		= 'Linha'
	this.lineWidth 	= 1
	this.color 		= "rgb(0,0,0)"
}

Linha.prototype.draw = function(context){
	context.beginPath()
	context.strokeStyle = this.color
	context.lineWidth = this.lineWidth
	context.moveTo(this.pointIn.x, this.pointIn.y)
	if(this.pointFin != undefined){
		context.lineTo(this.pointFin.x, this.pointFin.y)
	}else{
		context.lineTo(this.pointIn.x, this.pointIn.y)
	}
	context.stroke()
}

// POLÍGONO
function Poligono(_pointIn){
	this.pointsArray= []
	this.dragPoint	= _pointIn
	this.id 		= 'Poligono'
	this.isDrawing  = true
	this.lineWidth 	= 1
	this.color 		= "rgb(0,0,0)"
}

Poligono.prototype.draw = function(context){
	context.beginPath()
	context.strokeStyle = this.color
	context.lineWidth = this.lineWidth
	if(this.pointsArray){
		context.moveTo(this.pointsArray[0].x, this.pointsArray[0].y)
		if(this.pointsArray.length >= 1){
			for(var i=1; i < (this.pointsArray.length); i++){
				context.lineTo(this.pointsArray[i].x, this.pointsArray[i].y)
			}
		}
		if(this.isDrawing == false){
			context.closePath()
		}else{
			context.lineTo(this.dragPoint.x, this.dragPoint.y)
		}
	}
	context.stroke()
}

// BEZIER
function Bezier(_pointIn){
	this.pointIn 	= _pointIn
	this.pointFin 	= _pointIn
	this.ctrlPoint1 = undefined
	this.ctrlPoint2 = undefined
	this.id 		= 'Bezier'
	this.isDrawing	= 1
	this.lineWidth 	= 1
	this.color 		= "rgb(0,0,0)"
}

Bezier.prototype.draw = function(context){
	context.beginPath()
	context.strokeStyle = this.color
	context.lineWidth = this.lineWidth
	context.moveTo(this.pointIn.x, this.pointIn.y)
	if(this.ctrlPoint1 != undefined && this.ctrlPoint2 == undefined){
		context.bezierCurveTo(this.ctrlPoint1.x, this.ctrlPoint1.y, 
			this.ctrlPoint1.x, this.ctrlPoint1.y, 
			this.pointFin.x, this.pointFin.y)
	}else if(this.ctrlPoint2 != undefined){
		context.bezierCurveTo(this.ctrlPoint1.x, this.ctrlPoint1.y, 
			this.ctrlPoint2.x, this.ctrlPoint2.y, 
			this.pointFin.x, this.pointFin.y)
	}else{
		context.lineTo(this.pointFin.x, this.pointFin.y)
	}
	context.stroke()
}

// ARCO DE CÍRCULO
function Arco(_center){
	this.center    	= _center
	this.radius    	= 1
	this.control   	= 0
	this.control2	= (2*Math.PI)
	this.id 		= 'Arco'
	this.color 		= "rgb(0,0,0)"
	this.lineWidth 	= 1
}

Arco.prototype.draw = function(context){
	context.beginPath()
	var pie = 2*Math.PI
	context.strokeStyle = this.color
	context.lineWidth = this.lineWidth
	if(this.radius <= 0) this.radius++
	context.arc(this.center.x, this.center.y, 
		this.radius, this.control, this.control2)
	context.stroke()
}
