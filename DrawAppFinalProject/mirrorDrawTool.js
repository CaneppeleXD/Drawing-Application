function mirrorDrawTool() {
	this.name = "mirrorDraw";
	this.icon = "assets/mirrorDraw.jpg";

	this.both = false;

	//which axis is being mirrored (x or y) x is default
	this.axis = "x";
	//line of symmetry is halfway across the screen
	this.lineOfSymmetry = width / 2;

	//this changes in the jquery click handler. So storing it as
	//a variable self now means we can still access it in the handler
	var self = this;

	//where was the mouse on the last time draw was called.
	//set it to -1 to begin with
	var previousMouseX = -1;
	var previousMouseY = -1;

	//mouse coordinates for the other side of the Line of symmetry.
	var previousOppositeMouseX = -1;
	var previousOppositeMouseY = -1;

	//Arrays to control the axis when the button both is clicked, each index controls a quadrant of the screen
	//1 = Top Left; 2 = Top Right; 3 = Botton Left; 4 = Botton Right
	var axis = [{ x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }];
	var previousAxis = [{ x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }];

	//Functon to calculate the opposite X and Y
	this.calculateBothOpposite = function (posX, posY) {
		var lineOfSymmetryX = width / 2;
		var lineOfSymmetryY = height / 2;

		var newX = 0;
		var newY = 0;

		//Works the same way of calculateOpposite function, however here it calculates for both X and Y
		if (posX < lineOfSymmetryX) {
			newX = lineOfSymmetryX + (lineOfSymmetryX - posX);
		}
		else {
			newX = lineOfSymmetryX - (posX - lineOfSymmetryX);
		}

		if (posY < lineOfSymmetryY) {
			newY = lineOfSymmetryY + (lineOfSymmetryY - posY);
		}
		else {
			newY = lineOfSymmetryY - (posY - lineOfSymmetryY);
		}

		var result = [];

		result[0] = { x: posX, y: posY };

		result[1] = { x: newX, y: posY };

		result[2] = { x: posX, y: newY };

		result[3] = { x: newX, y: newY };

		return result;
	}

	this.draw = function () {
		//display the last save state of pixels
		updatePixels();

		//do the drawing if the mouse is pressed
		if (mouseIsPressed) {
			if (this.both) {
				if (previousAxis[0].x == -1) {
					previousAxis = this.calculateBothOpposite(mouseX, mouseY);
				}
				else {
					axis = this.calculateBothOpposite(mouseX, mouseY);
					for (var i = 0; i < axis.length; i++) {
						line(previousAxis[i].x, previousAxis[i].y, axis[i].x, axis[i].y);
					}
					previousAxis = this.calculateBothOpposite(mouseX, mouseY);
				}
			}
			else {
				//if the previous values are -1 set them to the current mouse location
				//and mirrored positions
				if (previousMouseX == -1) {
					previousMouseX = mouseX;
					previousMouseY = mouseY;
					previousOppositeMouseX = this.calculateOpposite(mouseX, "x");
					previousOppositeMouseY = this.calculateOpposite(mouseY, "y");
				}

				//if there are values in the previous locations
				//draw a line between them and the current positions
				else {
					line(previousMouseX, previousMouseY, mouseX, mouseY);
					previousMouseX = mouseX;
					previousMouseY = mouseY;

					//these are for the mirrored drawing the other side of the
					//line of symmetry
					var oX = this.calculateOpposite(mouseX, "x");
					var oY = this.calculateOpposite(mouseY, "y");
					line(previousOppositeMouseX, previousOppositeMouseY, oX, oY);
					previousOppositeMouseX = oX;
					previousOppositeMouseY = oY;
				}
			}
		}
		//if the mouse isn't pressed reset the previous values to -1
		else {
			previousMouseX = -1;
			previousMouseY = -1;

			previousOppositeMouseX = -1;
			previousOppositeMouseY = -1;

			axis = [{ x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }];
			previousAxis = [{ x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }];
		}

		//after the drawing is done save the pixel state. We don't want the
		//line of symmetry to be part of our drawing

		loadPixels();

		//push the drawing state so that we can set the stroke weight and colour
		push();
		strokeWeight(3);
		stroke("red");
		//draw the line of symmetry
		if (this.both) {
			line(width / 2, 0, width / 2, height);
			line(0, height / 2, width, height / 2);
		}
		else if (this.axis == "x") {
			line(width / 2, 0, width / 2, height);
		} else {
			line(0, height / 2, width, height / 2);
		}
		//return to the original stroke
		pop();

	};

	/*calculate an opposite coordinate the other side of the
	 *symmetry line.
	 *@param n number: location for either x or y coordinate
	 *@param a [x,y]: the axis of the coordinate (y or y)
	 *@return number: the opposite coordinate
	 */
	this.calculateOpposite = function (n, a) {
		//if the axis isn't the one being mirrored return the same
		//value
		if (a != this.axis) {
			return n;
		}

		//if n is less than the line of symmetry return a coorindate
		//that is far greater than the line of symmetry by the distance from
		//n to that line.
		if (n < this.lineOfSymmetry) {
			return this.lineOfSymmetry + (this.lineOfSymmetry - n);
		}

		//otherwise a coordinate that is smaller than the line of symmetry
		//by the distance between it and n.
		else {
			return this.lineOfSymmetry - (n - this.lineOfSymmetry);
		}
	};


	//when the tool is deselected update the pixels to just show the drawing and
	//hide the line of symmetry. Also clear options
	this.unselectTool = function () {
		updatePixels();
		//clear options
		select(".toolOptions").html("");
	};

	//adds a button and click handler to the options area. When clicked
	//toggle the line of symmetry between horizonatl to vertical
	this.populateOptions = function () {
		select(".toolOptions").html(
			"<button id='directionButton'>Make Horizontal</button>" +
			"<button id='bothDirectionsButton'>Both</button>");
		// 	//click handler
		select("#directionButton").mouseClicked(function () {
			var button = select("#" + this.elt.id);
			if (self.axis == "x") {
				self.axis = "y";
				self.lineOfSymmetry = height / 2;
				button.html('Make Vertical');
			} else {
				self.axis = "x";
				self.lineOfSymmetry = width / 2;
				button.html('Make Horizontal');
			}
			self.both = false;
		});

		select("#bothDirectionsButton").mouseClicked(function () {
			self.both = true;
		});

	};
}