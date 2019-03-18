/*/
*	Algoritmos de Fecho Convexo (Convex Hull).
*	Optei por aplicar Graham Scan em todos os pontos (Point) do Canvas.
*	Graham Scan vai ser aplicado em uma lista de pontos (Point ou Polygon.pointsArray);
*	Bezier é tranquilo porque é só pegar os quatro pontos de controle;
*	Arco é mais brabo, apesar de eu ter a opção de só fazer o quadradão com as dimensões do raio.
/*/
/*
function gatherAllPoints(){
	var points = []
	for(var i=0; i<figureStack.length; i++){
		if(figureStack[i].id == 'Ponto'){

		}else if(figureStack[i].id == 'Poligono'){

		}else if(figureStack[i].id == 'Bezier'){

		}else if(figureStack[i].id == 'Arco'){

		}
	}
	return points
}*/

function getAngle(vA, pB, pC){
    var AB = Math.sqrt(Math.pow(pB.x-vA.x,2)+ Math.pow(pB.y-vA.y,2))
    var AC = Math.sqrt(Math.pow(pC.x-vA.x,2)+ Math.pow(pC.y-vA.y,2))
    var BC = Math.sqrt(Math.pow(pB.x-pC.x,2)+ Math.pow(pB.y-pC.y,2)) 
    
    return Math.acos((Math.pow(AB,2)+Math.pow(AC,2)-Math.pow(BC,2))/(2*AB*AC))
}

function getBiggAngle(vertex, refPoint, pointCloud){
	var biggest = undefined
	for(var i=0; i < pointCloud.length; i++){
		if(biggest != undefined){
			if(getAngle(vertex, refPoint, pointCloud[biggest]) <
			   getAngle(vertex, refPoint, pointCloud[i])){
				biggest = i	//Trocando pra quem teve ângulo maior
			}
		}else{
			biggest = 0
		}
	}
	return biggest
}

function graham_Scan(points){	//Graham Scan
	conHull_Candidates = points.slice()
	if(conHull_Candidates == undefined){
		conHull_Candidates = gatherAllPoints()
	}
	var conHull_Solution	= []
	var aux 	= conHull_Candidates[0]
	var aux_pos = 0
	//Getting lower one
	for(var i=1; i < conHull_Candidates.length; i++){
		if(aux.y < conHull_Candidates[i].y){
			aux 	= conHull_Candidates[i]
			aux_pos = i
		}
	}
	conHull_Solution.push(aux)	//Insert as first solution point
	conHull_Candidates.splice(aux_pos, 1)	//Remove from candidates
	//Getting colinear-to-the-right ones
	for(var i=0; i<conHull_Candidates.length; i++){
		if(conHull_Candidates[i].y == conHull_Solution[0].y){	//Same line
			if(conHull_Candidates[i].x >= conHull_Solution[0].x){	//Bigger X (farther to the right)
				conHull_Solution.push(conHull_Candidates[i])	//Insert as next solution point
				conHull_Candidates.splice(i, 0)	//Remove from candidates
			}
		}
	}
	//Defining aux for first iteraction
	var refPoint = {x:(conHull_Solution[conHull_Solution.length-1].x-10),//just in case
					y:(conHull_Solution[conHull_Solution.length-1].y)}
	//Finalmente o maldito algoritmo
	var isRelevant = true
	while(isRelevant){
		aux_pos = sortByAngle(conHull_Solution[conHull_Solution.length-1], refPoint, conHull_Candidates)
		console.log("auxPos: " + aux_pos)
		if(getAngle(conHull_Solution[conHull_Solution.length-1], refPoint, conHull_Candidates[aux_pos]) <
		   getAngle(conHull_Solution[conHull_Solution.length-1], refPoint, conHull_Solution[0])){
		   	isRelevant = false
		   console.log('Is relevant: ' + isRelevant)
		}else{
			conHull_Solution.push(conHull_Candidates[aux_pos])
			console.log('Candidates, auxPos: ')
			console.log(conHull_Candidates[aux_pos])
			conHull_Candidates.splice(aux_pos, 1)
		}
		refPoint = conHull_Solution[conHull_Solution.length-1]
		console.log('Ref point: ' + refPoint)
		console.log('Solution len: ' + conHull_Solution.length)
		console.log('Candidat len: ' + conHull_Candidates.length)
	}
	return conHull_Solution
}
/*
function getAngle(a, b){
	return Math.atan2((a.y-b.y), (a.x-b.x))
}

function getOrientation(p1, p2, p3){
	var p2Angle = Math.trunc(getAngle(p1,p2));
	var p3Angle = Math.trunc(getAngle(p1,p3));
	return p2Angle == p3Angle ? 0 : p2Angle > p3Angle ? 1 : 2;  // Colinear : HorÃ¡rio : Anti-HorÃ¡rio
}

function compare(p1, p2){
	var orientation = getOrientation(p0, p1, p2);
	return orientation == 0 ? squaredEuclidianDist(p0,p2) >= squaredEuclidianDist(p0,p1) ? -1 : 1 : orientation == 2 ? -1 : 1;
}

function graham_Scan(pontos){
	grahamAuxPoints = pontos.slice(0)

	var ymin = grahamAuxPoints[0].y
	var xmin = grahamAuxPoints[0].x
	var minId = 0;//Indice do vertice extremo
	for(var i = 1; i < grahamAuxPoints.length; i++){
		var y = grahamAuxPoints[i].y
		//Como o canvas comeÃ§a de cima, recuperando o maior y;
		if((y > ymin) || (ymin == y && grahamAuxPoints[i].x <grahamAuxPoints[minId].x)){
			ymin = grahamAuxPoints[i].y
			xmin = grahamAuxPoints[i].x
			minId = i
		}
	}

	var auxX = grahamAuxPoints[0].x
	var auxY = grahamAuxPoints[0].y
	grahamAuxPoints[0].x =  grahamAuxPoints[minId].x
	grahamAuxPoints[0].y =  grahamAuxPoints[minId].y
	grahamAuxPoints[minId].x =  auxX
	grahamAuxPoints[minId].y =  auxY
	//Deixando o ponto de maior Y na primeira posiÃ§Ã£o do vetor;
	p0 = new Ponto({x:xmin, y:ymin})//E o armazenando em uma variÃ¡vel global;
	var auxArray = new Array()
	for(var i = 1; i < grahamAuxPoints.length; i++){
		var curPoint = new Ponto({x:grahamAuxPoints[i].x, y:grahamAuxPoints[i].y})
		auxArray.push(curPoint)
	}
	//Passando todos os pontos exceto o primeiro pra um vetor secundÃ¡rio;
	auxArray.sort(compare)//E o ordenando de forma cÃ­clica, sentido horÃ¡rio;
	var hullSize = 0//Quantidade de vertices no fecho;
    
    for(var i = 0; i < auxArray.length; i++){
		while(i < auxArray.length - 1 && getOrientation(p0, auxArray[i], auxArray[i+1]) == 0){
			i++//Ignorando todos os vertices colineares;
		}
		auxArray[hullSize] = auxArray[i]//E jogando o que sobrar no fecho em potencial;
		hullSize++
	}
	//Se for menor que isso, nÃ£o existe fecho;
    if(hullSize > 1){
		var convexHull = new Array()//Vetor onde vai ficar o fecho;
		convexHull.push(new Ponto({x:p0.x, y:p0.y}))
		convexHull.push(new Ponto({x:auxArray[0].x, y:auxArray[0].y}))
		convexHull.push(new Ponto({x:auxArray[1].x, y:auxArray[1].y}))
		var top = 2
		//Colocando os 3 primeiros pontos certos do fecho;
		for(var i = 2; i < hullSize; i++){
			//Enquanto a orientaÃ§Ã£o dos dois Ãºltimos pontos e o atual processado nÃ£o for anti-horÃ¡rio;
			while(getOrientation(convexHull[top - 1], convexHull[top], auxArray[i]) != 2){
				convexHull.pop()
				top--
			}
			convexHull.push(new Ponto({x:auxArray[i].x, y:auxArray[i].y}))//Colocando o novo ponto em potencial no fecho;
			top++
		}
	}
	return convexHull
}
*/
/*
Array.prototype.swapItems = function(a, b){
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
}

function ccw(p1, p2, p3){
	return ((p2.x-p1.x)*(p3.y-p1.y))-((p2.y-p1.y)*(p3.x-p1.x))
}

function sortCCW(points){
	for(var i=2; i<points.length)
}

function graham_Scan(points){
	var conHull_Candidates = points.slice()
	//Getting lower one
	var aux 	= points[0]
	var aux_pos = 0
	for(var i=1; i < conHull_Candidates.length; i++){
		if(aux.y < conHull_Candidates[i].y){
			aux 	= conHull_Candidates[i]
			aux_pos = i
		}
	}
	//Put lower one on the first position
	if(aux_pos != 1){
		conHull_Candidates.swapItems(1, aux_pos)
	}
	//Sort candidates by polar angle with candidates[1]


}
*/
function convex_Points(){
	var points = []	//Bad joke is bad.
	for(var i=0; i < figureStack.length; i++){
		if(figureStack[i].id == 'Ponto'){
			points.push({x:figureStack[i].pointPos.x, y:figureStack[i].pointPos.y})
		}
	}
	return graham_Scan(points)
}

