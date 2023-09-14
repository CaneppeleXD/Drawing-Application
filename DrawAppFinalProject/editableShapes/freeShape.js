function FreeShape() {
    this.name = "freeShape";
    this.icon = "assets/shapes/freeShape.jpg";
    var points = [];
    var originalPoints = [];
    //Control the coord X and Y of the shape
    this.posX = 0;
    this.posY = 0;
    var clicked;
    var readyToNewPoint = true;
    var end = false;
    var readyToEndShape = false;
    //Controls if the shape's position is ready to be changes
    this.editingPosition = false;
    this.draw = function (previousX, previousY, x, y, fill) {
        clicked = previousX != -1;
        //Controls in which phase the user is (adding points or positioning the shape)
        if (end) {
            this.changingPosition(previousX, previousY, x, y, fill);
        }
        else {
            this.addingPoints(previousX, previousY, x, y, fill);
        }
    }

    //Adds news vertices to the shape
    this.addingPoints = function(previousX, previousY, x, y, fill){
        //If there are no points, the pixel array if loaded to be used later
        if (points.length == 0) {
            loadPixels();
        }

        //Iterates over the points array to discover points close to the user's mouse position
        //If it finds one, the program will help the user to position the next point in the right position to end the shape properly
        for (var i = 0; i < points.length; i++) {
            if (dist(points[i].pointX, points[i].pointY, x, y) < 5) {
                x = points[i].pointX;
                y = points[i].pointY;
                readyToEndShape = true;
                break;
            }
            else {
                readyToEndShape = false;
            }
        }

        //Checks if the user has clicked
        if (clicked) {
            //Checks if the program is ready to add a new point, it will only be ready if the user has released the mouse left button after clicking it
            if (readyToNewPoint) {
                //Adds a new point to the points array
                points.push({ pointX: x, pointY: y });
                readyToNewPoint = false;
                end = readyToEndShape;
            }
        }
        else {
            readyToNewPoint = true;
        }

        //Update last loaded canvas
        updatePixels();
        //If there are points to be drawn, draw the unfinished or perhaps the finished shape
        if (points.length > 0) {
            this.drawShape(x, y, fill);
        }
    }

    //Controls the position of the shape when it's ready
    this.changingPosition = function(previousX, previousY, x, y, fill){
        //Gets a copy of the points array if the originalPoints' length is zero. Uses Array.apply because is used just the equal sign, the array would reference the same pointers
        originalPoints = originalPoints.length == 0 ? Array.apply(null, points) : originalPoints;
        //Update the points position in the points array
        this.updatePointsPosition();
        updatePixels();
        //Draws the shape in the new position
        this.drawShape(x, y, fill);
        //Checks if the user has clicked to end the positioning phase
        if (mouseIsPressed) {
            //Guarantees that the user has realeased the mouse button after ending the shape
            if (this.editingPosition) {
                //Saves the shape into the canvas' pixel array
                loadPixels();
                //Reset the variables used
                points = [];
                originalPoints = [];
                readyToEndShape = false;
                end = false;
                this.editingPosition = false;
            }
        }
        else {
            this.editingPosition = true;
        }
    }

    //Draw vertices with the coordenates in the points array
    this.drawShape = function (x, y, fill) {
        //Sets fill on and off. It is turned on only if the shape is going to end and if the user has checked the fill checkbox
        helpers.changeFill(end && fill);
        beginShape();
        //Iterates  over points array drawing vertices
        points.forEach(point => {
            vertex(point.pointX, point.pointY);
        });
        //Draws another vertex on the user's mouse position (this vertex is not saved in the array yet, only if the user clicks on the canvas)
        if (!end) {
            this.posX = x;
            this.posY = y;
            vertex(x, y);
        }
        endShape();
    }

    //Changes the points position when the shape is finished
    this.updatePointsPosition = function () {
        //The point's postion is changes by the difference between the last point's original position and the new position of point zero give by posX and posY
        for (var i = 0; i < points.length && i < originalPoints.length; i++) {
            points[i].pointX = originalPoints[i].pointX + this.posX - originalPoints[originalPoints.length - 1].pointX;
            points[i].pointY = originalPoints[i].pointY + this.posY - originalPoints[originalPoints.length - 1].pointY;
        }
    }
}