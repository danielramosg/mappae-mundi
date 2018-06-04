
function loxodrome_click() {
	xy = d3.mouse(this);
	lp = projection.invert(xy);

	if (loxo_data.buffer_point == null) { 	
			loxo_data.buffer_point = lp 
			}
	else { 	
			//loxo_data.paths_endpoints = [[loxo_data.buffer_point,lp]];  //use this line to have only one loxodrome arc
			loxo_data.paths_endpoints.push( [loxo_data.buffer_point,lp]); 
			loxo_data.buffer_point = null; 
			loxodrome_draw(); 	
			};		
};


function removeLoxodrome() {
	d3.selectAll(".loxodrome").remove(); 
 	loxodrome = svg.insert("path", ".graticule")
 					.attr("class", "loxodrome"); 					
	document.getElementById("loxo_tag").style.display = "none";			
	};

function clearLoxodrome() {  
	loxo_data.paths_endpoints = []; 
	loxo_data.geojson.coordinates = [];
	removeLoxodrome();					
	};

function popLoxodrome() {
	loxo_data.paths_endpoints.pop();
	removeLoxodrome();
	loxodrome_draw();
	};
	
		
function loxodrome_draw() {

		loxo_data.geojson.coordinates =[];
		var i;	
		for (i=0; i<loxo_data.paths_endpoints.length; i++) {
			arc=LoxodromeArc(loxo_data.paths_endpoints[i][0][0], loxo_data.paths_endpoints[i][0][1] , 
			loxo_data.paths_endpoints[i][1][0],loxo_data.paths_endpoints[i][1][1], 50 , 
			document.getElementById("loxoextended").checked);
			
			loxo_data.geojson.coordinates.push(arc[1].coordinates);
			
			az = arc[0];
			len = document.getElementById("loxoextended").checked ?
			(Math.abs(20000/Math.cos(az*0.017453292519943295))) :
			(d3.geo.length(arc[1])*6366.197723675814);
			
 			console.log("Loxodrome arc " + (i+1) +":  " + len.toFixed(0) + " km  ,  Az: " + az.toFixed(2) )
			}
		
//		geo_data.geojson = { "type": "MultiLineString", "coordinates": geo_data.paths_endpoints };

		loxodrome.datum(loxo_data.geojson)
				.attr("d",path);
				
		document.getElementById("loxolength_tag").innerHTML = 
		document.getElementById("loxoextended").checked ?
		(Math.abs(20000/Math.cos(az*0.017453292519943295))).toFixed(0) + " km" :
		(d3.geo.length(loxo_data.geojson)*6366.197723675814).toFixed(0) + " km";
		
		document.getElementById("loxoazimuth_tag").innerHTML = 
		az.toFixed(2) + "\u00B0";
		
		document.getElementById("loxo_tag").style.display = "inline";
			
		};

function mode_loxodrome() {
	CurrentMode = "loxodrome";
	updateText();
	maparea.on(".drag", null);
	maparea.on('mousemove',default_mousemove);
	maparea.on('click', loxodrome_click);
	maparea.on('mouseleave', default_mouseleave);
	maparea.on('mouseenter', null);	
	document.getElementById("sphere").style.cursor = 'crosshair';
	
	document.getElementById("tissot_tools").style.display = 'none';
	document.getElementById("geodesic_tools").style.display = 'none';
	document.getElementById("loxodrome_tools").style.display = 'inline';
	document.getElementById("aspect_tools").style.display = 'none';

};
