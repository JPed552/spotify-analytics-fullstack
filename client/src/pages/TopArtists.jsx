import React, { useState, useEffect } from 'react';
import spotify from '../lib/spotify';
import { Link } from 'react-router-dom';

const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    spotify.getMyTopArtists({ limit: 50, time_range: 'long_term' })
      .then((data) => {
        setArtists(data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar artistas:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className='text-2xl font-bold text-green-500 min-h-screen bg-zinc-900 flex items-center justify-center'>Carregando seu ranking...</div>;

  return (
    <div >
      <div className='flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto mb-12 gap-4 mt-8 '>
        <h1 className='text-4xl font-bold mb-4'>Seus Artistas Mais Tocados</h1>
              <Link to="/"  className='px-6 py-2 rounded-full border border-zinc-600 hover:bg-white hover:text-black hover:border-white transition-all duration-300'>
        ← Voltar ao Menu
      </Link>
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20'>
        {artists.map((artist, index) => (
          <div key={artist.id} className=' bg-zinc-800/50 hover:bg-zinc-800 p-6 rounded-2xl border border-zinc-700 hover:border-green-500 transition-all duration-300 gap-4'>
            <span className='text-5xl font-black text-zinc-700/50'>
              #{index + 1}
            </span>

            <div>
              <img className='rounded-full  '
                src={artist.images[1]?.url || artist.images[0]?.url} 
                alt={artist.name}
              />
            </div>

            {/* Textos */}
            <div>
              <h3 className='flex flex-col items-center mt-6 text-2xl font-bold text-white'>
                {artist.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopArtists;