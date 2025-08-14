import { Album } from '../types';
import { ALBUMS } from '../data/music';

export function searchAlbums(query: string): Album[] {
	const q = query.trim().toLowerCase();
	if (!q) return ALBUMS;
	return ALBUMS.filter(a => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q));
}

export function getAlbumById(id: string): Album | undefined {
	return ALBUMS.find(a => a.id === id);
}

export function buildSpotifySearchUrl(album: Album): string {
	const q = album.spotifyQuery ?? `${album.artist} ${album.title}`;
	return `https://open.spotify.com/search/${encodeURIComponent(q)}`;
}