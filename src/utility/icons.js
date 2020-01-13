import L from 'leaflet'
import blueIcon from 'leaflet/dist/images/marker-icon.png'
import redIcon from 'leaflet/dist/images/marker-red.png'

export var waterIcon = L.icon({
	iconUrl: blueIcon,
	iconSize: [18.29, 30],
	iconAnchor: [9.145, 15],
	popupAnchor: [0, -15]
})

export var myIcon = L.icon({
	iconUrl: redIcon,
	iconSize: [18.29, 30],
	iconAnchor: [9.145, 15],
	popupAnchor: [0, -15]
})
