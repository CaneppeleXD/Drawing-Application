function HelperFunctions() {

	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//Sets the default color for when de object it created
	this.currentColour = "black";
	this.fill = true;

	//event handler for the clear button event. Clears the screen

	select("#clearButton").mouseClicked(function () {
		background(255, 255, 255);
		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system.
	select("#saveImageButton").mouseClicked(function () {
		saveCanvas("myPicture", "jpg");
	});

	this.mouseIsPressedCanvas = mouseIsPressed;

	//Used to determine if the pointer is inside the canvas
	this.insideCanvas = mouseX > 0 && mouseY > 0 && mouseX < c.width && c.height;

	//Updates the helpers variables
	this.update = function () {
		this.insideCanvas = mouseX > 0 && mouseY > 0 && mouseX < c.width && mouseY < c.height;
	}

	//Changes the fill for the current color of it if the parameter is true, it it's not, it turns the fill off
	this.changeFill = function (value) {
		value ? fill(this.currentColour) : noFill();
		this.fill = value;
	}

	//Returns the largest absolute value
	this.evaluateFocusCoord = function (x, y) {
		var greatest = Math.max(x, y);
		var smallest = Math.min(x, y);

		return smallest * -1 < greatest ? greatest : smallest;
	}

	//Returns the X and Y when they should be equal dependig on which one is greater in absolute
	//Used for the circle and Square in the EditableShape tool, their Widht and Height need to be the same
	this.getEqualSizes = function (x, y) {
		var focusedCoord = this.evaluateFocusCoord(x, y);
		var result = { resX: 0, resY: 0 };
		if (x == focusedCoord) {
			result.resX = x;
			if ((y > 0 && x < 0) || (y < 0 && x > 0)) result.resY = x * -1;
			else result.resY = x;
		}
		else {
			result.resY = y;
			if ((y > 0 && x < 0) || (y < 0 && x > 0)) result.resX = y * -1;
			else result.resX = y;
		}

		return result;
	}
}