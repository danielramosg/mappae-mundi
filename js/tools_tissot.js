
function createTissotEllipse( proj, lp, scalefactor ) {
	var grp = d3.select(document.createElementNS(d3.ns.prefix.svg, 'g'));
	
	grp.append("ellipse")
		.attr("cx",0)
		.attr("cy",0)
		.attr("stroke-width",2)
		.attr("fill-opacity",0.3);
				
	grp.append("line")
		.attr("class","vec_par tissot_decoration")
		.attr("stroke-width",0.5);
		
	grp.append("line")
		.attr("class","vec_mer tissot_decoration")
		.attr("stroke-width",0.5);
	
	grp.append("path")
		.attr("class","goniometer tissot_decoration")
		.attr("stroke-width",1);	
				
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
		.style("visibility", d3.select("#decorate_ellipses").node().checked ? "visible" : "hidden")
		.attr("transform","translate("+xy[0] +' '+ xy[1] +")" );
		
	grp.select(".vec_mer")
		.attr("x1",-scalefactor *props.vec_mer[0])
		.attr("y1",-scalefactor *props.vec_mer[1])
 		.attr("x2",scalefactor *props.vec_mer[0])
		.attr("y2",scalefactor *props.vec_mer[1])
		.attr("stroke", strokecolor)
		.style("visibility", d3.select("#decorate_ellipses").node().checked ? "visible" : "hidden")
		.attr("transform","translate("+xy[0] +' '+ xy[1] +")" );
	
	var d = "";	
	for (var i=0; i<360; i+=22.5) {
		var ii = i * Math.PI /180;
		var pt0 = scalefactor * (Math.cos(ii) * props.vec_mer[0] + Math.sin(ii) * props.vec_par[0] );
		var pt1 = scalefactor * (Math.cos(ii) * props.vec_mer[1] + Math.sin(ii) * props.vec_par[1] );
		d += "M" + pt0 + " " + pt1 + " " + "L" + 0.8*pt0 + " " + 0.8*pt1 + " ";
	}
		
	grp.select(".goniometer")
		.attr("d",d)
		.attr("stroke", strokecolor)
		.style("visibility", d3.select("#decorate_ellipses").node().checked ? "visible" : "hidden")
		.attr("transform","translate("+xy[0] +' '+ xy[1] +")" );	
		

};



function removeEllipses() { d3.selectAll(".listellip").remove(); };

function clearEllipses() {  listellip = [];  removeEllipses(); };

function popEllipse() { listellip.pop(); removeEllipses(); drawEllipses(); }; //TODO: remove only last ellipse

function sampleEllipses() {
	for (i=-120; i<=180; i+=60) {
		for (j=-40; j<=40; j+=40) {
			listellip.push([i-1e-3,j]);
	}};
	
	for (i=-150; i<180; i+=60) {
		for (j=-60; j<=80; j+=40) {
			listellip.push([i-1e-3,j]);
	}};
	removeEllipses(); drawEllipses();	
};




function drawEllipses () {

	var rect=maparea.node().getBBox();
	for (i=0; i < listellip.length; i++) {
		//verify that the point is on the map
		var lp = listellip[i];
		var xy = projection(lp);
		var lp_vf = projection.invert(xy);
		
		var tolerance = 1;
		if ( 
  			(Math.abs(lp[0] - lp_vf[0]) < tolerance ) && 
 			(Math.abs(lp[1] - lp_vf[1]) < tolerance ) &&		
			(xy[0] > rect.x + 5 ) && (xy[0] < rect.x + rect.width -5 ) &&
			(xy[1] > rect.y + 5 ) && (xy[1] < rect.y + rect.height -5 )
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
	indicatrix.style('display', 'none');
	default_mouseleave();
};

function tissot_mouseenter() {
	indicatrix.style('display', 'block');
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
















