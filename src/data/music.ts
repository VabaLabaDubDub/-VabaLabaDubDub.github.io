import { Album } from '../types';

export const ALBUMS: Album[] = [
	{
		id: 'radiohead-in-rainbows',
		title: 'In Rainbows',
		artist: 'Radiohead',
		coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600',
		defaultMood: 'задумчивый',
		tags: ['умами', 'тёплый', 'дымный', 'землистый', 'слоёный'],
		spotifyQuery: 'Radiohead In Rainbows',
	},
	{
		id: 'daft-punk-discovery',
		title: 'Discovery',
		artist: 'Daft Punk',
		coverUrl: 'https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=600',
		defaultMood: 'праздничный',
		tags: ['искристый', 'яркий', 'газированный', 'сладкий'],
	},
	{
		id: 'billie-eilish-happier',
		title: 'Happier Than Ever',
		artist: 'Billie Eilish',
		coverUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600',
		defaultMood: 'меланхоличный',
		tags: ['мягкий', 'нежный', 'сливочный', 'миндальный'],
	},
	{
		id: 'miles-davis-kind-of-blue',
		title: 'Kind of Blue',
		artist: 'Miles Davis',
		coverUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=600',
		defaultMood: 'спокойный',
		tags: ['чистый', 'лёгкий', 'травяной', 'ореховый'],
	}
];