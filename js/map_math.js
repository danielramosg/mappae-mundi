
function Square(x) {return x * x; };

function Tissot(projection,lp) {
	var H = 1e-5;	
	var R = Math.PI/180 * projection.scale();
	if (R==0) {return {"sax0":0 , "sax1":0, "angle":0, "vec_par":[0,0], "vec_mer":[0,0] } }

	// Partial derivatives
	var xy_A = projection([ lp[0] - H/2. , lp[1] ]);
	var xy_B = projection([ lp[0] + H/2. , lp[1] ]);
	var dxdl = (xy_B[0] - xy_A[0])/H;
	var dydl = (xy_B[1] - xy_A[1])/H;
	var xy_A = projection([ lp[0] , lp[1] - H/2. ]); 
	var xy_B = projection([ lp[0] , lp[1] + H/2. ]);
	var dxdp = (xy_B[0] - xy_A[0])/H;
	var dydp = (xy_B[1] - xy_A[1])/H;

	// Tissot Indicatrix (method: Apply directly a linear transformation of the metric ellipse)
	//indicatrix.attr("rx", 1/(R * Math.cos(lp[1] * Math.PI/180)) )	
	//indicatrix.attr("transform","matrix(" + dxdl +' '+ dydl +' '+ dxdp +' '+ dydp +' '+ xy[0] +' '+ xy[1] + ")" );

	// Tissot Indicatrix (method: Parameters computed by linear algebra formulas)
	var A = [ [ 1/(R * Math.cos(lp[1] * Math.PI/180)) * dxdl , 1/R * dxdp ] ,
		  [ 1/(R * Math.cos(lp[1] * Math.PI/180)) * dydl , 1/R * dydp ] ];

	var A_nsq = Square(A[0][0]) + Square(A[0][1]) + Square(A[1][0]) + Square(A[1][1]) ;
	var A_det = A[0][0] * A[1][1] - A[0][1] * A[1][0] ;

	var D = Math.sqrt( Math.max(  Square(A_nsq) - 4 * Square(A_det) , 0 ) );
	var sax_0_sq = 1/2 * (A_nsq - D); //square length of minor semiaxis
	var sax_1_sq = 1/2 * (A_nsq + D); //square length of major semiaxis
	var sax_0 = Math.sqrt(sax_0_sq)
	var sax_1 = Math.sqrt(sax_1_sq)

	var v_1 = [ A[0][0]*A[1][0] + A[0][1]*A[1][1]  , Square(A[1][0]) + Square(A[1][1]) - sax_1_sq ]; //direction of major semiaxis
	if ( Math.abs(v_1[0]) + Math.abs(v_1[1]) > 1e-5 )
		{ var angle = Math.atan2(v_1[1],v_1[0]) * 180/Math.PI ;}
	else
		{ var v_0 = [ A[0][0]*A[1][0] + A[0][1]*A[1][1]  , Square(A[1][0]) + Square(A[1][1]) - sax_0_sq ]; //direction of minor semiaxis
		  var angle = Math.atan2(v_0[1],v_0[0]) * 180/Math.PI + 90 ;}

	return {"sax0":sax_0 , "sax1":sax_1, "angle":angle, "vec_par":[A[0][0],A[1][0]], "vec_mer":[A[0][1],A[1][1]] };
};



