#include "general.h"
#include "shapes.h"

//#define triangle

int main (int argc, char *argv[]) {
///Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	int width = 640;
	int height = 480;
	int n = width*height;
	RGBtype *pixels = new RGBtype[n];
    int dpi = 72;

	int aadepth = 2;
	double aathreshold = 0.9;
	double aspectratio = (double)width/(double)height;

	Vect O (0,0,0);
	Vect X (1,0,0);
	Vect Y (0,1,0);
	Vect Z (0,0,1);
#ifdef triangle
	Vect pointA(-1.5, 0.5, 0  );
	Vect pointB( 1.5, 0.5, 0  );
	Vect pointC(0.75, 0.5, 1  );
	Vect pointD(0.75, 1.5, 0.5);
#endif // triangle
///Setting the Camera~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Vect camPos(0, 1.5, -4);
	Vect look_at (0, 0, 0);
	Vect diff_btw (camPos.getVectX() - look_at.getVectX(), camPos.getVectY() - look_at.getVectY(), camPos.getVectZ() - look_at.getVectZ());
	Vect camdir = diff_btw.negative().normalize();
	Vect camright = Y.crossProduct(camdir).normalize();
	Vect camdown = camright.crossProduct(camdir);
	Camera scene_cam (camPos, camdir, camright, camdown);
///Colors~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Color orange(255, 69, 0, 0);
	Color white_light (1.0, 1.0, 1.0, 0);
	Color pretty_green (0.5, 1.0, 0.5, 0.3);
	Color maroon (0.5, 0.25, 0.25, 1);
	Color tile_floor (1, 1, 1, 2);
	Color gray (0.5, 0.5, 0.5, 0.4);
	Color black (0.0, 0.0, 0.0, 0.5);
///Light~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Vect light_position (100,100,100);
	Light scene_light (light_position, orange);
	Light scene_light2 (camPos, white_light);
	double ambientlight = 0.20;
	double accuracy = 0.00000001;
///Scene Objects~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Sphere scene_sphere  (Vect(0, 0, 5), 1, pretty_green);
	Sphere scene_sphere2 (Vect(1.75, -0.25, 5), 0.5, maroon);
	Sphere scene_sphere3 (Vect(-0.5, -0.5, 2), 0.5, black);
	Sphere scene_sphere4 (Vect(100, 100, 100), 100, orange);

	Plane scene_plane (Y, -1, tile_floor);

///Triangle stuff
#ifdef triangle
    Triangle scene_triangle1(pointA, pointB, pointC, gray);
    Triangle scene_triangle2(pointA, pointB, pointD, gray);
    Triangle scene_triangle3(pointB, pointC, pointD, gray);
    Triangle scene_triangle4(pointA, pointC, pointD, gray);
#endif // triangle
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	vector<Source*> light_sources;
	light_sources.push_back(dynamic_cast<Source*>(&scene_light));
	light_sources.push_back(dynamic_cast<Source*>(&scene_light2));

	vector<Object*> scene_objects;
	scene_objects.push_back(dynamic_cast<Object*>(&scene_sphere));
	scene_objects.push_back(dynamic_cast<Object*>(&scene_sphere2));
	scene_objects.push_back(dynamic_cast<Object*>(&scene_sphere3));
	scene_objects.push_back(dynamic_cast<Object*>(&scene_sphere4));

	scene_objects.push_back(dynamic_cast<Object*>(&scene_plane));
#ifdef triangle
	scene_objects.push_back(dynamic_cast<Object*>(&scene_triangle1));
	scene_objects.push_back(dynamic_cast<Object*>(&scene_triangle2));
	scene_objects.push_back(dynamic_cast<Object*>(&scene_triangle3));
	scene_objects.push_back(dynamic_cast<Object*>(&scene_triangle4));
#endif // triangle
///Render scene~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	int thisone, aa_index;
	double xamnt, yamnt;
	double tempRed, tempGreen, tempBlue;

	for (int x = 0; x < width; x++) {
		for (int y = 0; y < height; y++) {
			thisone = y*width + x;

			// start with a blank pixel
			double tempRed[aadepth*aadepth];
			double tempGreen[aadepth*aadepth];
			double tempBlue[aadepth*aadepth];

			for (int aax = 0; aax < aadepth; aax++) {
				for (int aay = 0; aay < aadepth; aay++) {

					aa_index = aay*aadepth + aax;

					srand(time(0));

					// create the ray from the camera to this pixel
					if (aadepth == 1) {
						// start with no anti-aliasing
						if (width > height) {
							// the image is wider than it is tall
							xamnt = ((x+0.5)/width)*aspectratio - (((width-height)/(double)height)/2);
							yamnt = ((height - y) + 0.5)/height;
						}else if(height > width){
							// the imager is taller than it is wide
							xamnt = (x + 0.5)/ width;
							yamnt = (((height - y) + 0.5)/height)/aspectratio - (((height - width)/(double)width)/2);
						}else{
							// the image is square
							xamnt = (x + 0.5)/width;
							yamnt = ((height - y) + 0.5)/height;
						}
					}else{
						// anti-aliasing
						if (width > height) {
							// the image is wider than it is tall
							xamnt = ((x + (double)aax/((double)aadepth - 1))/width)*aspectratio - (((width-height)/(double)height)/2);
							yamnt = ((height - y) + (double)aax/((double)aadepth - 1))/height;
						}else if (height > width) {
							// the imager is taller than it is wide
							xamnt = (x + (double)aax/((double)aadepth - 1))/ width;
							yamnt = (((height - y) + (double)aax/((double)aadepth - 1))/height)/aspectratio - (((height - width)/(double)width)/2);
						}else {
							// the image is square
							xamnt = (x + (double)aax/((double)aadepth - 1))/width;
							yamnt = ((height - y) + (double)aax/((double)aadepth - 1))/height;
						}
					}
					Vect cam_ray_origin = scene_cam.getCameraPosition();
					Vect cam_ray_direction = camdir.vectAdd(camright.vectMult(xamnt - 0.5).vectAdd(camdown.vectMult(yamnt - 0.5))).normalize();

					Ray cam_ray (cam_ray_origin, cam_ray_direction);

					vector<double> intersections;

					for (int index = 0; index < scene_objects.size(); index++) {
						intersections.push_back(scene_objects.at(index)->findIntersection(cam_ray));
					}

					int index_of_winning_object = winningObjectIndex(intersections);

					if (index_of_winning_object == -1) {
						// set the backgroung black
						tempRed[aa_index] = 0;
						tempGreen[aa_index] = 0;
						tempBlue[aa_index] = 0;
					}else{
						// index coresponds to an object in our scene
						if (intersections.at(index_of_winning_object) > accuracy) {
							// determine the position and direction vectors at the point of intersection

							Vect intersection_position = cam_ray_origin.vectAdd(cam_ray_direction.vectMult(intersections.at(index_of_winning_object)));
							Vect intersecting_ray_direction = cam_ray_direction;

							Color intersection_color = getColorAt(intersection_position, intersecting_ray_direction, scene_objects, index_of_winning_object, light_sources, accuracy, ambientlight);

							tempRed[aa_index] = intersection_color.getColorRed();
							tempGreen[aa_index] = intersection_color.getColorGreen();
							tempBlue[aa_index] = intersection_color.getColorBlue();
						}
					}
				}
			}

			// average the pixel color
			double totalRed = 0;
			double totalGreen = 0;
			double totalBlue = 0;

			for (int iRed = 0; iRed < aadepth*aadepth; iRed++) {
				totalRed = totalRed + tempRed[iRed];
			}
			for (int iGreen = 0; iGreen < aadepth*aadepth; iGreen++) {
				totalGreen = totalGreen + tempGreen[iGreen];
			}
			for (int iBlue = 0; iBlue < aadepth*aadepth; iBlue++) {
				totalBlue = totalBlue + tempBlue[iBlue];
			}

			double avgRed = totalRed/(aadepth*aadepth);
			double avgGreen = totalGreen/(aadepth*aadepth);
			double avgBlue = totalBlue/(aadepth*aadepth);

			pixels[thisone].r = avgRed;
			pixels[thisone].g = avgGreen;
			pixels[thisone].b = avgBlue;
		}
	}

	saveImage("output/rogue.bmp",width,height,dpi,pixels);

	delete pixels, tempRed, tempGreen, tempBlue;

	return 0;
}

