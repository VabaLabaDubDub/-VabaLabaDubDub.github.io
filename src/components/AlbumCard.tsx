import React from 'react';
import { View, Image, Text, Pressable, Linking } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Album } from '@/types';
import { useStoreContext } from '@/store/StoreProvider';
import { buildSpotifySearchUrl } from '@/services/MusicService';

interface Props {
	album: Album;
	onPress?: () => void;
}

export default function AlbumCard({ album, onPress }: Props) {
	const { favorites, toggleFavorite } = useStoreContext();
	const isFav = favorites.albums.includes(album.id);
	return (
		<Pressable onPress={onPress} style={{ borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#e5e5e5', marginBottom: 12 }}>
			<View>
				<Image source={{ uri: album.coverUrl }} style={{ width: '100%', height: 160 }} />
				<Pressable onPress={() => toggleFavorite('albums', album.id)} style={{ position: 'absolute', top: 8, right: 8 }} hitSlop={10}>
					<Ionicons name={isFav ? 'star' : 'star-outline'} size={20} color={isFav ? '#f5b301' : undefined} />
				</Pressable>
			</View>
			<View style={{ padding: 12 }}>
				<Text style={{ fontSize: 16, fontWeight: '600' }}>{album.title}</Text>
				<Text style={{ opacity: 0.7, marginTop: 2 }}>{album.artist}</Text>
				<View style={{ flexDirection: 'row', marginTop: 8 }}>
					<Pressable onPress={() => Linking.openURL(buildSpotifySearchUrl(album))} style={{ flexDirection: 'row', alignItems: 'center' }}>
						<FontAwesome name="spotify" size={16} color="#1DB954" />
						<Text style={{ marginLeft: 6, color: '#1DB954', fontWeight: '500' }}>Открыть в Spotify</Text>
					</Pressable>
				</View>
			</View>
		</Pressable>
	);
}