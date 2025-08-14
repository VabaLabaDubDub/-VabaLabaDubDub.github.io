import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Favorites, HistoryEntry, Preferences, Recommendation } from '../types';

interface StoreState {
	preferences: Preferences;
	favorites: Favorites;
	history: HistoryEntry[];
	recCache: Record<string, Recommendation>;

	setTheme: (theme: Preferences['theme']) => void;
	setPreferences: (next: Partial<Preferences>) => void;
	upgradeToPremium: () => void;
	toggleFavorite: (kind: keyof Favorites, id: string) => void;
	saveRecommendationToCache: (rec: Recommendation) => void;
	getRecommendationFromCache: (key: string) => Recommendation | undefined;
	addHistoryEntry: (entry: HistoryEntry) => void;
	clearHistory: () => void;
}

const DEFAULT_PREFERENCES: Preferences = {
	alcoholicPreference: 'either',
	snackPreference: 'either',
	dislikes: [],
	isPremium: false,
	theme: 'system',
};

const DEFAULT_FAVORITES: Favorites = {
	albums: [],
	drinks: [],
	foods: [],
};

const PREFERENCES_KEY = '@prefs';
const FAVORITES_KEY = '@favorites';
const HISTORY_KEY = '@history';
const REC_CACHE_KEY = '@recCache';

const StoreContext = createContext<StoreState | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
	const [preferences, setPreferencesState] = useState<Preferences>(DEFAULT_PREFERENCES);
	const [favorites, setFavorites] = useState<Favorites>(DEFAULT_FAVORITES);
	const [history, setHistory] = useState<HistoryEntry[]>([]);
	const [recCache, setRecCache] = useState<Record<string, Recommendation>>({});

	useEffect(() => {
		(async () => {
			try {
				const [p, f, h, r] = await Promise.all([
					AsyncStorage.getItem(PREFERENCES_KEY),
					AsyncStorage.getItem(FAVORITES_KEY),
					AsyncStorage.getItem(HISTORY_KEY),
					AsyncStorage.getItem(REC_CACHE_KEY),
				]);
				if (p) setPreferencesState(JSON.parse(p));
				if (f) setFavorites(JSON.parse(f));
				if (h) setHistory(JSON.parse(h));
				if (r) setRecCache(JSON.parse(r));
			} catch (e) {
				// ignore
			}
		})();
	}, []);

	useEffect(() => {
		AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences)).catch(() => {});
	}, [preferences]);

	useEffect(() => {
		AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(() => {});
	}, [favorites]);

	useEffect(() => {
		AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history)).catch(() => {});
	}, [history]);

	useEffect(() => {
		AsyncStorage.setItem(REC_CACHE_KEY, JSON.stringify(recCache)).catch(() => {});
	}, [recCache]);

	const setTheme = (theme: Preferences['theme']) => {
		setPreferencesState(prev => ({ ...prev, theme }));
	};

	const setPreferences = (next: Partial<Preferences>) => {
		setPreferencesState(prev => ({ ...prev, ...next }));
	};

	const upgradeToPremium = () => setPreferencesState(prev => ({ ...prev, isPremium: true }));

	const toggleFavorite = (kind: keyof Favorites, id: string) => {
		setFavorites(prev => {
			const list = new Set(prev[kind]);
			if (list.has(id)) list.delete(id); else list.add(id);
			return { ...prev, [kind]: Array.from(list) } as Favorites;
		});
	};

	const saveRecommendationToCache = (rec: Recommendation) => {
		setRecCache(prev => ({ ...prev, [rec.id]: rec }));
	};

	const getRecommendationFromCache = (key: string) => recCache[key];

	const addHistoryEntry = (entry: HistoryEntry) => {
		setHistory(prev => [entry, ...prev].slice(0, 100));
	};

	const clearHistory = () => setHistory([]);

	const value = useMemo<StoreState>(() => ({
		preferences,
		favorites,
		history,
		recCache,
		setTheme,
		setPreferences,
		upgradeToPremium,
		toggleFavorite,
		saveRecommendationToCache,
		getRecommendationFromCache,
		addHistoryEntry,
		clearHistory,
	}), [preferences, favorites, history, recCache]);

	return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStoreContext() {
	const ctx = useContext(StoreContext);
	if (!ctx) throw new Error('useStoreContext must be used within StoreProvider');
	return ctx;
}