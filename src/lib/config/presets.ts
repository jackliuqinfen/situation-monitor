/**
 * Onboarding presets for first-time users
 */

import type { PanelId } from './panels';

export interface Preset {
	id: string;
	name: string;
	icon: string;
	description: string;
	panels: PanelId[];
}

export const PRESETS: Record<string, Preset> = {
	'news-junkie': {
		id: 'news-junkie',
		name: '新闻狂热者',
		icon: '📰',
		description: '实时掌握政治、科技和金融领域的突发新闻',
		panels: ['politics', 'tech', 'finance', 'gov', 'ai', 'mainchar', 'map']
	},
	trader: {
		id: 'trader',
		name: '交易员',
		icon: '📈',
		description: '聚焦市场的仪表板，涵盖股票、加密货币和大宗商品',
		panels: [
			'markets',
			'heatmap',
			'commodities',
			'crypto',
			'polymarket',
			'whales',
			'printer',
			'finance',
			'map'
		]
	},
	geopolitics: {
		id: 'geopolitics',
		name: '地缘政治观察者',
		icon: '🌍',
		description: '全球态势感知与地区热点监控',
		panels: [
			'map',
			'intel',
			'leaders',
			'politics',
			'gov',
			'venezuela',
			'greenland',
			'iran',
			'correlation',
			'narrative'
		]
	},
	intel: {
		id: 'intel',
		name: '情报分析师',
		icon: '🔍',
		description: '深度分析、模式检测与叙事追踪',
		panels: ['map', 'intel', 'leaders', 'correlation', 'narrative', 'mainchar', 'politics']
	},
	'ai-influencer': {
		id: 'ai-influencer',
		name: 'AI 领域博主',
		icon: '🤖',
		description: '追踪 AI 趋势、科技新闻、裁员动态及核心人物',
		panels: [
			'ai',
			'tech',
			'mainchar',
			'layoffs',
			'narrative',
			'polymarket',
			'heatmap',
			'monitors'
		]
	},
	'fund-investor': {
		id: 'fund-investor',
		name: '基金股票投资者',
		icon: '📊',
		description: '宏观经济、美联储政策、市场行情及相关性分析',
		panels: [
			'markets',
			'heatmap',
			'finance',
			'fed',
			'commodities',
			'printer',
			'correlation',
			'gov'
		]
	},
	minimal: {
		id: 'minimal',
		name: '极简模式',
		icon: '⚡',
		description: '仅保留核心功能 - 地图、新闻和市场',
		panels: ['map', 'politics', 'markets']
	},
	everything: {
		id: 'everything',
		name: '全功能模式',
		icon: '🎛️',
		description: '全开 - 启用所有面板',
		panels: [
			'map',
			'politics',
			'tech',
			'finance',
			'gov',
			'heatmap',
			'markets',
			'monitors',
			'commodities',
			'crypto',
			'polymarket',
			'whales',
			'mainchar',
			'printer',
			'contracts',
			'ai',
			'layoffs',
			'venezuela',
			'greenland',
			'iran',
			'leaders',
			'intel',
			'correlation',
			'narrative'
		]
	}
};

export const PRESET_ORDER = [
	'news-junkie',
	'trader',
	'geopolitics',
	'intel',
	'ai-influencer',
	'fund-investor',
	'minimal',
	'everything'
];

// Storage keys
export const ONBOARDING_STORAGE_KEY = 'onboardingComplete';
export const PRESET_STORAGE_KEY = 'selectedPreset';
