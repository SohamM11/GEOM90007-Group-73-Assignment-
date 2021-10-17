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