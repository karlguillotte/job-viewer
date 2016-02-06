import { LatLng, LatLngBounds } from 'leaflet'

export default features => {
    if (features.length === 0) {
        return new LatLngBounds()
    }

    const longitudes = features.map(feature => feature.longitude)
    const latitudes = features.map(feature => feature.latitude)
    const sw = new LatLng(Math.min(...latitudes), Math.min(...longitudes))
    const ne = new LatLng(Math.max(...latitudes), Math.max(...longitudes))

    return new LatLngBounds(sw, ne)
}
