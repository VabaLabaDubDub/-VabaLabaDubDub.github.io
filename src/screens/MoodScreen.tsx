import React, { useMemo, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import Chip from '@/components/Chip';
import { getAlbumById } from '@/services/MusicService';
import { MoodType } from '@/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

const MOODS: MoodType[] = ['энергичный', 'меланхоличный', 'романтичный', 'спокойный', 'праздничный', 'задумчивый'];

export default function MoodScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Mood'>) {
	const album = useMemo(() => getAlbumById(route.params.albumId), [route.params.albumId]);
	const [mood, setMood] = useState<MoodType>(album?.defaultMood ?? 'спокойный');

	if (!album) return null;

	return (
		<View style={{ flex: 1 }}>
			<Image source={{ uri: album.coverUrl }} style={{ width: '100%', height: 220 }} />
			<View style={{ padding: 16 }}>
				<Text style={{ fontSize: 18, fontWeight: '700' }}>{album.title}</Text>
				<Text style={{ opacity: 0.7 }}>{album.artist}</Text>
				<Text style={{ marginTop: 12, fontWeight: '600' }}>Выберите настроение</Text>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
					{MOODS.map(m => (
						<Chip key={m} label={m} selected={m === mood} onPress={() => setMood(m)} />
					))}
				</View>
				<Chip label="Далее к рекомендациям" selected onPress={() => navigation.navigate('Recommendations', { recommendationId: `${album.id}__${mood}` })} />
			</View>
		</View>
	);
}