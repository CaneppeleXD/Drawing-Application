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
        if (end) {
            this.changingPosition(previousX, previousY, x, y, fill);
        }
        else {
            this.addingPoints(previousX, previousY, x, y, fill);
        }
    }

    this.addingPoints = function(previousX, previousY, x, y, fill){
        if (points.length == 0) {
            loadPixels();
        }

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

        if (clicked) {
            if (readyToNewPoint) {
                points.push({ pointX: x, pointY: y });
                readyToNewPoint = false;
                end = readyToEndShape;
            }
        }
        else {
            readyToNewPoint = true;
        }

        updatePixels();
        if (points.length > 0) {
            this.drawShape(x, y, fill);
        }
    }

    this.changingPosition = function(previousX, previousY, x, y, fill){
        originalPoints = originalPoints.length == 0 ? Array.apply(null, points) : originalPoints;
        this.updatePointsPosition();
        updatePixels();
        this.drawShape(x, y, fill);
        if (mouseIsPressed) {
            if (this.editingPosition) {
                loadPixels();
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

    this.drawShape = function (x, y, fill) {
        helpers.changeFill(end && fill);
        beginShape();
        points.forEach(point => {
            vertex(point.pointX, point.pointY);
        });
        if (!end) {
            this.posX = x;
            this.posY = y;
            vertex(x, y);
        }
        endShape();
    }

    this.updatePointsPosition = function () {
        for (var i = 0; i < points.length && i < originalPoints.length; i++) {
            points[i].pointX = originalPoints[i].pointX + this.posX - originalPoints[originalPoints.length - 1].pointX;
            points[i].pointY = originalPoints[i].pointY + this.posY - originalPoints[originalPoints.length - 1].pointY;
        }
    }
}