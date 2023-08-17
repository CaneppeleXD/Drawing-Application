function FreeShape(){
    this.name = "freeShape";
    this.icon = "assets/shapes/freeShape.jpg";
    var points = [];
    var posX;
    var posY;
    var clicked;
    var readyToNewPoint = true;
    var end = false;
    var readyToEndShape = false;
    this.draw = function(previousX,previousY,x,y){
        clicked = previousX != -1;
        
        if(points.length == 0){
            loadPixels();
        }

        for(var i = 0; i < points.length; i++){
            if (dist(points[i].pointX,points[i].pointY,x,y) < 5){
                x = points[i].pointX;
                y = points[i].pointY;
                readyToEndShape = true;
                break;
            }
            else{
                readyToEndShape = false;
            }
        }

        if (clicked){
            if (readyToNewPoint){
                points.push({pointX: x, pointY: y});
                readyToNewPoint = false;
                end = readyToEndShape;
            }
        }
        else{
            readyToNewPoint = true;
        }

        updatePixels();
        if(points.length > 0){
            drawShape(x,y);
        }

        if(end){
            points = [];
            readyToEndShape = false;
            end = false;
        }
    }
    
    function drawShape(x,y){
        noFill();
        beginShape();
        points.forEach(point => {
            vertex(point.pointX,point.pointY);
        });
        vertex(x,y);
        endShape();

        return {newX: x, newY: y}
    }
}