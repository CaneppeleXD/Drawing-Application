function HelperFunctions() {

	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	this.currentColour = "black";

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

	this.insideCanvas = mouseX > 0 && mouseY > 0 && mouseX < c.width && c.height;

	this.update = function () {
		this.insideCanvas = mouseX > 0 && mouseY > 0 && mouseX < c.width && mouseY < c.height;
	}

	this.changeFill = function (value) {
		value ? fill(this.currentColour) : noFill();
	}

	this.evaluateFocusCoord = function (x, y) {
		var greatest = Math.max(x, y);
		var smallest = Math.min(x, y);

		return smallest * -1 < greatest ? greatest : smallest;
	}

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