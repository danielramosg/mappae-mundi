
Language = "en";

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


//Binding buttons to handlers

// top_controls
d3.select("#checktext").on("click",hideshowText);
d3.select("#lang_menu").on("click",showLangMenu);

d3.select("#button_start").on("click", function(){setText("info_map")} );
d3.select("#radio_text_tool").on("click", updateText );
d3.select("#radio_text_proj").on("click", updateText );
d3.select("#button_about").on("click", function(){setText("about")} );

// control_tools
d3.select("#radio_tissot").on("click", mode_tissot );
d3.select("#radio_geodesic").on("click", mode_geodesic );
d3.select("#radio_loxodrome").on("click", mode_loxodrome );
d3.select("#radio_aspect").on("click", mode_aspect );

// control_view
    // tissot_tools
d3.select("#pop_ellipses").on("click", popEllipse );
d3.select("#sample_ellipses").on("click", sampleEllipses );
d3.select("#decorate_ellipses").on("click", function(){
      d3.selectAll('.tissot_decoration')
      .style('visibility', this.checked ? 'visible' : 'hidden');
    } );
d3.select("#ellipradius").on("change", ellipradiusChanged )
    .attr("min",0).attr("max",20000).attr("step",100).attr("value",1000);

    // geodesic_tools
d3.select("#clear_geodesic").on("click", popGeodesic );
d3.select("#geoextended").on("click", geodesic_draw );

    // loxodrome_tools
d3.select("#clear_loxodrome").on("click", popLoxodrome );
d3.select("#loxoextended").on("click", loxodrome_draw );

    // aspect_tools

    // common_tools
d3.select("#clear_all").on("click", function(){
      clearEllipses(); clearGeodesic(); clearLoxodrome();
    } );
d3.select("#rastervisible").on("click", function(){
      d3.select("canvas").style("visibility",this.checked? 'visible':'hidden');
      d3.select(".land").style("visibility",this.checked? 'hidden':'visible');
    } );
d3.select("#countriesvisible").on("click", function(){
      d3.select(".boundary").style("visibility",this.checked? 'visible':'hidden');
    } );
d3.select("#graticulevisible").on("click", function(){
      d3.select(".graticule").style("visibility",this.checked? 'visible':'hidden');
    } );

    // control_projections
    // //
