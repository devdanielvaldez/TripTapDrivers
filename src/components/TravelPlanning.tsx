import { useState, useEffect } from 'react';
import Map from 'react-map-gl';
import { Geolocation } from '@capacitor/geolocation';
import TravelSearch from './SearchLocation';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

export default function TravelPlanner() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    const getCurrentPosition = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      } catch (error) {
        console.error('Error getting location', error);
      }
    };

    getCurrentPosition();
  }, []);

  return (
    <div className="min-h-screen bg-none flex flex-col">
      <div className="bg-[#181818] text-white pt-[20px] pl-10 pr-10 pb-[2px]">
        <header className="flex justify-between items-center">
          <div>
            <img src="/assets/logo_2.svg" className='w-10 h-10' alt="" />
          </div>
          <Link to="" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center">
            <User size={20} className="text-gray-400" />
          </Link>
        </header>
      </div>
      <header className="bg-[#181818] text-white pl-4 pr-4 pb-4">
        <h1 className="text-lg font-semibold text-center">Planifica El Viaje</h1>
      </header>
      <main className="flex-1 p-0">
        <TravelSearch />
        <div>
          {latitude && longitude ? (
            <Map
              mapboxAccessToken="pk.eyJ1IjoiaW5nZGFuaWVsdmFsZGV6IiwiYSI6ImNsdjl3cDQ5MzExYjMyamt3azIxcXRtNG0ifQ.1DTmTIstMhPDEOW91UAuEw"
              initialViewState={{
                longitude: longitude,
                latitude: latitude,
                zoom: 14
              }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              style={{ width: '100vw', height: '100vh' }}
              onRender={(event) => event.target.resize()}
            />
          ) : (
            <p className="text-white text-center">Obteniendo ubicación...</p>
          )}
        </div>
      </main>
    </div>
  );
}