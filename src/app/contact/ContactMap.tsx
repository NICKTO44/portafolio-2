'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix icono default de Leaflet en Next.js (webpack no resuelve los assets automáticamente)
const markerIcon = L.icon({
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  shadowSize:  [41, 41],
})

// Cusco — Plaza de Armas (zona central, no dirección exacta)
const CUSCO: [number, number] = [-13.5170, -71.9785]

// Invalida el tamaño tras montar para evitar el bug de tiles grises en Next.js
function MapResizer() {
  const map = useMap()
  useEffect(() => {
    map.invalidateSize()
  }, [map])
  return null
}

export default function ContactMap() {
  return (
    <MapContainer
      center={CUSCO}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: '#111' }}
    >
      {/* CartoDB Dark Matter — tiles oscuros, sin API key */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/" target="_blank" rel="noopener noreferrer">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapResizer />
      <Marker position={CUSCO} icon={markerIcon}>
        <Popup>
          <span style={{ fontFamily: 'sans-serif', fontSize: '13px' }}>
            📍 Cusco, Perú
          </span>
        </Popup>
      </Marker>
    </MapContainer>
  )
}