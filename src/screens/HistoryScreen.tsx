import React from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { useStoreContext } from '@/store/StoreProvider';
import { getAlbumById } from '@/services/MusicService';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

export default function HistoryScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'History'>) {
	const { history, clearHistory } = useStoreContext();

	return (
		<View style={{ flex: 1, padding: 16 }}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
				<Text style={{ fontSize: 18, fontWeight: '700' }}>История</Text>
				<Pressable onPress={() => {
					Alert.alert('Очистить историю?', 'Действие нельзя отменить', [
						{ text: 'Отмена', style: 'cancel' },
						{ text: 'Очистить', style: 'destructive', onPress: clearHistory },
					]);
				}}>
					<Text style={{ color: '#ef4444', fontWeight: '600' }}>Очистить</Text>
				</Pressable>
			</View>
			<FlatList
				data={history}
				keyExtractor={(i) => i.id}
				renderItem={({ item }) => {
					const album = getAlbumById(item.albumId);
					if (!album) return null;
					return (
						<Pressable onPress={() => navigation.navigate('Recommendations', { recommendationId: `${album.id}__${item.mood}` })} style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
							<Text style={{ fontWeight: '600' }}>{album.artist} — {album.title}</Text>
							<Text style={{ opacity: 0.7 }}>Настроение: {item.mood} • {new Date(item.createdAtIso).toLocaleString()}</Text>
						</Pressable>
					);
				}}
			/>
		</View>
	);
}