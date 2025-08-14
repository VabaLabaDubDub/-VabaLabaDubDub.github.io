export type MoodType = 'энергичный' | 'меланхоличный' | 'романтичный' | 'спокойный' | 'праздничный' | 'задумчивый';

export interface Album {
	id: string;
	title: string;
	artist: string;
	coverUrl: string;
	defaultMood?: MoodType;
	tags: string[];
	spotifyQuery?: string;
}

export interface DrinkItem {
	id: string;
	name: string;
	alcoholic: boolean;
	description: string;
	imageUrl: string;
	tags: string[];
}

export type FoodComplexity = 'легкая' | 'сложная';

export interface FoodItem {
	id: string;
	name: string;
	complexity: FoodComplexity;
	description: string;
	imageUrl: string;
	tags: string[];
	isPremiumOnly?: boolean;
	recipe?: {
		ingredients: string[];
		steps: string[];
	};
}

export interface Recommendation {
	id: string;
	albumId: string;
	mood: MoodType;
	drinks: DrinkItem[];
	foods: FoodItem[];
	philosophy: string;
	explanation: string;
	season?: string;
}

export interface HistoryEntry {
	id: string;
	createdAtIso: string;
	albumId: string;
	mood: MoodType;
	selectedDrinkId?: string;
	selectedFoodId?: string;
}

export interface Preferences {
	alcoholicPreference: 'alcoholic' | 'nonAlcoholic' | 'either';
	snackPreference: 'light' | 'complex' | 'either';
	dislikes: string[];
	isPremium: boolean;
	theme: 'light' | 'dark' | 'system';
}

export interface Favorites {
	albums: string[];
	drinks: string[];
	foods: string[];
}

export interface Filters {
	alcoholic: 'all' | 'alcoholic' | 'nonAlcoholic';
	complexity: 'all' | 'light' | 'complex';
}