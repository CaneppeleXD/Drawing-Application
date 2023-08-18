function CircleShape() {
    this.name = "circleShape";
    this.icon = "assets/shapes/circleShape.jpg";
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
            var size = helpers.getEqualSizes(x-this.posX,y-this.posY);
            ellipse(this.posX,this.posY,size.resX*2,size.resY*2);
        }
        else {
            loadPixels();
            this.firstDrawing = true;
        }
    }
}