var geo_data = {
		"buffer_point": null,
		"paths_endpoints": [],	//list of pairs of points.
		"geojson": {
			"type": "MultiLineString",
			"coordinates": []}			// coordinates of points in the path, in format geojson
	};

	
function geodesic_click() {
	xy = d3.mouse(this);
	lp = projection.invert(xy);

	if (geo_data.buffer_point == null) {
			geo_data.buffer_point = lp
			}
	else {
			//geo_data.paths_endpoints = [[geo_data.buffer_point,lp]];  //use this line to have only one geodesic arc
			geo_data.paths_endpoints.push( [geo_data.buffer_point,lp]);
			geo_data.buffer_point = null;
			geodesic_draw();
			};
};


function removeGeodesic() {
	d3.selectAll(".geodesic").remove();
	geodesic = svg.insert("path", ".graticule")
 					.attr("class", "geodesic");
	document.getElementById("geo_tag").style.display = "none";
	};

function clearGeodesic() {
	geo_data.paths_endpoints = [];
	geo_data.geojson.coordinates = [];
	removeGeodesic();
 	};

function popGeodesic() {
	geo_data.paths_endpoints.pop();
	removeGeodesic();
	geodesic_draw();
	};


function geodesic_draw() {

		geo_data.geojson.coordinates =[];
		var i;
		for (i=0; i<geo_data.paths_endpoints.length; i++) {
			arc=GeodesicArc(geo_data.paths_endpoints[i][0][0], geo_data.paths_endpoints[i][0][1] ,
			geo_data.paths_endpoints[i][1][0],geo_data.paths_endpoints[i][1][1], 50 ,
			document.getElementById("geoextended").checked);

			geo_data.geojson.coordinates.push(arc[1].coordinates);
			console.log("Geodesic arc " + (i+1) +":  " + arc[0].toFixed(2) + "\u00B0  ,  "
			+ (arc[0]*111.111).toFixed(0) + " km" )
			}

//		geo_data.geojson = { "type": "MultiLineString", "coordinates": geo_data.paths_endpoints };

		geodesic.datum(geo_data.geojson)
				.attr("d",path);

		document.getElementById("geolength_tag").innerHTML =
		(d3.geo.length(geo_data.geojson)*6366.197723675814).toFixed(0) + " km";

		document.getElementById("geo_tag").style.display = "inline";
		};


function mode_geodesic() {
	CurrentMode = "geodesic";
	updateText();
	maparea.on(".drag", null);
	maparea.on('mousemove',default_mousemove);
	maparea.on('click', geodesic_click);
	maparea.on('mouseleave', default_mouseleave);
	maparea.on('mouseenter', null);
	document.getElementById("sphere").style.cursor = 'crosshair';

	document.getElementById("tissot_tools").style.display = 'none';
	document.getElementById("geodesic_tools").style.display = 'inline';
	document.getElementById("loxodrome_tools").style.display = 'none';
	document.getElementById("aspect_tools").style.display = 'none';

};
