function EllipseShape() {
    this.name = "ellipseShape";
    this.icon = "assets/shapes/EllipseShape.jpg";
    this.firstDrawing = true;
    this.posX;
    this.posY;

    this.draw = function(previousX, previousY, x, y,fill){
        if (previousX != -1) {
            if (this.firstDrawing){
                loadPixels();
                this.posX = previousX;
                this.posY = previousY;
                this.firstDrawing = false;
            }
            updatePixels();
            ellipse(this.posX,this.posY,(x-this.posX)*2,(y-this.posY)*2);
        }
        else {
            loadPixels();
            this.firstDrawing = true;
        }
    }
}