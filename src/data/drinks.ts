import { DrinkItem } from '../types';

export const DRINKS: DrinkItem[] = [
	{
		id: 'negroni',
		name: 'Негрони',
		alcoholic: true,
		description: 'Горько-сладкий, пряный, насыщенный',
		imageUrl: 'https://images.unsplash.com/photo-1604908554049-20186b5f94b3?q=80&w=600',
		tags: ['горький', 'пряный', 'насыщенный'],
	},
	{
		id: 'prosecco',
		name: 'Просекко',
		alcoholic: true,
		description: 'Искристое, лёгкое, фруктовое',
		imageUrl: 'https://images.unsplash.com/photo-1527960471264-932f39eb5840?q=80&w=600',
		tags: ['искристый', 'лёгкий', 'фруктовый'],
	},
	{
		id: 'matcha-latte',
		name: 'Матча-латте',
		alcoholic: false,
		description: 'Травяной, сливочный, умиротворяющий',
		imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600',
		tags: ['травяной', 'сливочный', 'чистый'],
	},
	{
		id: 'grapefruit-soda',
		name: 'Грейпфрутовая сода',
		alcoholic: false,
		description: 'Яркий, кислый, газированный',
		imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600',
		tags: ['яркий', 'кислый', 'газированный'],
	},
	{
		id: 'oolong-iced-tea',
		name: 'Оолонг айс-ти',
		alcoholic: false,
		description: 'Дымный, ореховый, освежающий',
		imageUrl: 'https://images.unsplash.com/photo-1526404428533-221b1f79eea0?q=80&w=600',
		tags: ['дымный', 'ореховый', 'чистый'],
	}
];