/**
 * World Leaders configuration for tracking
 */

import type { WorldLeader } from '$lib/types';

export const WORLD_LEADERS: WorldLeader[] = [
	// United States
	{
		id: 'trump',
		name: '唐纳德·特朗普',
		title: '总统',
		country: '美国',
		flag: '🇺🇸',
		keywords: ['trump', 'potus', 'white house', '特朗普', '川普', '白宫'],
		since: '2025年1月',
		party: '共和党',
		focus: ['关税', '移民', '放松管制']
	},
	{
		id: 'vance',
		name: 'JD 万斯',
		title: '副总统',
		country: '美国',
		flag: '🇺🇸',
		keywords: ['jd vance', 'vice president vance', '万斯', '副总统'],
		since: '2025年1月',
		party: '共和党'
	},

	// China
	{
		id: 'xi',
		name: '习近平',
		title: '国家主席',
		country: '中国',
		flag: '🇨🇳',
		keywords: ['xi jinping', 'xi', 'chinese president', '习近平', '习主席'],
		since: '2013年3月',
		party: '中国共产党',
		focus: ['台湾', '一带一路', '科技主导']
	},

	// Russia
	{
		id: 'putin',
		name: '弗拉基米尔·普京',
		title: '总统',
		country: '俄罗斯',
		flag: '🇷🇺',
		keywords: ['putin', 'kremlin', 'russian president', '普京', '克里姆林宫'],
		since: '2012年5月',
		party: '统一俄罗斯党',
		focus: ['俄乌战争', '北约扩张', '能源']
	},

	// Europe
	{
		id: 'starmer',
		name: '基尔·斯塔默',
		title: '首相',
		country: '英国',
		flag: '🇬🇧',
		keywords: ['starmer', 'uk pm', 'british prime minister', '斯塔默', '英国首相'],
		since: '2024年7月',
		party: '工党'
	},
	{
		id: 'macron',
		name: '埃马纽埃尔·马克龙',
		title: '总统',
		country: '法国',
		flag: '🇫🇷',
		keywords: ['macron', 'french president', 'elysee', '马克龙', '法国总统', '爱丽舍宫'],
		since: '2017年5月',
		party: '复兴党'
	},
	{
		id: 'scholz',
		name: '奥拉夫·朔尔茨',
		title: '总理',
		country: '德国',
		flag: '🇩🇪',
		keywords: ['scholz', 'german chancellor', 'berlin', '朔尔茨', '德国总理'],
		since: '2021年12月',
		party: '社民党'
	},
	{
		id: 'meloni',
		name: '乔治亚·梅洛尼',
		title: '总理',
		country: '意大利',
		flag: '🇮🇹',
		keywords: ['meloni', 'italian pm', 'italy prime minister', '梅洛尼', '意大利总理'],
		since: '2022年10月',
		party: '意大利兄弟党'
	},

	// Middle East
	{
		id: 'netanyahu',
		name: '本雅明·内塔尼亚胡',
		title: '总理',
		country: '以色列',
		flag: '🇮🇱',
		keywords: ['netanyahu', 'bibi', 'israeli pm', '内塔尼亚胡', '以色列总理'],
		since: '2022年12月',
		party: '利库德集团',
		focus: ['加沙', '伊朗', '司法改革']
	},
	{
		id: 'mbs',
		name: '穆罕默德·本·萨勒曼',
		title: '王储',
		country: '沙特阿拉伯',
		flag: '🇸🇦',
		keywords: ['mbs', 'saudi crown prince', 'bin salman', '穆罕默德·本·萨勒曼', '沙特王储'],
		since: '2017年6月',
		party: '王室',
		focus: ['2030愿景', '石油', '地区影响力']
	},
	{
		id: 'khamenei',
		name: '阿里·哈梅内伊',
		title: '最高领袖',
		country: '伊朗',
		flag: '🇮🇷',
		keywords: ['khamenei', 'supreme leader', 'ayatollah', '哈梅内伊', '最高领袖'],
		since: '1989年6月',
		party: '伊斯兰共和国',
		focus: ['核计划', '代理人', '制裁']
	},

	// Asia-Pacific
	{
		id: 'modi',
		name: '纳伦德拉·莫迪',
		title: '总理',
		country: '印度',
		flag: '🇮🇳',
		keywords: ['modi', 'indian pm', 'india prime minister', '莫迪', '印度总理'],
		since: '2014年5月',
		party: '印度人民党',
		focus: ['经济', '中印边境', '科技']
	},
	{
		id: 'kim',
		name: '金正恩',
		title: '最高领袖',
		country: '朝鲜',
		flag: '🇰🇵',
		keywords: ['kim jong un', 'north korea', 'pyongyang', '金正恩', '朝鲜', '平壤'],
		since: '2011年12月',
		party: '劳动党',
		focus: ['核武', '导弹', '俄朝联盟']
	},
	{
		id: 'ishiba',
		name: '石破茂',
		title: '首相',
		country: '日本',
		flag: '🇯🇵',
		keywords: ['ishiba', 'japanese pm', 'japan prime minister', '石破茂', '日本首相'],
		since: '2024年10月',
		party: '自民党',
		focus: ['国防', '中国', '美日同盟']
	},
	{
		id: 'lai',
		name: '赖清德',
		title: '总统',
		country: '台湾',
		flag: '🇹🇼',
		keywords: ['lai ching-te', 'taiwan president', 'taipei', '赖清德', '台湾总统'],
		since: '2024年5月',
		party: '民进党',
		focus: ['两岸关系', '国防', '半导体']
	},

	// Ukraine
	{
		id: 'zelensky',
		name: '弗拉基米尔·泽连斯基',
		title: '总统',
		country: '乌克兰',
		flag: '🇺🇦',
		keywords: ['zelensky', 'ukraine president', 'kyiv', '泽连斯基', '乌克兰总统', '基辅'],
		since: '2019年5月',
		party: '人民公仆党',
		focus: ['战争', '西方援助', '加入北约']
	},

	// Latin America
	{
		id: 'milei',
		name: '哈维尔·米莱',
		title: '总统',
		country: '阿根廷',
		flag: '🇦🇷',
		keywords: ['milei', 'argentina president', 'buenos aires', '米莱', '阿根廷总统'],
		since: '2023年12月',
		party: '自由前进党',
		focus: ['美元化', '削减开支', '放松管制']
	},
	{
		id: 'lula',
		name: '卢拉·达席尔瓦',
		title: '总统',
		country: '巴西',
		flag: '🇧🇷',
		keywords: ['lula', 'brazil president', 'brasilia', '卢拉', '巴西总统'],
		since: '2023年1月',
		party: '劳工党',
		focus: ['亚马逊', '社会项目', '金砖国家']
	},

	// Canada
	{
		id: 'carney',
		name: '马克·卡尼',
		title: '总理',
		country: '加拿大',
		flag: '🇨🇦',
		keywords: ['carney', 'canadian pm', 'canada prime minister', 'ottawa', '马克·卡尼', '加拿大总理'],
		since: '2025年3月',
		party: '自由党',
		focus: ['关税', '美加关系', '经济']
	}
];
