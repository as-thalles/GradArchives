#include "shapes.h"
///Object segment
Object::Object(){ }

///Sphere segment
Sphere::Sphere () {
	center = Vect(0,0,0);
	radius = 1.0;
	color = Color(0.5,0.5,0.5, 0);
}

Sphere::Sphere (Vect centerValue, double radiusValue, Color colorValue) {
	center = centerValue;
	radius = radiusValue;
	color = colorValue;
}

///Plane segment
Plane::Plane () {
	normal = Vect(1,0,0);
	distance = 0;
	color = Color(0.5,0.5,0.5, 0);
}

Plane::Plane (Vect normalValue, double distanceValue, Color colorValue) {
	normal = normalValue;
	distance = distanceValue;
	color = colorValue;
}

///Triangle Segment
Triangle::Triangle () {
	A = Vect(1, 0, 0);
	B = Vect(0, 1, 0);
	C = Vect(0, 0, 1);
	color = Color(0.5, 0.5, 0.5, 0);
}

Triangle::Triangle (Vect valA, Vect valB, Vect valC, Color valColor) {
	A = valA;
	B = valB;
	C = valC;
	color = valColor;
}
