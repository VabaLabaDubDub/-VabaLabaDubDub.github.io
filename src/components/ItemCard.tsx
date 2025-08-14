import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrinkItem, FoodItem } from '@/types';
import { useStoreContext } from '@/store/StoreProvider';

interface Props {
	item: DrinkItem | FoodItem;
	type: 'drink' | 'food';
	onPress?: () => void;
}

export default function ItemCard({ item, type, onPress }: Props) {
	const { favorites, toggleFavorite } = useStoreContext();
	const isFav = favorites[type === 'drink' ? 'drinks' : 'foods'].includes(item.id);
	return (
		<Pressable onPress={onPress} style={{ borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#e5e5e5', marginBottom: 12 }}>
			<View>
				<Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 140 }} />
				<Pressable onPress={() => toggleFavorite(type === 'drink' ? 'drinks' : 'foods', item.id)} style={{ position: 'absolute', top: 8, right: 8 }} hitSlop={10}>
					<Ionicons name={isFav ? 'heart' : 'heart-outline'} size={20} color={isFav ? '#e91e63' : undefined} />
				</Pressable>
			</View>
			<View style={{ padding: 12 }}>
				<Text style={{ fontSize: 15, fontWeight: '600' }}>{item.name}</Text>
				<Text style={{ opacity: 0.7, marginTop: 2 }} numberOfLines={2}>{item.description}</Text>
				<View style={{ flexDirection: 'row', marginTop: 8, flexWrap: 'wrap' }}>
					{type === 'drink' ? (
						<View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: '#f1f5f9', marginRight: 8, marginBottom: 6 }}>
							<Text style={{ fontSize: 12 }}>{(item as any).alcoholic ? 'Алк.' : 'Безалк.'}</Text>
						</View>
					) : (
						<View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: '#f1f5f9', marginRight: 8, marginBottom: 6 }}>
							<Text style={{ fontSize: 12 }}>{(item as any).complexity === 'легкая' ? 'Лёгкая' : 'Сложная'}</Text>
						</View>
					)}
				</View>
			</View>
		</Pressable>
	);
}