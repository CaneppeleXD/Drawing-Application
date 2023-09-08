function LineWeigth(){
    this.text = "Line Weight:";

    var _self = this;

    //Creates a slider and puts it on the html
    this.loadSlider = function(){
        //Created the input of type range
        select(".lineWeight").html("<label for='weight'>"+this.text+"</label><input type='range' min='1' max='15' value='1' id='weight'></input>");
        //Function to called when the slider has moved
        select("#weight").touchMoved(function() {
			strokeWeight(_self.getWeight());
		});
        strokeWeight(this.getWeight());
    }

    //Selects the slider and gets its value
    this.getWeight = function(){
		var slider = select("#weight");
        return slider.value();
    }

    //Returns the slider element to be used outside the object scope
    this.getSlider = function(){
        return select("#weight");
    }
    
}