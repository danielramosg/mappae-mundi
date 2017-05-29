
function createTissotEllipse( proj, lp, scalefactor ) {
	var grp = d3.select(document.createElementNS(d3.ns.prefix.svg, 'g'));
	
	grp.append("ellipse")
		.attr("cx",0)
		.attr("cy",0)
		.attr("stroke-width",2)
		.attr("fill-opacity",0.5)
				
	grp.append("line")
		.attr("class","vec_par")	
		.attr("stroke-width",0.5)
		
	grp.append("line")
		.attr("class","vec_mer")
		.attr("stroke-width",0.5)
				
	grp.attr("class","listellip");
	
	updateTissotEllipse(proj, lp, scalefactor, grp );
		
	return grp;

};


function updateTissotEllipse( proj, lp, scalefactor, grp ) {
	var props = Tissot(proj,lp);
	var strokecolor = (Math.abs(props.sax0 - props.sax1) < 1e-2) ? "green" : "red" ;
	var fillcolor = (Math.abs(props.sax0 * props.sax1 - 1 ) < 1e-2) ? "green" : "red" ;
	var xy = projection(lp);
	
	grp.select("ellipse")
		.attr("rx",scalefactor *props.sax0)
		.attr("ry",scalefactor *props.sax1)
		.attr("stroke",	strokecolor)
		.attr("fill", fillcolor)
		.attr("transform","translate("+xy[0] +' '+ xy[1] +") "+ "rotate("+ props.angle+ ")");
				
 	grp.select(".vec_par")
 		.attr("x1",-scalefactor *props.vec_par[0])
		.attr("y1",-scalefactor *props.vec_par[1])
 		.attr("x2",scalefactor *props.vec_par[0])
		.attr("y2",scalefactor *props.vec_par[1])
		.attr("stroke", strokecolor)
		.attr("transform","translate("+xy[0] +' '+ xy[1] +")" );
		
	grp.select(".vec_mer")
		.attr("x1",-scalefactor *props.vec_mer[0])
		.attr("y1",-scalefactor *props.vec_mer[1])
 		.attr("x2",scalefactor *props.vec_mer[0])
		.attr("y2",scalefactor *props.vec_mer[1])
		.attr("stroke", strokecolor)
		.attr("transform","translate("+xy[0] +' '+ xy[1] +")" );

};



function removeEllipses() { d3.selectAll(".listellip").remove(); };

function clearEllipses() {  listellip = [];  removeEllipses(); };

function popEllipse() { listellip.pop(); removeEllipses(); drawEllipses(); }; //TODO: remove only last ellipse

function sampleEllipses() {
	for (i=-120; i<=180; i+=60) {
		for (j=-40; j<=40; j+=40) {
			listellip.push([i,j]);
	}};
	
	for (i=-150; i<180; i+=60) {
		for (j=-60; j<=80; j+=40) {
			listellip.push([i,j]);
	}};
	removeEllipses(); drawEllipses();	
};




function drawEllipses () {
		
	for (i=0; i < listellip.length; i++) {
		//verify that the point is on the map
		var lp = listellip[i];
		var xy = projection(lp);
		var lp_vf = projection.invert(xy);
		
		var tolerance = 1;
		if ( 
  			(Math.abs(lp[0] - lp_vf[0]) < tolerance ) && 
 			(Math.abs(lp[1] - lp_vf[1]) < tolerance ) &&		
			(xy[0] > 30 ) && (xy[0] < width -30 ) &&
			(xy[1] > 30 ) && (xy[1] < height -30 )		
			) { 
					
			var ellip = createTissotEllipse(projection,listellip[i],scalefactor);
			svg.node().appendChild(ellip.node());		

			};
		};	
};

function ellipradiusChanged () {
scalefactor = projection.scale() * document.getElementById("ellipradius").value /6283.185 ;
removeEllipses(); 
drawEllipses();
}


// Mouse interactions

function tissot_mousemove() {
	//console.log("tissot_mousemove this: " + this);
	xy = d3.mouse(this);
	lp = projection.invert(xy); //lp = lambda, phi = lon, lat

	updateCoordsTag(this);
	updateTissotEllipse(projection,lp,scalefactor,indicatrix);
};


function tissot_click() {
	//xy = d3.mouse(this);
	//lp = projection.invert(xy);
	listellip.push( lp ); 
	ellip = createTissotEllipse(projection,lp,scalefactor);
	svg.node().appendChild(ellip.node());

};

function tissot_mouseleave() {
	indicatrix.node().style.visibility = 'hidden';
	default_mouseleave();
};

function tissot_mouseenter() {
	indicatrix.node().style.visibility = 'visible';
};



function mode_tissot() {
	maparea.on(".drag", null);
	maparea.on('mousemove',tissot_mousemove);
	maparea.on('click', tissot_click);
	maparea.on('mouseleave', tissot_mouseleave);
	maparea.on('mouseenter', tissot_mouseenter);
	document.getElementById("sphere").style.cursor = 'crosshair';
	
	document.getElementById("tissot_tools").style.display = 'inline';
	document.getElementById("geodesic_tools").style.display = 'none';
	document.getElementById("loxodrome_tools").style.display = 'none';
	document.getElementById("aspect_tools").style.display = 'none';

};
















