import React from 'react';
import { Pressable, useColorScheme } from 'react-native';
import { useStoreContext } from '@/store/StoreProvider';
import { Ionicons } from '@expo/vector-icons';

export function ThemeToggle() {
	const { preferences, setTheme } = useStoreContext();
	const system = useColorScheme();
	const effective = preferences.theme === 'system' ? (system ?? 'light') : preferences.theme;
	const next = effective === 'dark' ? 'light' : 'dark';
	return (
		<Pressable onPress={() => setTheme(next)} hitSlop={12} accessible accessibilityLabel="Toggle theme">
			<Ionicons name={effective === 'dark' ? 'moon' : 'sunny'} size={20} />
		</Pressable>
	);
}