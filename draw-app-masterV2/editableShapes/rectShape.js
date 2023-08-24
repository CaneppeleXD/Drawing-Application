function RectShape() {
    this.name = "rectShape";
    this.icon = "assets/shapes/rectShape.jpg";
    this.firstDrawing = true;
    this.editingPosition = false;
    this.posX;
    this.posY;

    this.draw = function(previousX, previousY, x, y,fill){
        if (previousX != -1 && !this.editingPosition) {
            if (this.firstDrawing){
                loadPixels();
                this.posX = previousX;
                this.posY = previousY;
                this.firstDrawing = false;
            }
            updatePixels();
            lastX = x;
            lastY = y;
            this.drawShape(x,y);
        }
        else if(!this.firstDrawing){
            this.editingPosition = true;
            if (mouseIsPressed) this.firstDrawing = true;
            updatePixels();
            this.drawShape(x,y);
        }
        else {
            loadPixels();
            this.editingPosition = false;
        }
    }

    this.drawShape = function(x,y){
        rect(this.posX,this.posY,x-this.posX,y-this.posY);
    } 
}