
function Square(x) {return x * x; };

function Tissot(projection,lp) {
	var H = 1e-5;	
	var R = Math.PI/180 * projection.scale();

	// Partial derivatives
	xy_A = projection([ lp[0] - H/2. , lp[1] ]);
	xy_B = projection([ lp[0] + H/2. , lp[1] ]);
	dxdl = (xy_B[0] - xy_A[0])/H;
	dydl = (xy_B[1] - xy_A[1])/H;
	xy_A = projection([ lp[0] , lp[1] - H/2. ]); 
	xy_B = projection([ lp[0] , lp[1] + H/2. ]);
	dxdp = (xy_B[0] - xy_A[0])/H;
	dydp = (xy_B[1] - xy_A[1])/H;

	// Tissot Indicatrix (method: Apply directly a linear transformation of the metric ellipse)
	//indicatrix.attr("rx", 1/(R * Math.cos(lp[1] * Math.PI/180)) )	
	//indicatrix.attr("transform","matrix(" + dxdl +' '+ dydl +' '+ dxdp +' '+ dydp +' '+ xy[0] +' '+ xy[1] + ")" );

	// Tissot Indicatrix (method: Parameters computed by linear algebra formulas)
	A = [ [ 1/(R * Math.cos(lp[1] * Math.PI/180)) * dxdl , 1/R * dxdp ] ,
		  [ 1/(R * Math.cos(lp[1] * Math.PI/180)) * dydl , 1/R * dydp ] ];

	A_nsq = Square(A[0][0]) + Square(A[0][1]) + Square(A[1][0]) + Square(A[1][1]) ;
	A_det = A[0][0] * A[1][1] - A[0][1] * A[1][0] ;

	D = Math.sqrt( Math.max(  Square(A_nsq) - 4 * Square(A_det) , 0 ) );
	sax_0_sq = 1/2 * (A_nsq - D); //square length of minor semiaxis
	sax_1_sq = 1/2 * (A_nsq + D); //square length of major semiaxis
	sax_0 = Math.sqrt(sax_0_sq)
	sax_1 = Math.sqrt(sax_1_sq)

	v_1 = [ A[0][0]*A[1][0] + A[0][1]*A[1][1]  , Square(A[1][0]) + Square(A[1][1]) - sax_1_sq ]; //direction of major semiaxis
	if ( Math.abs(v_1[0]) + Math.abs(v_1[1]) > 1e-5 )
		{ angle = Math.atan2(v_1[1],v_1[0]) * 180/Math.PI ;}
	else
		{ v_0 = [ A[0][0]*A[1][0] + A[0][1]*A[1][1]  , Square(A[1][0]) + Square(A[1][1]) - sax_0_sq ]; //direction of minor semiaxis
		  angle = Math.atan2(v_0[1],v_0[0]) * 180/Math.PI + 90 ;}

	return {"sax0":sax_0 , "sax1":sax_1, "angle":angle, "vec_par":[A[0][0],A[1][0]], "vec_mer":[A[0][1],A[1][1]] };
};



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
	
	return 0;

};


