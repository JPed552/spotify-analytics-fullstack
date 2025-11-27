import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 w-full px-8 py-4 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-zinc-800/50">
      <div>
        <h2 className='text-2xl font-bold text-green-400'>StatsFY</h2>
      </div>
      <div>
        {user && (
          <div className='flex items-center gap-6'>
            {user.images?.[0]?.url && (
              <img src={user.images[0].url} alt="Avatar" style={{width: 30}}  className='w-8 h-8 rounded-full' />
            )}
            <span>{user.display_name}</span>
            <button onClick={onLogout} className=' hover:text-zinc-400 rounded-full'>Sair</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;