//rent multiline, sensor data, cycle hotspots, trains
mapboxgl.accessToken = 'pk.eyJ1Ijoic2RpZ2hlIiwiYSI6ImNrdDN3OTdpajB5Y2Yyb3BnOTM1bG9xNnAifQ._3qrPrtiR2sRnuaGWG6tZA';
const map1 = new mapboxgl.Map({
    container: 'map1',
    style: 'mapbox://styles/sdighe/ckuuadlob1rsw17ntnmlkhatv',
    center: [144.966818, -37.809317],
    zoom: 13.10
});

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
    ];

function filterBy(day) {
    const filters = ['==', 'day', day];
    map1.setFilter('population-circles', filters);
    map1.setFilter('population-titles', filters);        
    document.getElementById('day').textContent = day;
    }

map1.on('load', () => {
    d3.json('https://raw.githubusercontent.com/sohamdighe14/data_store/main/sensor_data.geojson',jsonCallback);
    });

function jsonCallback(err, data) {
    if (err) {
    throw err;
    }
    data.features = data.features.map((d) => {
        d.properties.day = d.properties.Day;
        return d;
        });
    map1.addSource('sensors', {
        'type': 'geojson',
        data: data
        });
    map1.addLayer({
        'id': 'population-circles',
        'type': 'circle',
        'source': 'sensors',
        'paint': {
            'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'Hourly_Counts'],
                0,
                '#00ebff',
                1000,
                '#004c6d'
            ],
            'circle-opacity': 0.80,
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['get', 'Hourly_Counts'],
                0,
                20,
                1000,
                40
            ]}
        });
    map1.addLayer({
        'id': 'population-titles',
        'type': 'symbol',
        'source': 'sensors',
        'layout': {
            'text-field': ['concat', ['to-string', ['get', 'Hourly_Counts']], ' P'],
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 12,
        },
        'paint': {
            'text-color': 'rgba(225,225,225,1)'
        }
    });
    filterBy('Monday');
    document.getElementById('slider').addEventListener('input', (e) => {
        const day = parseInt(e.target.value, 10);
        filterBy(days[day]);
        });
}
map1.addControl(new mapboxgl.NavigationControl());
map1.addControl(new mapboxgl.ScaleControl({position: 'bottom-right'}));

const map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/sdighe/ckuv4qhmt4xf817mxsprpe6iq',
    center: [144.966818, -37.809317],
    zoom: 12  
});
map2.addControl(new mapboxgl.NavigationControl());
map2.addControl(new mapboxgl.ScaleControl({position: 'bottom-right'}));

const map3 = new mapboxgl.Map({
  container: 'map3',
  style: 'mapbox://styles/sdighe/ckuvamvzo64de18qv70qnih9z',
  center: [144.966818, -37.809317],
  zoom: 13.10
});
map3.addControl(new mapboxgl.NavigationControl());
map3.addControl(new mapboxgl.ScaleControl({position: 'bottom-right'}));

mapboxgl.accessToken = 'pk.eyJ1Ijoic2RpZ2hlIiwiYSI6ImNrdDN3OTdpajB5Y2Yyb3BnOTM1bG9xNnAifQ._3qrPrtiR2sRnuaGWG6tZA'; 
const map4 = new mapboxgl.Map({
    container: 'map4', // container ID
    style: 'mapbox://styles/sdighe/ckupuacdehsq818s0g9f0bg1r', // style URL  
});
var popup = new mapboxgl.Popup({
    closeOnClick: false
})
map4.on('mouseenter', 'ptv-metro-tram-stops-point-9zgd4m', (e) => {
    map4.getCanvas().style.cursor = 'pointer';
    popup
    .setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.STOP_NAME)
    .addTo(map4);
    });
map4.on('mouseleave', 'ptv-metro-tram-stops-point-9zgd4m', () => {
    map4.getCanvas().style.cursor = '';
    popup.remove();
    })

map4.on('click', 'ptv-metro-tram-routes-line-axyn70', (e) => {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<div style="width: 3000px"><table><tbody><tr><td>Starting Station:</td></tr><tr><td>'+e.features[0].properties.FIRST_STO8+'</td></tr><tr><td>Ending Station:</td></tr><tr><td>'+e.features[0].properties.LAST_STOP2+'</td></tr><tr><td>Length of route:</td></tr><tr><td>'+ Math.round(e.features[0].properties.ROUTE_KM)+' Km</td></tr></tbody></table></div>')
    .addTo(map4);
    if (typeof map4.getLayer('selectedRoad') !== "undefined" ){         
        map4.removeLayer('selectedRoad')
        map4.removeSource('selectedRoad');   
    }
    var features = map4.queryRenderedFeatures(e.point, { layers: ['ptv-metro-tram-routes-line-axyn70'] });
    var feature = features[0];
    map4.addSource('selectedRoad', {
        "type":"geojson",
        "data": feature.toJSON()
    });
    });
map4.on('mouseenter', 'ptv-metro-tram-routes-line-axyn70', (e) => {
    map4.getCanvas().style.cursor = 'pointer';
    });
map4.on('mouseleave', 'ptv-metro-tram-routes-line-axyn70', () => {
    map4.getCanvas().style.cursor = '';
    });
map4.addControl(new mapboxgl.NavigationControl());
map4.addControl(new mapboxgl.ScaleControl({position: 'bottom-right'}));