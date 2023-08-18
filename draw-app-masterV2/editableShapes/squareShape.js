function SquareShape() {
    this.name = "SquareShape";
    this.icon = "assets/shapes/SquareShape.jpg";
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

            rect(this.posX,this.posY,size.resX,size.resY);
        }
        else {
            loadPixels();
            this.firstDrawing = true;
        }
    }
}