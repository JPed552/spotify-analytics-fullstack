import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopAlbumsWeighted } from '../services/statsService'; 

const TopAlbums = () => {
  const [topAlbums, setTopAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopAlbumsWeighted('long_term')
      .then(data => {
        setTopAlbums(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar álbuns:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className='text-2xl font-bold text-green-500 min-h-screen bg-zinc-900 flex items-center justify-center'>Calculando afinidade de álbuns...</div>;

  return (
    <div>
     <div className='flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto mb-12 gap-4 mt-8 '>
      <h1  className='text-4xl font-bold mb-4'>Top Álbuns (Por Relevância)</h1>
       <Link to="/" className='px-6 py-2 rounded-full border border-zinc-600 hover:bg-white hover:text-black hover:border-white transition-all duration-300'>Voltar ao Menu</Link>
      </div>
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20'>
        {topAlbums.map((album, index) => (
          <div 
            key={album.id} 
            className='group relative bg-zinc-800/50 hover:bg-zinc-800 p-6 rounded-2xl border border-zinc-700 hover:border-green-500 transition-all duration-300 flex flex-col items-center gap-4'
          >
            <span className='text-5xl font-black text-zinc-700/50'>
              #{index + 1}
            </span>
            <div className="relative z-10">
              <img 
                src={album.image} 
                alt={album.name} 
                className='w-40 h-40 rounded-md shadow-lg object-cover group-hover:shadow-green-500/20 transition-shadow'
              />
            </div>
            <div className='flex flex-col items-center text-center z-10 w-full gap-1'>
              <h3 className='text-lg font-bold text-white truncate w-full' title={album.name}>
                {album.name}
              </h3> 
              {/* Artista */}
              <p className='text-sm text-zinc-400 truncate w-full'>
                {album.artist}
              </p>
              <span className='mt-2 text-xs font-bold bg-zinc-900/80 text-green-400 px-3 py-1 rounded-full border border-zinc-700'>
                {album.tracksCount} {album.tracksCount === 1 ? 'faixa' : 'faixas'}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default TopAlbums;