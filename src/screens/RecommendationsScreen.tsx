import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useStoreContext } from '@/store/StoreProvider';
import { getAlbumById } from '@/services/MusicService';
import { buildRecommendationId, generateRecommendation, generatePremiumInsights, generateSetlist } from '@/services/AIService';
import FilterChips from '@/components/FilterChips';
import ItemCard from '@/components/ItemCard';

export default function RecommendationsScreen() {
	const route = useRoute<any>();
	const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { preferences, saveRecommendationToCache, getRecommendationFromCache, addHistoryEntry, setPreferences, upgradeToPremium } = useStoreContext();

	const recommendationId: string = route.params?.recommendationId;
	const [filters, setFilters] = useState({ alcoholic: 'all' as 'all' | 'alcoholic' | 'nonAlcoholic', complexity: 'all' as 'all' | 'light' | 'complex' });

	const [data, setData] = useState(() => getRecommendationFromCache(recommendationId));

	useEffect(() => {
		if (data) return;
		const [albumId, mood] = recommendationId.split('__');
		const album = getAlbumById(albumId);
		if (!album) return;
		const rec = generateRecommendation(album, mood as any, preferences);
		saveRecommendationToCache(rec);
		setData(rec);
		addHistoryEntry({ id: `${Date.now()}`, createdAtIso: new Date().toISOString(), albumId: album.id, mood: mood as any });
	}, [recommendationId]);

	const album = useMemo(() => (data ? getAlbumById(data.albumId) : undefined), [data]);

	const filteredDrinks = useMemo(() => {
		if (!data) return [];
		return data.drinks.filter(d => {
			if (filters.alcoholic === 'alcoholic' && !d.alcoholic) return false;
			if (filters.alcoholic === 'nonAlcoholic' && d.alcoholic) return false;
			return true;
		});
	}, [data, filters]);

	const filteredFoods = useMemo(() => {
		if (!data) return [];
		return data.foods.filter(f => {
			if (filters.complexity === 'light' && f.complexity !== 'легкая') return false;
			if (filters.complexity === 'complex' && f.complexity !== 'сложная') return false;
			return true;
		});
	}, [data, filters]);

	if (!data || !album) return null;

	const premiumInsights = preferences.isPremium ? generatePremiumInsights(album, data.mood) : null;
	const setlist = preferences.isPremium ? generateSetlist(album, data.mood) : null;

	return (
		<ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
			<Text style={{ fontSize: 18, fontWeight: '700' }}>{album.title} — {album.artist}</Text>
			<Text style={{ marginTop: 4, opacity: 0.8 }}>Настроение: {data.mood}. Сезон: {data.season}</Text>
			<Text style={{ marginTop: 12 }}>{data.philosophy}</Text>
			<Text style={{ marginTop: 6, opacity: 0.9 }}>{data.explanation}</Text>

			{!preferences.isPremium ? (
				<Pressable onPress={upgradeToPremium} style={{ marginTop: 12 }}>
					<Text style={{ color: '#2563eb', fontWeight: '700' }}>Оформить Премиум: необычные блюда и расширенный разбор</Text>
				</Pressable>
			) : (
				<View style={{ marginTop: 12 }}>
					<Text style={{ fontWeight: '700' }}>Расширенный разбор</Text>
					<Text style={{ marginTop: 4 }}>{premiumInsights}</Text>
					<Text style={{ marginTop: 10, fontWeight: '700' }}>Музыкальный сет</Text>
					{setlist?.map((s, i) => (
						<Text key={i} style={{ opacity: 0.9 }}>{i + 1}. {s.title} — {s.note}</Text>
					))}
				</View>
			)}

			<FilterChips
				alcoholic={filters.alcoholic}
				onAlcoholicChange={v => {
					setFilters(prev => ({ ...prev, alcoholic: v }));
					setPreferences({ alcoholicPreference: v === 'all' ? 'either' : (v as any) });
				}}
				complexity={filters.complexity}
				onComplexityChange={v => {
					setFilters(prev => ({ ...prev, complexity: v }));
					setPreferences({ snackPreference: v === 'all' ? 'either' : (v as any) });
				}}
			/>

			<Text style={{ marginTop: 12, fontWeight: '700' }}>Напитки</Text>
			{filteredDrinks.map(drink => (
				<ItemCard key={drink.id} item={drink} type="drink" onPress={() => nav.navigate('ItemDetails', { itemId: drink.id, itemType: 'drink', recommendationId })} />
			))}

			<Text style={{ marginTop: 12, fontWeight: '700' }}>Закуски</Text>
			{filteredFoods.map(food => (
				<ItemCard key={food.id} item={food} type="food" onPress={() => nav.navigate('ItemDetails', { itemId: food.id, itemType: 'food', recommendationId })} />
			))}
		</ScrollView>
	);
}