#ifndef GENERAL_H
#define GENERAL_H

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <cmath>
#include <limits>

#include <stdlib.h>
#include <stdio.h>
#include <time.h>

using namespace std;

#include "shapes.h"

#include "Vect.h"
#include "Ray.h"
#include "Camera.h"
#include "Color.h"
#include "Light.h"
#include "Source.h"

typedef struct __RGB_type_{
    double r;
    double g;
    double b;
}RGBtype;

void saveImage(const char *filename, const int width, const int height, int dpi, RGBtype *data);
int winningObjectIndex(vector<double> objec_intersections);
Color getColorAt(
                Vect intersection_position,
                Vect intersecting_ray_direction,
                vector<Object*> scene_objects,
                int index_of_winning_object,
                vector<Source*> light_sources,
                double accuracy,
                double ambientlight);
#endif // GENERAL_H