function GeodesicArc (lam1,phi1,lam2,phi2,pointsperdegree,complete) {
	//"""Returns the geodesic arc in the sphere joining the point (lam1,phi1) and (lam2,phi2). lam=lon, phi=lat """
	var l1 = lam1 * Math.PI/180 //computations in radians
	var p1 = phi1 * Math.PI/180
	var l2 = lam2 * Math.PI/180
	var p2 = phi2 * Math.PI/180
	var L = l2-l1	// With this L we can suppose that A is on the 0 meridian.
	var sL = Math.sin(L)
	var cL = Math.cos(L)
	var sp1 = Math.sin(p1)
	var cp1 = Math.cos(p1)
	var sp2 = Math.sin(p2)
	var cp2 = Math.cos(p2)

	var x = cL*cp1*cp2+sp1*sp2
	var y = sL*cp2
	var z = -cL*sp1*cp2+cp1*sp2

	var Y = Math.sqrt(Square(y) + Square(z))

	var M = [ [cp1 , 0.0 , sp1] , [-z/Y*sp1 , y/Y , z/Y*cp1] , [-y/Y*sp1 , -z/Y , y/Y*cp1] ];
	//To obtain M, we compose two rotations of the sphere (3x3 matrices) so that the geodesic joining A and B lies on the equator.
	//console.log(M)

 	var d = Math.acos(x)
 
 	if (complete) { d = 6.2831853071795864770 };
 	//console.log(d);
 	
 	var ddeg = d * 57.29577951308232087794;
	//console.log("Distance(A,B) = " + ddeg)	;
 
 	var numpoints = Math.round(ddeg*pointsperdegree); // each point in the path is one minute of geodesic from the previous.
// 	#print "Numpoints: ", numpoints
 	var geo0 = numeric.linspace(0,d,numpoints);
// 	geo0xyz = np.column_stack((np.cos(geo0),np.sin(geo0),np.zeros(numpoints)))
	var geo0xyz = numeric.transpose( [ numeric.cos(geo0) , numeric.sin(geo0) , numeric.linspace(0,0,numpoints) ] )
// 	#print geo0xyz
//
	var geoxyz = numeric.dot(geo0xyz,M); 
// 	geoxyzb = np.dot(geo0xyz,M);
// 	#print geoxyzb
// 	ll = np.arctan2(geoxyzb[:,1],geoxyzb[:,0])
// 	pp = np.arcsin(geoxyzb[:,2])
// 	geolpb = np.column_stack((ll,pp))
	var geolpdeg=[];
	
	for (i=0; i< geoxyz.length; i++) {
	var ll = Math.atan2(geoxyz[i][1],geoxyz[i][0])  +  l1 ;
	var pp = Math.asin(geoxyz[i][2]);
	
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

	var x1 = lam1 * Math.PI/180 //computations in radians //x1 = l1
	var p1 = phi1 * Math.PI/180
	var x2 = lam2 * Math.PI/180
	var p2 = phi2 * Math.PI/180
	
	var y1 = Math.log(Math.tan(p1/2 + Math.PI/4))
	var y2 = Math.log(Math.tan(p2/2 + Math.PI/4))

	var azimuth = Math.atan2(x2-x1,y2-y1) * 57.29577951308232087794 % 360
	//console.log("Azimuth: " + azimuth);
	
	var d = Math.abs(x2-x1) + Math.abs(y2-y1)
	var numpoints = Math.round(d*pointsdensity) 
//	print "Numpoints lox: ", numpoints

	if (!complete) 
		{  
		var trange = numeric.linspace(0,1,numpoints) 
		//xrange = numeric.linspace(x1,x2,numpoints) 
		}
	else { 
		if (Math.abs(y2-y1) >1e-4) {
			K=6 // log(tan( 89d/2+ 45d) approx = 5
			var trange = numeric.linspace( (-K-y1)/(y2-y1) , (K-y1)/(y2-y1) , 20*numpoints)
			}
		else {
			var trange = numeric.linspace(-6.283185307179586 , 6.283185307179586, numpoints)
			}
		};
	
	var loxo=[]
	
	for (i=0; i<trange.length; i++) {
		var X = x1 + trange[i] * (x2-x1)
		var Y = y1 + trange[i] * (y2-y1)
// 		X = xrange[i] 
// 		Y = y1+ (X-x1)*(y2-y1)/(x2-x1)
		var L = X* 180/Math.PI % 360
		var P = 2* Math.atan(Math.exp(Y)) * 180/Math.PI -90.
		
		loxo.push([L,P]);
		};
		
	var obj = {
			"type": "LineString",
			"coordinates": loxo
			};
 	
	//print "Azimuth: ", azimuth
	return [azimuth, obj];
 	};
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
	