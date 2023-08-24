function FreeShape() {
    this.name = "freeShape";
    this.icon = "assets/shapes/freeShape.jpg";
    var points = [];
    var originalPoints = [];
    this.posX = 0;
    this.posY = 0;
    var clicked;
    var readyToNewPoint = true;
    var end = false;
    var readyToEndShape = false;
    this.editingPosition = false;
    this.draw = function (previousX, previousY, x, y, fill) {
        clicked = previousX != -1;

        if (end) {
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
        else {
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
        if(originalPoints[originalPoints.length - 1].pointX - this.posX != 0){
            console.log("aaaa");
        }
        for (var i = 0; i < points.length && i < originalPoints.length; i++) {
            points[i].pointX = originalPoints[i].pointX + this.posX - originalPoints[originalPoints.length - 1].pointX;
            points[i].pointY = originalPoints[i].pointY + this.posY - originalPoints[originalPoints.length - 1].pointY;
        }
    }
}