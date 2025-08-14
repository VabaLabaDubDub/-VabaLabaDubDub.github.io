import React, { useMemo } from 'react';
import { ScrollView, View, Text, Image, Pressable, Share, Linking, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { DRINKS } from '@/data/drinks';
import { FOODS } from '@/data/foods';
import { FoodItem } from '@/types';
import { useStoreContext } from '@/store/StoreProvider';
import { getAlbumById, buildSpotifySearchUrl } from '@/services/MusicService';

export default function ItemDetailsScreen({ route }: NativeStackScreenProps<RootStackParamList, 'ItemDetails'>) {
	const { itemId, itemType, recommendationId } = route.params;
	const item = useMemo(() => itemType === 'drink' ? DRINKS.find(d => d.id === itemId) : FOODS.find(f => f.id === itemId), [itemId, itemType]);
	const { preferences } = useStoreContext();
	const albumId = recommendationId.split('__')[0];
	const album = getAlbumById(albumId);
	if (!item) return null;

	const onShare = async () => {
		try {
			await Share.share({ message: `Попробуй «${item.name}» под альбом ${album?.artist} — ${album?.title}!` });
		} catch {}
	};

	const renderRecipe = (food: FoodItem) => {
		if (!food.recipe) return null;
		if (food.isPremiumOnly && !preferences.isPremium) {
			return (
				<Pressable onPress={() => Alert.alert('Премиум', 'Оформите премиум, чтобы открыть необычные рецепты')} style={{ marginTop: 12 }}>
					<Text style={{ color: '#2563eb', fontWeight: '600' }}>Открыть премиум-рецепт</Text>
				</Pressable>
			);
		}
		return (
			<View style={{ marginTop: 12 }}>
				<Text style={{ fontWeight: '700' }}>Рецепт</Text>
				<Text style={{ marginTop: 4, fontWeight: '600' }}>Ингредиенты</Text>
				{food.recipe.ingredients.map((i, idx) => (
					<Text key={idx} style={{ opacity: 0.85 }}>• {i}</Text>
				))}
				<Text style={{ marginTop: 6, fontWeight: '600' }}>Шаги</Text>
				{food.recipe.steps.map((s, idx) => (
					<Text key={idx} style={{ opacity: 0.85 }}>{idx + 1}. {s}</Text>
				))}
			</View>
		);
	};

	return (
		<ScrollView contentContainerStyle={{ padding: 16 }}>
			<Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 240, borderRadius: 12 }} />
			<Text style={{ fontSize: 20, fontWeight: '700', marginTop: 12 }}>{item.name}</Text>
			<Text style={{ marginTop: 6, opacity: 0.8 }}>{item.description}</Text>
			<View style={{ flexDirection: 'row', marginTop: 12 }}>
				<Pressable onPress={onShare}>
					<Text style={{ color: '#2563eb', fontWeight: '600', marginRight: 16 }}>Поделиться</Text>
				</Pressable>
				{!!album && (
					<Pressable onPress={() => Linking.openURL(buildSpotifySearchUrl(album))}>
						<Text style={{ color: '#1DB954', fontWeight: '600' }}>Открыть альбом в Spotify</Text>
					</Pressable>
				)}
			</View>

			{itemType === 'food' ? renderRecipe(item as FoodItem) : null}
		</ScrollView>
	);
}