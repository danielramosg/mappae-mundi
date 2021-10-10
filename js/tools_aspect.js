
function move_dragstarted() {
	  d3.event.sourceEvent.stopPropagation(); // silence other listeners
	  //d3.select("#title_banner").node().innerHTML = "dragstarted";
	// Adapted from http://mbostock.github.io/d3/talk/20111018/azimuthal.html and updated for d3 v3
	  var proj = projection.rotate();
	  //m0 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
	  m0 = d3.mouse(this);
	  o0 = [-proj[0],-proj[1]];
	  //d3.select("#title_banner").node().innerHTML = m0;

	  d3.select(".land").style("visibility","visible");
	  d3.select("canvas").remove();
	  aspect.node().value = "oblique_other";
	}

function move_dragged() {
		d3.event.sourceEvent.stopPropagation(); // silence other listeners
	  if (m0) {
		//var m1 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
		//var m1 = [d3.event.x,d3.event.y]

		var m1 = d3.mouse(this);
		var	o1 = [o0[0] + (m0[0] - m1[0]) / 4, o0[1] + (m1[1] - m0[1]) / 4];
			//d3.select("#title_banner").node().innerHTML = d3.event.x;

		projection.rotate([-o1[0], -o1[1]]);
	  }
		// Update the map
	  path = d3.geo.path().projection(projection);
	  d3.selectAll("path").attr("d", path);
	  removeEllipses();
	  drawEllipses();
	}

function move_dragended() {
		//d3.select("#title_banner").node().innerHTML = "dragended";
	  drawCanvas();
	 }

function mode_aspect() {
  	CurrentMode = "aspect";
  	updateText();
  	var move_drag = d3.behavior.drag()
  		.on("dragstart", move_dragstarted)
  		.on("drag", move_dragged)
  		.on("dragend", move_dragended);
  	maparea.on('mousemove', default_mousemove);
  	maparea.on('click', null);
  	maparea.on('mouseleave', default_mouseleave);
  	maparea.on('mouseenter', null);
  	maparea.call(move_drag);
  	document.getElementById("sphere").style.cursor = 'move';
  	document.getElementById("tissot_tools").style.display = 'none';
  	document.getElementById("geodesic_tools").style.display = 'none';
  	document.getElementById("loxodrome_tools").style.display = 'none';
  	document.getElementById("aspect_tools").style.display = 'inline';
};
