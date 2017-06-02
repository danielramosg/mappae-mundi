
function setText(filename) {

d3.text("./txt/"+Language+"/"+filename+".html", function(error, text) {
  		if (error) throw error;
  		document.getElementById("text_tag").innerHTML = text;
		});
		
currentText=filename
};

function hideshowText() {
if(document.getElementById("checktext").checked)	
 	{d3.select("#map_tag").style("margin-right","40%");
 	d3.select("#text_tag").style("display","block");}
 	else 
 	{d3.select("#text_tag").style("display","none");
 	d3.select("#map_tag").style("margin-right","0");}
 };


/* Language menu */
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showLangMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
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


