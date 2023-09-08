function EditableShape() {
    //This obejct controls the properties of the objects inside the shapes folder
    this.icon = "assets/editableShape.jpg";
    this.name = "EditableShape";
    //Stores the shapes to be used
    this.shapes = [];
    var previousMouseX = -1;
    var previousMouseY = -1;

    var selectedShape;

    var _self = this;

    var fill = true;

    var savedPosX;
    var savedPosY;
    var lastX;
    var lastY;

    this.draw = function () {
        if (mouseIsPressed && helpers.insideCanvas) {
            if (previousMouseX == -1) {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
            else {
                previousMouseX = mouseX;
                previousMouseY = mouseY;
            }
        }
        else {
            previousMouseX = -1;
            previousMouseY = -1;
        }

        //Controls the Position of the shape
        if(selectedShape.editingPosition){
            //Changes the shape position properties calculating the difference between its PosX and PosY after it was printed
            selectedShape.posX = savedPosX + mouseX - lastX;
            selectedShape.posY = savedPosY + mouseY - lastY;
        }
        else{
            //Saves the PosX and PosY of the shape while it's still being drawn by the user
            savedPosX = selectedShape.posX;
            savedPosY = selectedShape.posY;
            //Saves the last MouseX and MouseY so it's possible to calculate the position of the shape after it was printed
            lastX = mouseX;
            lastY = mouseY;
        }

        selectedShape.draw(previousMouseX,previousMouseY,mouseX,mouseY,fill);

    }

    function selectShape(name){
        //Iterated over the shapes array to select the right shape 
        _self.shapes.forEach(shape => {
            if (shape.name == name){
                selectedShape = shape;
            }
        });
    }

    //Changes the current shape
    function changeShape(){
        //Removes the border from the previous shape
        select("#"+selectedShape.name).style("border","0px solid blue");
        //Adds border to the new selected shape
        this.style("border","2px solid blue");
        //Selects the shape by passing the id of the shape clicked
        selectShape(this.elt.id);
    }

    //Turns the fill off or on depending if the checkbox is checked or not
    function fillEvent(){
        fill = this.elt.children[0].checked;
        helpers.changeFill(fill);
    }

    this.populateOptions = function () {
        //Puts the shapes inside the shapes array
        this.shapes.push(new FreeShape());
        this.shapes.push(new RectShape());
        this.shapes.push(new SquareShape());
        this.shapes.push(new TriangleShape());
        this.shapes.push(new EllipseShape());
        this.shapes.push(new CircleShape());

        selectedShape = this.shapes[0];

        //Iterates offer the shapes array to create the buttons to select the desired shape
        for(var i = 0;i<this.shapes.length;i++){
            var shape = createDiv();
            shape.class("editable_shape");
            shape.id(this.shapes[i].name);
            shape.mouseClicked(changeShape);
            select(".toolOptions").child(shape);
            var img = createImg(this.shapes[i].icon,this.shapes[i].name);
            img.class("editable_shape_img");
            img.parent(shape);
        }

        select("#"+selectedShape.name).style("border","2px solid blue");

        //Creates a checkbox to control if the shape should be filled or not
        var checkbox = createCheckbox("Fill",fill);
        checkbox.changed(fillEvent);
        select(".toolOptions").child(checkbox);
    }

    this.unselectTool = function () {
        select(".toolOptions").html("");
        this.shapes = [];
    }

}