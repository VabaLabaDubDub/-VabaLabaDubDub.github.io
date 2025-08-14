import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import SearchBar from '@/components/SearchBar';
import AlbumCard from '@/components/AlbumCard';
import { searchAlbums } from '@/services/MusicService';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useStoreContext } from '@/store/StoreProvider';

export default function MusicScreen() {
	const [query, setQuery] = useState('');
	const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const results = useMemo(() => searchAlbums(query), [query]);
	const { favorites } = useStoreContext();
	const favoriteCount = favorites.albums.length;

	return (
		<View style={{ flex: 1, padding: 16 }}>
			<SearchBar value={query} onChangeText={setQuery} placeholder="Искать группу/альбом" />
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
				<Text style={{ fontSize: 18, fontWeight: '700' }}>Альбомы</Text>
				<Pressable onPress={() => nav.navigate('History')}>
					<Text style={{ color: '#2563eb', fontWeight: '600' }}>История</Text>
				</Pressable>
			</View>
			<FlatList
				data={results}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<AlbumCard album={item} onPress={() => nav.navigate('Mood', { albumId: item.id })} />
				)}
				ListHeaderComponent={favoriteCount ? (
					<View style={{ marginBottom: 12 }}>
						<Text style={{ fontWeight: '600' }}>Избранное: {favoriteCount}</Text>
					</View>
				) : null}
				contentContainerStyle={{ paddingBottom: 24 }}
			/>
		</View>
	);
}