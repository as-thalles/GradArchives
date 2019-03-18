#ifndef RAY_H
#define RAY_H

#include "Vect.h"

class Ray {
	Vect origin, direction;

	public:

	Ray ();

	Ray (Vect, Vect);

	// method functions
	Vect getRayOrigin () { return origin; }
	Vect getRayDirection () { return direction; }

};

#endif // VECT_H

