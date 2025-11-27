import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import spotify from './lib/spotify';
import './index.css'

//components
import Header from './components/Header';

// pages
import Home from './pages/Home';
import TopArtists from './pages/TopArtists';
import TopTracks from './pages/TopTracks';
import TopAlbums from './pages/TopAlbums';

function App() {
  const [token, setToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    
    const storedToken = localStorage.getItem('spotify_token');

    if (accessToken) {
      setToken(accessToken);
      localStorage.setItem('spotify_token', accessToken); 
      spotify.setAccessToken(accessToken);
      window.history.pushState({}, null, '/');
    } else if (storedToken) {
      setToken(storedToken);
      spotify.setAccessToken(storedToken);
    }

    setLoading(false);
  }, []);

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3000/login', { method: 'POST' });
    const data = await response.json();
    window.location.href = data.url;
  };

  const handleLogout = () => {
    setToken(null);
    setUserProfile(null);
    localStorage.removeItem('spotify_token');
    spotify.setAccessToken(null);
    window.location.href = '/';
  };
  

  useEffect(() => {
    if (token) {
      spotify.getMe()
        .then((data) => setUserProfile(data))
        .catch((err) => {
          console.error("Erro ao buscar perfil:", err);
          handleLogout(); 
        });
    }
  }, [token]);


  if (loading) return <div>Carregando...</div>;

  return (
    <div className=' bg-zinc-900 min-h-screen text-stone-50 font-sans'>
      {token && <Header user={userProfile} onLogout={handleLogout} />}

      <main >
        {!token ? ( 
          <div className='flex flex-col justify-center items-center h-screen gap-8' >
           <h1 className='text-5xl font-bold mb-4' > Spotify Stats </h1>
            <button onClick={handleLogin} className='bg-green-500 hover:bg-green-400 rounded-full px-10 py-4 text-2xl' > ENTRAR COM SPOTIFY </button>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artistas" element={<TopArtists />} />
            <Route path="/musicas" element={<TopTracks />} />
            <Route path="/albuns" element={<TopAlbums />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;