function convex_Polygon(figureID){
	return graham_Scan(figureStack[figureID].pointsArray)
}

function convex_Bezier(figureID){
	var points = []
	points.push({x:figureStack[figureID].pointIn.x, y:figureStack[figureID].pointIn.y})
	points.push({x:figureStack[figureID].pointFin.x, y:figureStack[figureID].pointFin.y})
	points.push({x:figureStack[figureID].ctrlPoint1.x, y:figureStack[figureID].ctrlPoint1.y})
	points.push({x:figureStack[figureID].ctrlPoint2.x, y:figureStack[figureID].ctrlPoint2.y})

	if(points[2] == points[3]){
		points.splice(2,0)	//Se for Curva tira um dos pontos de controle
							//(são iguais) pra não dar merda
	}
	
	return graham_Scan(points)
}

function convex_Arc(figureID){
	var points = []
	points.push({x:(figureStack[figureID].center.x - figureStack[figureID].radius), y:(figureStack[figureID].center.y - figureStack[figureID].radius)})
	points.push({x:(figureStack[figureID].center.x + figureStack[figureID].radius), y:(figureStack[figureID].center.y - figureStack[figureID].radius)})
	points.push({x:(figureStack[figureID].center.x + figureStack[figureID].radius), y:(figureStack[figureID].center.y + figureStack[figureID].radius)})
	points.push({x:(figureStack[figureID].center.x - figureStack[figureID].radius), y:(figureStack[figureID].center.y + figureStack[figureID].radius)})

	return points
}

function getCHull(figureID){
	if(figureID == -1){
		return graham_Scan(undefined)
	}else if(figureStack[figureID].id == 'Poligono'){
		return convex_Polygon(figureID)
	}else if(figureStack[figureID].id == 'Bezier'){
		return convex_Bezier(figureID)
	}else if(figureStack[figureID].id == 'Arco'){
		return convex_Arc(figureID)
	}
}