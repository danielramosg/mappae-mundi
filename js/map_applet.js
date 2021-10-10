
function changeAspect() {
	switch (aspect.node().value) {
		case "equatorial":
			projection.rotate( [0,0] );
			break;
		case "polar_north":
			projection.rotate( [0,-90] );
			break;
		case "polar_south":
			projection.rotate( [0,90] );
			break;
		case "oblique_yourlocation":
			projection.rotate( rotateToCurrentLocation );
			break;
		// case "oblique_other":
 		//	//d3.select("#radio_move").node().checked(true);
 		//	break;
		};
	//updateMap();
	d3.select(".land").style("visibility","visible");
	d3.select("canvas").remove();
	path = d3.geo.path().projection(projection);
	d3.selectAll("path").attr("d", path);
	removeEllipses();
	drawEllipses();
	drawCanvas();
	};




function updateMap() {
	projection=projectionslist[menu.node().selectedIndex].projection;
	scalefactor = projection.scale() *
			document.getElementById("ellipradius").value /6283.185 ;

	shortname = projectionslist[menu.node().selectedIndex].shortname;
	d3.select("svg").remove();
	d3.select("canvas").remove();
	drawCanvas();
	drawSvg();
	drawEllipses();
	if (document.getElementById("radio_tissot").checked) {mode_tissot(); };
	if (document.getElementById("radio_aspect").checked) {mode_aspect(); };
	if (document.getElementById("radio_geodesic").checked) {mode_geodesic(); };
	if (document.getElementById("radio_loxodrome").checked) {mode_loxodrome(); };

	switch (projection.rotate().toString()) { //Can't compare arrays directly
		case "0,0,0":
			aspect.node().value = "equatorial";
			break;
		case "0,-90,0":
			aspect.node().value = "polar_north";
			break;
		case "0,90,0":
			aspect.node().value = "polar_south";
			break;
		case rotateToCurrentLocation.toString() +',0':
			aspect.node().value = "oblique_yourlocation";
			break;
		default:
			aspect.node().value = "oblique_other";
			break;
		};
	//setText(shortname);
};



// Canvas Layer
function drawCanvas () {
	var canvas = d3.select("#map_tag").append("canvas")
    .attr("width", width)
    .attr("height", height);

	canvas.style("visibility", d3.select("#rastervisible").node().checked ? "visible" : "hidden");

	var context = canvas.node().getContext("2d");

	var image = new Image;
	image.onload = onload;
	image.src = "img/raster.jpg";

	function onload() {
	  var dx = image.width,
		  dy = image.height;

			var canvas_src = d3.select("#map_tag").append("canvas")
			.attr("width", dx)
    		.attr("height", dy);
			canvas_src.node().style.display='none';
			var context_src = canvas_src.node().getContext('2d');
			//The source image has to be loaded into a canvas, because getImageData
			//only works for a canvas. If we re-use the same canvas for the source
			//and destination, the source image is clipped if dx > width or dy > height
			//so we need a source canvas and a destination canvas.


	  context_src.drawImage(image, 0, 0, dx, dy);

	  	var sourceData = context_src.getImageData(0, 0, dx, dy).data;
		var target = context.createImageData(width, height);
		var targetData = target.data;

		canvas_src.node().remove();

	  var tolerance = 0.1;
	  for (var y = 0, i = -1; y < height; ++y) {
   		for (var x = 0; x < width; ++x) {
			var p = projection.invert([x, y])
			if (p == null) { i+=4; continue;}
			var λ = p[0], φ = p[1];
			var pxy = projection(p);
			if ( (Math.abs(pxy[0] - x) < tolerance ) && (Math.abs(pxy[1] - y) < tolerance ) ) {
			if (λ > 180 || λ < -180 || φ > 90 || φ < -90) { i += 4; continue; }

			  var q = ((90 - φ) / 180 * dy | 0) * dx + ((180 + λ) / 360 * dx | 0) << 2;
			  targetData[++i] = sourceData[q];
			  targetData[++i] = sourceData[++q];
			  targetData[++i] = sourceData[++q];
			  targetData[++i] = 255;
			} else {i+=4;}
	    }
	  }

	  //context.clearRect(0, 0, width, height);
	  context.putImageData(target, 0, 0);

	  d3.select(".land").style("visibility", d3.select("#rastervisible").node().checked ? "hidden" : "visible");
	  //here to make land disappear just after canvas is drawn, synchronously
	};

};


// SVG Layer
function drawSvg () {
	svg = d3.select("#map_tag").append("svg")
		.attr("width", width)
		.attr("height", height);

	path = d3.geo.path()
		.projection(projection);

	bdy = svg.append("defs").append("path")
		.datum({type: "Sphere"})
		.attr("id", "sphere")
		.attr("d", path);

	svg.append("use")
		.attr("class", "stroke")
		.attr("xlink:href", "#sphere");

	fil = svg.append("use")
		.attr("class", "fill")
		.attr("xlink:href", "#sphere");

	svg.append("path")
		.datum(graticule)
		.attr("class", "graticule")
		.attr("d", path)
		.style("visibility", d3.select("#graticulevisible").node().checked ? "visible" : "hidden");

	svg.insert("path", ".graticule")
		.datum(topojson.feature(world, world.objects.land))
		.attr("class", "land")
		.attr("d", path);

	svg.insert("path", ".graticule")
		.datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
		.attr("class", "boundary")
		.attr("d", path)
		.style("visibility", d3.select("#countriesvisible").node().checked ? "visible" : "hidden");


	xy=[0,0];
	indicatrix = createTissotEllipse(projection,[0,0],0)
		.classed("listellip",false);
	svg.node().appendChild(indicatrix.node());

	maparea = svg.append("use")
		.attr("class", "maparea")
		.attr("xlink:href", "#sphere")
		.attr("style","visibility:hidden; pointer-events:fill;");

 	geodesic = svg.insert("path", ".graticule")
 		.attr("class", "geodesic")
 		.datum(geo_data.geojson)
 		.attr("d",path);

 	loxodrome = svg.insert("path", ".graticule")
 		.attr("class", "loxodrome")
 		.datum(loxo_data.geojson)
 		.attr("d",path);

 	//d3.select(".land").style("visibility", d3.select("#rastervisible").node().checked ? "hidden" : "visible");


};




// Mouse interactions

function updateCoordsTag(obj) {
	//console.log("updateCoordsTag this: " + this);
	xy = d3.mouse(obj);
	lp = projection.invert(xy); //lp = lambda, phi = lon, lat

//	document.getElementById("coords_tag").innerHTML =  lp[0].toFixed(2) +','+ lp[1].toFixed(2);
	lsign = lp[0]>=0. ? 'E' : 'W'
	psign = lp[1]>=0. ? 'N' : 'S'

	document.getElementById("coords_tag").innerHTML =
	'<table style="display:inline; padding:0px;"><td style="width:70px; text-align:right;">' +
	Math.abs(lp[1]).toFixed(2) + '\u00B0 ' + psign +
	'</td> <td style="width:70px; text-align:right;">' +
	Math.abs(lp[0]).toFixed(2) + '\u00B0 ' + lsign +
	'</td></table>';
	};

function default_mousemove(){
	updateCoordsTag(this);
	};

function default_mouseleave(){
	document.getElementById("coords_tag").innerHTML =  "";
	};
