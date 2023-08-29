//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var lineWeight = null;
var stopDrawing = false;
this.c = null;

function setup() {
	// Sets Pixel Density to 1 so everything in the project works as expected
	pixelDensity(1);
	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");
	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new mirrorDrawTool());
	toolbox.addTool(new Eraser());
	toolbox.addTool(new StampTool());
	toolbox.addTool(new ColorPick(c, c.width, c.height, c.width, c.height));
	toolbox.addTool(new ZoomTool());
	toolbox.addTool(new EditableShape());
	background(255);

	lineWeight = new LineWeigth();
	lineWeight.loadSlider();

}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		if(!stopDrawing)
			toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
	helpers.update();
	colourP.update();
}

function mouseWheel(event){
	if (toolbox.selectedTool.hasOwnProperty("wheel")) {
		toolbox.selectedTool.wheel(event);
	} 
}