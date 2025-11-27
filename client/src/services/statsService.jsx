import spotify from '../lib/spotify';

export const getTopAlbumsWeighted = async (timeRange = 'long_term') => {
  const LIMIT_PER_REQUEST = 50;
  const TOTAL_FETCH = 1000; 
  const promises = [];

  for (let offset = 0; offset < TOTAL_FETCH; offset += LIMIT_PER_REQUEST) {
    promises.push(
      spotify.getMyTopTracks({ limit: LIMIT_PER_REQUEST, offset, time_range: timeRange })
        .catch(() => ({ items: [] }))
    ); 
  }

  const responses = await Promise.all(promises);
  const allTracks = responses.flatMap(res => res.items || []);

  const uniqueTracks = Array.from(new Map(allTracks.map(t => [t.id, t])).values());

  const albumMap = {};
  const totalTracks = uniqueTracks.length;

  uniqueTracks.forEach((track, index) => {
    if (!track || !track.album) return;

    const album = track.album;
    const albumId = album.id;
    
    const score = totalTracks - index;

    if (!albumMap[albumId]) {
      albumMap[albumId] = {
        id: albumId,
        name: album.name,
        artist: album.artists[0].name,
        image: album.images[1]?.url || album.images[0]?.url,
        totalScore: 0, 
        tracksCount: 0 
      };
    }

    albumMap[albumId].totalScore += score;
    albumMap[albumId].tracksCount += 1;
  });

  return Object.values(albumMap)
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 50);
};