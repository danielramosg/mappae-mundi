
function getLocation() {
    if (navigator.geolocation) {
        coords = navigator.geolocation.getCurrentPosition(setPosition);
    } else { 
    	console.log("Geolocation is not supported by this browser. Location set to 0,0 .");
    }
}

function setPosition(position) {
    CurrentLocation = [position.coords.longitude, position.coords.latitude];
    console.log("Coordinates set to: " + CurrentLocation);
    
    rotateToCurrentLocation = [-CurrentLocation[0],-CurrentLocation[1]];
    defineProjections();
    updateMap();
}


function defineProjections() {

	width = document.getElementById("map_tag").clientWidth;
	height = document.getElementById("map_tag").clientHeight;

	projectionslist = [
	  {	shortname: "platecarre",
		name: "Plate Carrée",
		projection: d3.geo.equirectangular()
			.scale(0.15*Math.min(width,2*height))
			.translate([width / 2, height / 2])},
	  {	shortname: "mercator",
		name: "Mercator",
		projection: d3.geo.mercator()
			.scale(0.15*Math.min(width,1.1*height))
			.translate([width / 2, height / 2])
			.clipExtent([[0,0],[width,height]])},
	  {	shortname: "gallpeters",
		name: "Gall-Peters",
		projection: d3.geo.cylindricalEqualArea().parallel(45)
			.scale(0.2*Math.min(width, 1.571*height))
			.translate([width / 2, height / 2])},
	//  {name: "Lambert cylindrical equal-area", projection: d3.geo.cylindricalEqualArea()},
	  {	shortname: "mollweide",
		name: "Mollweide",
		projection: d3.geo.mollweide()
			.scale(0.160*Math.min(width, 2*height))
			.translate([width / 2, height / 2])
			.precision(0.2)},
	  {	shortname: "aziequi",
		name: "Azimuthal Equidistant",
		projection: d3.geo.azimuthalEquidistant()
			.scale(0.15*Math.min(width,height))
			.translate([width / 2, height / 2])
			.clipAngle(180 - 1e-3)
			.clipExtent([[0,0],[width,height]])
			.precision(.1)
			.rotate(rotateToCurrentLocation)  },
	  {	shortname: "gnomo",
		name: "Gnomonic",
		projection: d3.geo.gnomonic()
			.clipAngle(90 - 1e-3)
			.scale(120)
			.translate([width / 2, height / 2])
			.precision(.1)
			.clipExtent([[0,0],[width,height]])
			.rotate(rotateToCurrentLocation)	}, 
	  {	shortname: "stereo",
		name: "Stereographic",
		projection: d3.geo.stereographic()
			.scale(280)
			.translate([width / 2, height / 2])
			//.clipAngle(90)
			.clipAngle(160 - 1e-3)
			.precision(.1)
			.clipExtent([[0,0],[width,height]])},
	  {	shortname: "ortho",
		name: "Orthographic",
		projection: d3.geo.orthographic()
			.scale(0.45*Math.min(width,height))
			.translate([width / 2, height / 2])
			.clipAngle(90)
			.clipExtent([[0,0],[width,height]])
			.precision(.1)
			.rotate(rotateToCurrentLocation) }

	//   {name: "Aitoff", projection: d3.geo.aitoff()},
	//   {name: "Albers", projection: d3.geo.albers().scale(145).parallels([20, 50])},
	//   {name: "August", projection: d3.geo.august().scale(60)},
	//   {name: "Baker", projection: d3.geo.baker().scale(100)},
	//   {name: "Boggs", projection: d3.geo.boggs()},
	//   {name: "Bonne", projection: d3.geo.bonne().scale(120)},
	//   {name: "Bromley", projection: d3.geo.bromley()},
	//   {name: "Craster Parabolic", projection: d3.geo.craster()},
	//   {name: "Collignon", projection: d3.geo.collignon().scale(93)},
	//   {name: "Eckert I", projection: d3.geo.eckert1().scale(165)},
	//   {name: "Eckert II", projection: d3.geo.eckert2().scale(165)},
	//   {name: "Eckert III", projection: d3.geo.eckert3().scale(180)},
	//   {name: "Eckert IV", projection: d3.geo.eckert4().scale(180)},
	//   {name: "Eckert V", projection: d3.geo.eckert5().scale(170)},
	//   {name: "Eckert VI", projection: d3.geo.eckert6().scale(170)},
	//   {name: "Eisenlohr", projection: d3.geo.eisenlohr().scale(60)},
	//   {name: "Hammer", projection: d3.geo.hammer().scale(165)},
	//   {name: "Hill", projection: d3.geo.hill()},
	//   {name: "Goode Homolosine", projection: d3.geo.homolosine()},
	//   {name: "Kavrayskiy VII", projection: d3.geo.kavrayskiy7()},
	//   {name: "Lagrange", projection: d3.geo.lagrange().scale(120)},
	//   {name: "Larrivée", projection: d3.geo.larrivee().scale(95)},
	//   {name: "Laskowski", projection: d3.geo.laskowski().scale(120)},
	//   {name: "Loximuthal", projection: d3.geo.loximuthal()},
	//   {name: "Miller", projection: d3.geo.miller().scale(100)},
	//   {name: "McBryde–Thomas Flat-Polar Parabolic", projection: d3.geo.mtFlatPolarParabolic()},
	//   {name: "McBryde–Thomas Flat-Polar Quartic", projection: d3.geo.mtFlatPolarQuartic()},
	//   {name: "McBryde–Thomas Flat-Polar Sinusoidal", projection: d3.geo.mtFlatPolarSinusoidal()},
	//   {name: "Natural Earth", projection: d3.geo.naturalEarth()},
	//   {name: "Nell–Hammer", projection: d3.geo.nellHammer()},
	//   {name: "Polyconic", projection: d3.geo.polyconic().scale(100)},
	//   {name: "Robinson", projection: d3.geo.robinson()},
	//   {name: "Sinusoidal", projection: d3.geo.sinusoidal()},
	//   {name: "Sinu-Mollweide", projection: d3.geo.sinuMollweide()},
	//   {name: "van der Grinten", projection: d3.geo.vanDerGrinten().scale(75)},
	//   {name: "van der Grinten IV", projection: d3.geo.vanDerGrinten4().scale(120)},
	//   {name: "Wagner IV", projection: d3.geo.wagner4()},
	//   {name: "Wagner VI", projection: d3.geo.wagner6()},
	//   {name: "Wagner VII", projection: d3.geo.wagner7()},
	//   {name: "Winkel Tripel", projection: d3.geo.winkel3()}
	];
};
