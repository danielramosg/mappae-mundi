
function setText(filename) {

d3.text("./txt/"+Language+"/"+filename+".html", function(error, text) {
  		if (error) throw error;
  		document.getElementById("text_tag").innerHTML = text;
		}); 
//console.log("text changed");
};

function hideshowText() {
if(document.getElementById("checktext").checked)	
 	{d3.select("#map_tag").style("margin-right","35%");
 	d3.select("#text_tag").style("display","block");}
 	else 
 	{d3.select("#text_tag").style("display","none");
 	d3.select("#map_tag").style("margin-right","0");}
 };
