import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder }: Props) {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: '#ccc', marginVertical: 8 }}>
			<Ionicons name="search" size={18} style={{ marginRight: 8 }} />
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder ?? 'Поиск'}
				style={{ flex: 1, height: 36 }}
				returnKeyType="search"
			/>
			{value?.length ? (
				<Pressable onPress={() => onChangeText('')} hitSlop={12}>
					<Ionicons name="close-circle" size={18} />
				</Pressable>
			) : null}
		</View>
	);
}