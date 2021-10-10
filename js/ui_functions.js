
function setText(filename) {

d3.text("./txt/"+Language+"/"+filename+".html", function(error, text) {
  		if (error) throw error;
  		document.getElementById("text_tag").innerHTML = text;
		});

//$("#text_tag").load("./txt/"+Language+"/"+filename+".html")

currentText=filename
};


function updateText() {
	if (d3.select("#radio_text_tool").node().checked ) {
		setText("info_" + CurrentMode);
	};

	if (d3.select("#radio_text_proj").node().checked ) {
		setText(menu.node().value);
	};



};


function hideshowText() {
	var flag = document.getElementById("checktext").checked;

	d3.select("#text_controls").style("display", flag ? "block" : "none");

	d3.select("#map_tag").classed("texton",flag);
	d3.select("#lateral_panel").classed("texton",flag);
	d3.select("#text_tag").classed("texton",flag);
	d3.select("#controls_tag").classed("texton",flag);
	d3.selectAll(".control_block").classed("texton",flag);

	d3.select("#map_tag").classed("textoff",!flag);
	d3.select("#lateral_panel").classed("textoff",!flag);
	d3.select("#text_tag").classed("textoff",!flag);
	d3.select("#controls_tag").classed("textoff",!flag);
	d3.selectAll(".control_block").classed("textoff",!flag);


 };



/* Language menu */
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showLangMenu() {
    document.getElementById("lang_options").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


function translateAll() {
	translator.lang(Language);
	setText(currentText);
}
