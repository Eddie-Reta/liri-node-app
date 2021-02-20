// console.log('this is loaded');
exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

exports.movie = {
    secret: process.env.OMDB_SECRET
}

exports.band = {
    secret: process.env.BAND_ID
}