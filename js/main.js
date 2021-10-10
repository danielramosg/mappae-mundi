
CurrentLocation = [0,0];  //CurrentLocation = [-9.136500,38.707718];  //Lisbon
rotateToCurrentLocation = [-CurrentLocation[0],-CurrentLocation[1]];

getLocation();
// The getLocation works asynchronously, so we start with the default location,
// and if getLocation is successful, maps are updated.

defineProjections();


var element = document.getElementById("map_tag")


// Make Menu
menu = d3.select("#projection-menu");

menu.selectAll("option")
    .data(projectionslist)
  	.enter().append("option")
  	.attr("value",function(d) { return d.shortname; })
    .attr("class","trn")
    .text(function(d) { return d.name; });

menu.node().value = "platecarre"; //Default projection  "ortho";


function menu_changed ()
	{  updateMap();   updateText(); 	};

menu.on("change", menu_changed);


// Aspect change listener
var aspect = d3.select("#select-aspect");
aspect.on("change", changeAspect);


//Load carto data


var world
// NEWER VERSION OF D3
// d3.json('./carto/land.geojson')
//     .catch(function(error){throw error;})
//     .then(function(data) {
//       world = data;
//       updateMap();
// });

d3.json('./carto/world-50m.json', function(error,data){
			if(error) return console.warn(error);
      world = data;

      defineProjections();
      updateMap();

      new ResizeSensor(element, function() {
          //console.log('Changed to ' + element.clientWidth);
        defineProjections();
        updateMap();
        });
});



//Default tools data
var graticule = d3.geo.graticule();
var listellip = [];

var geo_data = {
		"buffer_point": null,
		"paths_endpoints": [],	//list of pairs of points.
		"geojson": {
			"type": "MultiLineString",
			"coordinates": []}			// coordinates of points in the path, in format geojson
	};

var loxo_data = {
		"buffer_point": null,
		"paths_endpoints": [],	//list of pairs of points.
		"geojson": {
			"type": "MultiLineString",
			"coordinates": []}			// coordinates of points in the path, in format geojson
	};


function nozoom() {
  d3.event.preventDefault();
}

d3.select("body")
    .on("touchstart", nozoom)
    .on("touchmove", nozoom)


hideshowText();

setText("info_map");



d3.json('./txt/ui-translations.json', function(error,data){
			if(error) return console.warn(error);

      translator = $('body').translate({lang: Language, t: data.dictionary})

      d3.select("#lang_options").selectAll("a")
          .data(data.languages).enter().append("a")
          .attr("href","#")
          .text(d => d.endonym)
          .on("click", d => {Language=d.isoCode; translateAll();} );
});
