import { Album, DrinkItem, FoodItem, MoodType, Preferences, Recommendation } from '../types';
import { DRINKS } from '../data/drinks';
import { FOODS } from '../data/foods';

function monthToSeason(monthIndexZeroBased: number): 'зима' | 'весна' | 'лето' | 'осень' {
	// 0 = Jan
	if ([11, 0, 1].includes(monthIndexZeroBased)) return 'зима';
	if ([2, 3, 4].includes(monthIndexZeroBased)) return 'весна';
	if ([5, 6, 7].includes(monthIndexZeroBased)) return 'лето';
	return 'осень';
}

function scoreByTags<T extends { tags: string[] }>(item: T, mood: MoodType, albumTags: string[], dislikes: string[]): number {
	const moodMap: Record<MoodType, string[]> = {
		энергичный: ['яркий', 'кислый', 'газированный', 'острый'],
		меланхоличный: ['мягкий', 'тёплый', 'землистый', 'умами'],
		романтичный: ['нежный', 'цветочный', 'фруктовый', 'сладкий'],
		спокойный: ['чистый', 'лёгкий', 'сливочный', 'миндальный'],
		праздничный: ['искристый', 'слоёный', 'насыщенный', 'пряный'],
		задумчивый: ['дымный', 'горький', 'ореховый', 'травяной'],
	};
	const positive = new Set([...moodMap[mood], ...albumTags]);
	const negative = new Set(dislikes.map(d => d.toLowerCase()));
	let score = 0;
	for (const t of item.tags) {
		if (positive.has(t)) score += 2;
		if (negative.has(t)) score -= 3;
	}
	return score;
}

function filterByPreferences(drinks: DrinkItem[], foods: FoodItem[], prefs: Preferences) {
	let filteredDrinks = drinks;
	let filteredFoods = foods;
	if (prefs.alcoholicPreference !== 'either') {
		filteredDrinks = drinks.filter(d => prefs.alcoholicPreference === 'alcoholic' ? d.alcoholic : !d.alcoholic);
	}
	if (prefs.snackPreference !== 'either') {
		filteredFoods = foods.filter(f => prefs.snackPreference === 'light' ? f.complexity === 'легкая' : f.complexity === 'сложная');
	}
	return { filteredDrinks, filteredFoods };
}

export function buildRecommendationId(albumId: string, mood: MoodType) {
	return `${albumId}__${mood}`;
}

export function generateRecommendation(album: Album, mood: MoodType, preferences: Preferences): Recommendation {
	const season = monthToSeason(new Date().getMonth());
	const { filteredDrinks, filteredFoods } = filterByPreferences(DRINKS, FOODS, preferences);

	const drinksSorted = [...filteredDrinks]
		.sort((a, b) => scoreByTags(b, mood, album.tags, preferences.dislikes) - scoreByTags(a, mood, album.tags, preferences.dislikes))
		.slice(0, 6);
	const foodsSorted = [...filteredFoods]
		.sort((a, b) => scoreByTags(b, mood, album.tags, preferences.dislikes) - scoreByTags(a, mood, album.tags, preferences.dislikes))
		.slice(0, 6);

	const philosophy = `Почему этот альбом цепляет: ${album.title} от ${album.artist} — это ${mood.toLowerCase()} настроение, отражённое в тембрах и ритмике. В нём слышатся теги: ${album.tags.slice(0, 4).join(', ')}.`;
	const explanation = `Комбинации подобраны по соответствию настроению «${mood}» и тегам альбома. Напитки и закуски усиливают ключевые ощущения (например: ${album.tags.slice(0, 2).join(' / ')}), избегая ваших анти-предпочтений.`;

	return {
		id: buildRecommendationId(album.id, mood),
		albumId: album.id,
		mood,
		drinks: drinksSorted,
		foods: foodsSorted,
		philosophy,
		explanation,
		season,
	};
}

export function generatePremiumInsights(album: Album, mood: MoodType): string {
	const moodToAesthetic: Record<MoodType, string> = {
		энергичный: 'ритмическая импульсивность и синкопы, подталкивающие к движению',
		меланхоличный: 'медленные распады звука и бархатные тембры, создающие ощущение паузы',
		романтичный: 'модальные обороты и тёплая гармония, приближающие интимность',
		спокойный: 'минимализм форм и воздушные паузы, очищающие восприятие',
		праздничный: 'искристые высокие частоты и плотно сведённая ритм-секция',
		задумчивый: 'приглушённые атаки и дымчатая фактура, склоняющая к рефлексии',
	};
	return `Расширенный разбор: ${album.title} — это ${mood.toLowerCase()}, где ${moodToAesthetic[mood]}. Теги альбома (${album.tags.slice(0, 5).join(', ')}) работают как вкусовые маркеры: мы усиливаем их в еде и напитках, чтобы ваше восприятие оставалось целостным.`;
}

export function generateSetlist(album: Album, mood: MoodType): { title: string; note: string }[] {
	const motifs = album.tags.slice(0, 3);
	return [
		{ title: 'Разогрев', note: `инструментальные треки с акцентом на ${motifs[0] ?? 'мягкие тона'}` },
		{ title: 'Основной блок', note: `ключевые композиции альбома, подчёркивающие ${motifs[1] ?? 'ритмическую пульсацию'}` },
		{ title: 'Контраст', note: `несколько более ${mood === 'энергичный' ? 'спокойных' : 'движовых'} треков для динамики` },
		{ title: 'Пик настроения', note: `самые яркие треки, раскрывающие ${motifs[2] ?? 'главный образ'} }` },
		{ title: 'Аутро', note: 'короткое постлюдие для мягкого выхода' },
	];
}