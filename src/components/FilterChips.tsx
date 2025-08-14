import React from 'react';
import { View } from 'react-native';
import Chip from './Chip';

interface Props {
	alcoholic: 'all' | 'alcoholic' | 'nonAlcoholic';
	onAlcoholicChange: (v: 'all' | 'alcoholic' | 'nonAlcoholic') => void;
	complexity: 'all' | 'light' | 'complex';
	onComplexityChange: (v: 'all' | 'light' | 'complex') => void;
}

export default function FilterChips({ alcoholic, onAlcoholicChange, complexity, onComplexityChange }: Props) {
	return (
		<View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 }}>
			<Chip label="Все напитки" selected={alcoholic === 'all'} onPress={() => onAlcoholicChange('all')} />
			<Chip label="Алкогольные" selected={alcoholic === 'alcoholic'} onPress={() => onAlcoholicChange('alcoholic')} />
			<Chip label="Безалкогольные" selected={alcoholic === 'nonAlcoholic'} onPress={() => onAlcoholicChange('nonAlcoholic')} />
			<Chip label="Все закуски" selected={complexity === 'all'} onPress={() => onComplexityChange('all')} style={{ marginLeft: 8 }} />
			<Chip label="Лёгкие" selected={complexity === 'light'} onPress={() => onComplexityChange('light')} />
			<Chip label="Сложные" selected={complexity === 'complex'} onPress={() => onComplexityChange('complex')} />
		</View>
	);
}