function GeodesicArc (lam1,phi1,lam2,phi2,pointsperdegree,complete) {
	//"""Returns the geodesic arc in the sphere joining the point (lam1,phi1) and (lam2,phi2). lam=lon, phi=lat """
	l1 = lam1 * Math.PI/180 //computations in radians
	p1 = phi1 * Math.PI/180
	l2 = lam2 * Math.PI/180
	p2 = phi2 * Math.PI/180
	L = l2-l1	// With this L we can suppose that A is on the 0 meridian.
	sL = Math.sin(L)
	cL = Math.cos(L)
	sp1 = Math.sin(p1)
	cp1 = Math.cos(p1)
	sp2 = Math.sin(p2)
	cp2 = Math.cos(p2)

	x = cL*cp1*cp2+sp1*sp2
	y = sL*cp2
	z = -cL*sp1*cp2+cp1*sp2

	Y = Math.sqrt(Square(y) + Square(z))

	M = [ [cp1 , 0.0 , sp1] , [-z/Y*sp1 , y/Y , z/Y*cp1] , [-y/Y*sp1 , -z/Y , y/Y*cp1] ];
	//To obtain M, we compose two rotations of the sphere (3x3 matrices) so that the geodesic joining A and B lies on the equator.
	//console.log(M)

 	d = Math.acos(x)
 
 	if (complete) { d = 6.2831853071795864770 };
 	//console.log(d);
 	
 	ddeg = d * 57.29577951308232087794;
	//console.log("Distance(A,B) = " + ddeg)	;
 
 	numpoints = Math.round(ddeg*pointsperdegree); // each point in the path is one minute of geodesic from the previous.
// 	#print "Numpoints: ", numpoints
 	geo0 = numeric.linspace(0,d,numpoints);
// 	geo0xyz = np.column_stack((np.cos(geo0),np.sin(geo0),np.zeros(numpoints)))
	geo0xyz = numeric.transpose( [ numeric.cos(geo0) , numeric.sin(geo0) , numeric.linspace(0,0,numpoints) ] )
// 	#print geo0xyz
//
	geoxyz = numeric.dot(geo0xyz,M); 
// 	geoxyzb = np.dot(geo0xyz,M);
// 	#print geoxyzb
// 	ll = np.arctan2(geoxyzb[:,1],geoxyzb[:,0])
// 	pp = np.arcsin(geoxyzb[:,2])
// 	geolpb = np.column_stack((ll,pp))
	geolpdeg=[];
	
	for (i=0; i< geoxyz.length; i++) {
	ll = Math.atan2(geoxyz[i][1],geoxyz[i][0])  +  l1 ;
	pp = Math.asin(geoxyz[i][2]);
	
	geolpdeg.push([ll* 57.29577951308232087794,pp* 57.29577951308232087794]);
	}
// 	geolp = geolpb + np.array([l1,0])
 	//geolpdeg = geolp 
 	
 	//console.log("geodesic: " + geolpdeg); 
 	
 	var obj = {
			//"type": "MultiPoint",
			"type": "LineString",
			//"coordinates": [ [-105.01621,39.57422],	[-80.6665134,35.0539943] ]
			"coordinates": geolpdeg
			};
 	//console.log("Distance1: "+ ddeg);
 	//console.log("Distance2: "+ d3.geo.length(obj)*180/Math.PI);
 	return [ddeg , obj] ;

 	};
 	
 	
function LoxodromeArc (lam1,phi1,lam2,phi2,pointsdensity,complete) {
	//"""Returns the loxodrome arc in the sphere joining the point (lam1,phi1) and (lam2,phi2). lam=lon, phi=lat """

	x1 = lam1 * Math.PI/180 //computations in radians //x1 = l1
	p1 = phi1 * Math.PI/180
	x2 = lam2 * Math.PI/180
	p2 = phi2 * Math.PI/180
	
	y1 = Math.log(Math.tan(p1/2 + Math.PI/4))
	y2 = Math.log(Math.tan(p2/2 + Math.PI/4))

	azimuth = Math.atan2(x2-x1,y2-y1) * 57.29577951308232087794 % 360
	//console.log("Azimuth: " + azimuth);
	
	d = Math.abs(x2-x1) + Math.abs(y2-y1)
	numpoints = Math.round(d*pointsdensity) 
//	print "Numpoints lox: ", numpoints

	if (!complete) 
		{  
		trange = numeric.linspace(0,1,numpoints) 
		//xrange = numeric.linspace(x1,x2,numpoints) 
		}
	else { 
		if (Math.abs(y2-y1) >1e-4) {
			K=6 // log(tan( 89d/2+ 45d) approx = 5
			trange = numeric.linspace( (-K-y1)/(y2-y1) , (K-y1)/(y2-y1) , 20*numpoints)
			}
		else {
			trange = numeric.linspace(-6.283185307179586 , 6.283185307179586, numpoints)
			}
		};
	
	loxo=[]
	
	for (i=0; i<trange.length; i++) {
		X = x1 + trange[i] * (x2-x1)
		Y = y1 + trange[i] * (y2-y1)
// 		X = xrange[i] 
// 		Y = y1+ (X-x1)*(y2-y1)/(x2-x1)
		L = X* 180/Math.PI % 360
		P = 2* Math.atan(Math.exp(Y)) * 180/Math.PI -90.
		
		loxo.push([L,P]);
		};
		
	var obj = {
			"type": "LineString",
			"coordinates": loxo
			};
 	
	//print "Azimuth: ", azimuth
	return [azimuth, obj];
 	};
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
	