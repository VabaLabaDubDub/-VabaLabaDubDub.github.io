import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';

interface Props {
	label: string;
	selected?: boolean;
	onPress?: () => void;
	style?: ViewStyle;
}

export default function Chip({ label, selected, onPress, style }: Props) {
	return (
		<Pressable onPress={onPress} style={[{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: selected ? '#111' : '#d4d4d8', backgroundColor: selected ? '#111' : 'transparent', marginRight: 8, marginBottom: 8 }, style]}>
			<Text style={{ color: selected ? '#fff' : '#111', fontSize: 13 }}>{label}</Text>
		</Pressable>
	);
}