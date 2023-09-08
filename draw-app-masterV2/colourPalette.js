//Displays and handles the colour palette.
function ColourPalette() {
	//a list of web colour strings
	this.colours = ["black", "silver", "gray", "white", "maroon", "red", "purple",
		"orange", "pink", "fuchsia", "green", "lime", "olive", "yellow", "navy",
		"blue", "teal", "aqua"
	];
	//make the start colour be black
	this.selectedColour = "black";

	this.colourWheelActive = false;

	var colourWheelImage = loadImage("assets/colourWheel.jpg");

	var self = this;

	var firstIteration = true;

	var colourClick = function () {
		//remove the old border

		var current = select("#" + self.selectedColour + "Swatch");
		current.style("border", "0");

		//get the new colour from the id of the clicked element
		var c = this.id().split("Swatch")[0];

		//set the selected colour and fill and stroke
		self.selectedColour = c;
		helpers.currentColour = c;
		fill(c);
		stroke(c);

		//add a new border to the selected colour
		select("#displaySelectedColour").style("background-color", c)
	}

	//load in the colours
	this.loadColours = function () {
		//set the fill and stroke properties to be black at the start of the programme
		//running
		fill(this.colours[0]);
		stroke(this.colours[0]);

		//for each colour create a new div in the html for the colourSwatches
		for (var i = 0; i < this.colours.length; i++) {
			var colourID = this.colours[i] + "Swatch";

			//using JQuery add the swatch to the palette and set its background colour
			//to be the colour value.
			var colourSwatch = createDiv()
			colourSwatch.class('colourSwatches');
			colourSwatch.id(colourID);

			select(".colourPalette").child(colourSwatch);
			select("#" + colourID).style("background-color", this.colours[i]);
			colourSwatch.mouseClicked(colourClick)
		}

		//Creates a little square to show the current color selected
		select(".currentColour").html("<span>Selected Colour:</span>");
		var currentColour = createDiv();
		currentColour.style("background-color", "black");
		currentColour.id("displaySelectedColour");
		currentColour.class("colourSwatches");
		currentColour.style("border", "2px solid blue");
		select(".currentColour").child(currentColour);

		//Creates a icon to display the color wheel
		var colourWheel = createDiv();
		colourWheel.style("background-image", "url(assets/colourWheel.jpg)");
		colourWheel.style("background-size", "100% 100%");
		colourWheel.id("colorWheel");
		colourWheel.class("colourSwatches");
		colourWheel.mouseClicked(() => this.colourWheelActive = true);
		select(".currentColour").child(colourWheel);
	};
	//call the loadColours function now it is declared
	this.loadColours();

	function insideColourWheelImage(w, h) {
		return mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h;
	}

	var colourPickWheel;

	//Function to control the colour wheel behaviour
	this.colourWheel = function () {
		//Checks if the colour wheel is activated
		if (this.colourWheelActive) {
			var w = colourWheelImage.width * 2;
			var h = colourWheelImage.height * 2;
			var end = false;

			//If the user has clicked outside the colour wheel and it's not the first the function has being called, the colour wheel is disabled 
			if (mouseIsPressed && !insideColourWheelImage(w, h) && !firstIteration) {
				updatePixels();
				this.colourWheelActive = false;
				firstIteration = true;
				stopDrawing = false;
				end = true;
			}
			
			//Checks if the drawn of the color wheel has ended
			if (!end) {
				//First calls of the function efore the mouse has being released, sets the things to enable the colour wheel to be drawn safely
				if (firstIteration) {
					//Disables the user to use tools to drawn into the canvas
					stopDrawing = true

					//When mouse is realeased will create a color pick to enables the user to select a colour in the colour wheel
					if (!mouseIsPressed) {
						colourPickWheel = new ColorPick(colourWheelImage, colourWheelImage.width, colourWheelImage.height, w, h);
						loadPixels();
						firstIteration = false;
					}
				}
				else {
					//Draws the colour wheel
					image(colourWheelImage, 0, 0, w, h);

					//Calls the colour pick tool to check if the user has clicked the image and get the desired colour
					colourPickWheel.draw();
				}
			}
		}
	}

	this.update = function () {
		this.colourWheel();
	}
}