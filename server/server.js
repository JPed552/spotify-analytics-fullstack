require('dotenv').config();
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(express.json());

const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

app.post('/login', (req, res) => {
    const scopes = [
        'user-read-private',
        'user-read-email',
        'user-top-read'
    ];   
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    res.json({ url: authorizeURL });
});

app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    spotifyApi.authorizationCodeGrant(code)
        .then(data => {
            const accessToken = data.body.access_token;
            const refreshToken = data.body.refresh_token;
            const expiresIn = data.body.expires_in;

            res.redirect(`http://localhost:5173/?accessToken=${accessToken}&refreshToken=${refreshToken}&expiresIn=${expiresIn}`);
        })
        .catch(err => {
            console.error('Erro ao autenticar:', err);
            res.redirect('http://localhost:5173/');
        });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});