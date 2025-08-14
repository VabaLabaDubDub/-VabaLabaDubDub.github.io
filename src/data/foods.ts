import { FoodItem } from '../types';

export const FOODS: FoodItem[] = [
	{
		id: 'bruschetta',
		name: 'Брускетта с томатами',
		complexity: 'легкая',
		description: 'Лёгкая, свежая, травяная',
		imageUrl: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=600',
		tags: ['лёгкий', 'травяной', 'фруктовый'],
	},
	{
		id: 'cheese-board',
		name: 'Сырная тарелка',
		complexity: 'легкая',
		description: 'Слоёные текстуры, ореховые и сливочные ноты',
		imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600',
		tags: ['слоёный', 'ореховый', 'сливочный'],
	},
	{
		id: 'spicy-edamame',
		name: 'Острый эдамаме',
		complexity: 'легкая',
		description: 'Острый, яркий, умами',
		imageUrl: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=600',
		tags: ['острый', 'яркий', 'умами'],
	},
	{
		id: 'miso-cod',
		name: 'Чёрная треска мисо',
		complexity: 'сложная',
		description: 'Умами, тёплая сладость, деликатная текстура',
		imageUrl: 'https://images.unsplash.com/photo-1514512364185-4c2b3f55acd7?q=80&w=600',
		tags: ['умами', 'тёплый', 'слоёный'],
		isPremiumOnly: true,
		recipe: {
			ingredients: [
				'Филе чёрной трески 2 шт',
				'Мисо паста 2 ст. л.',
				'Мирин 2 ст. л.',
				'Соевый соус 1 ст. л.',
				'Сахар 1 ст. л.'
			],
			steps: [
				'Смешать маринад, замариновать рыбу на 30–60 минут',
				'Запекать при 200°C 10–12 минут до карамелизации',
				'Подавать с рисом и зелёным луком'
			]
		}
	},
	{
		id: 'chocolate-mousse-chili',
		name: 'Шоколадный мусс с чили',
		complexity: 'сложная',
		description: 'Горький, пряный, слоистый десерт',
		imageUrl: 'https://images.unsplash.com/photo-1533628635777-112b2239b1c7?q=80&w=600',
		tags: ['горький', 'пряный', 'слоёный'],
		isPremiumOnly: true,
		recipe: {
			ingredients: [
				'Горький шоколад 70% — 200 г',
				'Сливки 33% — 250 мл',
				'Сахар — 2 ст. л.',
				'Кайенский перец — щепотка',
				'Экстракт ванили — 1 ч. л.'
			],
			steps: [
				'Растопить шоколад, взбить сливки',
				'Соединить, добавить специи, охладить 2 часа',
				'Подавать с цитрусовой цедрой'
			]
		}
	}
];