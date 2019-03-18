#ifndef SHAPES_H
#define SHAPES_H

#include <math.h>

#include "Vect.h"
#include "Color.h"
#include "Ray.h"

///Object segment
class Object {
	public:

	Object ();

	// method functions
	virtual Color getColor () { return Color (0.0, 0.0, 0.0, 0); }

	virtual Vect getNormalAt(Vect intersection_position) {
		return Vect (0, 0, 0);
	}

	virtual double findIntersection(Ray ray) {
		return 0;
	}

};

///Sphere segment
class Sphere : public Object {
	Vect center;
	double radius;
	Color color;

	public:

	Sphere ();

	Sphere (Vect, double, Color);

	// method functions
	Vect getSphereCenter () { return center; }
	double getSphereRadius () { return radius; }
	virtual Color getColor () { return color; }

	virtual Vect getNormalAt(Vect point) {
		// normal always points away from the center of a sphere
		Vect normal_Vect = point.vectAdd(center.negative()).normalize();
		return normal_Vect;
	}

	virtual double findIntersection(Ray ray) {
		Vect ray_origin = ray.getRayOrigin();
		double ray_origin_x = ray_origin.getVectX();
		double ray_origin_y = ray_origin.getVectY();
		double ray_origin_z = ray_origin.getVectZ();

		Vect ray_direction = ray.getRayDirection();
		double ray_direction_x = ray_direction.getVectX();
		double ray_direction_y = ray_direction.getVectY();
		double ray_direction_z = ray_direction.getVectZ();

		Vect sphere_center = center;
		double sphere_center_x = sphere_center.getVectX();
		double sphere_center_y = sphere_center.getVectY();
		double sphere_center_z = sphere_center.getVectZ();

		double a = 1; // normalized
		double b = (2*(ray_origin_x - sphere_center_x)*ray_direction_x) + (2*(ray_origin_y - sphere_center_y)*ray_direction_y) + (2*(ray_origin_z - sphere_center_z)*ray_direction_z);
		double c = pow(ray_origin_x - sphere_center_x, 2) + pow(ray_origin_y - sphere_center_y, 2) + pow(ray_origin_z - sphere_center_z, 2) - (radius*radius);

		double discriminant = b*b - 4*c;

		if (discriminant > 0) {
			/// the ray intersects the sphere

			// the first root
			double root_1 = ((-1*b - sqrt(discriminant))/2) - 0.000001;

			if (root_1 > 0) {
				// the first root is the smallest positive root
				return root_1;
			}
			else {
				// the second root is the smallest positive root
				double root_2 = ((sqrt(discriminant) - b)/2) - 0.000001;
				return root_2;
			}
		}
		else {
			// the ray missed the sphere
			return -1;
		}
	}

};

///Plane segment
class Plane : public Object {
	Vect normal;
	double distance;
	Color color;

	public:

	Plane ();

	Plane (Vect, double, Color);

	// method functions
	Vect getPlaneNormal () { return normal; }
	double getPlaneDistance () { return distance; }
	virtual Color getColor () { return color; }

	virtual Vect getNormalAt(Vect point) {
		return normal;
	}

	virtual double findIntersection(Ray ray) {
		Vect ray_direction = ray.getRayDirection();

		double a = ray_direction.dotProduct(normal);

		if (a == 0) {
			// ray is parallel to the plane
			return -1;
		}
		else {
			double b = normal.dotProduct(ray.getRayOrigin().vectAdd(normal.vectMult(distance).negative()));
			return -1*b/a;
		}
	}

};

class Triangle : public Object {
	Vect A, B, C;
	Color color;

	public:

	Triangle ();

	Triangle (Vect, Vect, Vect, Color);

	// method functions
	Vect getTriangleNormal () {
        Vect CA(C.getVectX() - A.getVectX(), C.getVectY() - A.getVectY(), C.getVectZ() - A.getVectZ());
        Vect BA(B.getVectX() - A.getVectX(), B.getVectY() - A.getVectY(), B.getVectZ() - A.getVectZ());
        Vect normal = CA.crossProduct(BA).normalize();
        return normal;
	}
	double getTriangleDistance () {
        Vect normal = getTriangleNormal();
        double distance = normal.dotProduct(A);
        return distance;
	}
	virtual Color getColor () { return color; }

	virtual Vect getNormalAt(Vect point) {
		return getTriangleNormal();
	}

	virtual double findIntersection(Ray ray) {
		Vect ray_direction = ray.getRayDirection();
        Vect ray_origin = ray.getRayOrigin();

        Vect normal = getTriangleNormal();
        double distance = getTriangleDistance();

		double a = ray_direction.dotProduct(normal);

		if (a == 0) {
			// ray is parallel to the plane
			return -1;
		}
		else {
			double b = normal.dotProduct(ray.getRayOrigin().vectAdd(normal.vectMult(distance).negative()));
			double distance2plane = -1*b/a;

			double Qx = ray_direction.vectMult(distance2plane).getVectX() + ray_origin.getVectX();
			double Qy = ray_direction.vectMult(distance2plane).getVectY() + ray_origin.getVectY();
			double Qz = ray_direction.vectMult(distance2plane).getVectZ() + ray_origin.getVectZ();

			Vect Q(Qx, Qy, Qz);

            Vect CA(C.getVectX() - A.getVectX(), C.getVectY() - A.getVectY(), C.getVectZ() - A.getVectZ());
            Vect QA(Q.getVectX() - A.getVectX(), Q.getVectY() - A.getVectY(), Q.getVectZ() - A.getVectZ());
            double test1 = (CA.crossProduct(QA)).dotProduct(normal);

            Vect BC(B.getVectX() - C.getVectX(), B.getVectY() - C.getVectY(), B.getVectZ() - C.getVectZ());
            Vect QC(Q.getVectX() - C.getVectX(), Q.getVectY() - C.getVectY(), Q.getVectZ() - C.getVectZ());
            double test2 = (BC.crossProduct(QC)).dotProduct(normal);

            Vect AB(A.getVectX() - B.getVectX(), A.getVectY() - B.getVectY(), A.getVectZ() - B.getVectZ());
            Vect QB(Q.getVectX() - B.getVectX(), Q.getVectY() - B.getVectY(), Q.getVectZ() - B.getVectZ());
            double test3 = (AB.crossProduct(QB)).dotProduct(normal);

			if((test1 >= 0) && (test2 >= 0) && (test3 >= 0)){   //Inside triangle
                return distance2plane;
			}else{  //Missed triangle
                return -1;
			}
		}
	}

};

#endif // SHAPES_H

