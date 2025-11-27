import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex flex-col items-center mt-20' >
      
      <h2 className='text-4xl mb-10 font-bold'>
        O que você quer ver hoje?
      </h2>
      <div className='grid md:grid-cols-3 gap-6 mt-6'>
        <Link to="/artistas" className='p-10 flex flex-col items-center rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 hover:border-green-500 transition-all duration-300 ' >
          <span className="text-6xl mb-2 group-hover:scale-110">
            🎤
          </span>
          <h3 className="text-2xl font-bold text-white mt-4">
            Top Artistas
          </h3>
        </Link>

        {/* --- CARD MÚSICAS --- */}
        <Link to="/musicas"className='p-10 flex flex-col items-center rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 hover:border-green-500 transition-all duration-300' >
          <span className="text-6xl mb-2 group-hover:scale-110" >
            🎵
          </span>
          <h3 className='text-2xl font-bold text-white mt-4' >
            Top Músicas
          </h3>
        </Link>

        {/* --- CARD ÁLBUNS --- */}
        <Link to="/albuns" className='p-10 flex flex-col items-center rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 hover:border-green-500 transition-all duration-300'>
          <span className="text-6xl mb-2 group-hover:scale-110">
            💿
          </span>
          <h3 className='text-2xl font-bold text-white mt-4'>
            Top Álbuns
          </h3>
        </Link>

      </div>
    </div>
  );
};

export default Home;