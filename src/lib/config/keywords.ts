/**
 * Keyword configuration for alerts and categorization
 */

export const ALERT_KEYWORDS = [
	'war',
	'invasion',
	'military',
	'nuclear',
	'sanctions',
	'missile',
	'attack',
	'troops',
	'conflict',
	'strike',
	'bomb',
	'casualties',
	'ceasefire',
	'treaty',
	'nato',
	'coup',
	'martial law',
	'emergency',
	'assassination',
	'terrorist',
	'hostage',
	'evacuation',
	// Chinese keywords
	'战争',
	'入侵',
	'军事',
	'核',
	'制裁',
	'导弹',
	'袭击',
	'军队',
	'冲突',
	'打击',
	'炸弹',
	'伤亡',
	'停火',
	'条约',
	'北约',
	'政变',
	'戒严',
	'紧急',
	'暗杀',
	'恐怖分子',
	'人质',
	'撤离'
] as const;

export type AlertKeyword = (typeof ALERT_KEYWORDS)[number];

export const REGION_KEYWORDS: Record<string, string[]> = {
	EUROPE: [
		'nato',
		'eu',
		'european',
		'ukraine',
		'russia',
		'germany',
		'france',
		'uk',
		'britain',
		'poland',
		'北约',
		'欧盟',
		'欧洲',
		'乌克兰',
		'俄罗斯',
		'德国',
		'法国',
		'英国',
		'波兰'
	],
	MENA: [
		'iran',
		'israel',
		'saudi',
		'syria',
		'iraq',
		'gaza',
		'lebanon',
		'yemen',
		'houthi',
		'middle east',
		'伊朗',
		'以色列',
		'沙特',
		'叙利亚',
		'伊拉克',
		'加沙',
		'黎巴嫩',
		'也门',
		'胡塞',
		'中东'
	],
	APAC: [
		'china',
		'taiwan',
		'japan',
		'korea',
		'indo-pacific',
		'south china sea',
		'asean',
		'philippines',
		'中国',
		'台湾',
		'日本',
		'韩国',
		'印太',
		'南海',
		'东盟',
		'菲律宾'
	],
	AMERICAS: [
		'us',
		'america',
		'canada',
		'mexico',
		'brazil',
		'venezuela',
		'latin',
		'美国',
		'美洲',
		'加拿大',
		'墨西哥',
		'巴西',
		'委内瑞拉',
		'拉美'
	],
	AFRICA: [
		'africa',
		'sahel',
		'niger',
		'sudan',
		'ethiopia',
		'somalia',
		'非洲',
		'萨赫勒',
		'尼日尔',
		'苏丹',
		'埃塞俄比亚',
		'索马里'
	]
};

export const TOPIC_KEYWORDS: Record<string, string[]> = {
	CYBER: [
		'cyber',
		'hack',
		'ransomware',
		'malware',
		'breach',
		'apt',
		'vulnerability',
		'网络',
		'黑客',
		'勒索软件',
		'恶意软件',
		'漏洞'
	],
	NUCLEAR: [
		'nuclear',
		'icbm',
		'warhead',
		'nonproliferation',
		'uranium',
		'plutonium',
		'核',
		'洲际导弹',
		'弹头',
		'防扩散',
		'铀',
		'钚'
	],
	CONFLICT: [
		'war',
		'military',
		'troops',
		'invasion',
		'strike',
		'missile',
		'combat',
		'offensive',
		'战争',
		'军事',
		'军队',
		'入侵',
		'打击',
		'导弹',
		'战斗',
		'攻势'
	],
	INTEL: [
		'intelligence',
		'espionage',
		'spy',
		'cia',
		'mossad',
		'fsb',
		'covert',
		'情报',
		'间谍',
		'中情局',
		'摩萨德',
		'联邦安全局',
		'秘密'
	],
	DEFENSE: [
		'pentagon',
		'dod',
		'defense',
		'military',
		'army',
		'navy',
		'air force',
		'五角大楼',
		'国防部',
		'防御',
		'军事',
		'陆军',
		'海军',
		'空军'
	],
	DIPLO: [
		'diplomat',
		'embassy',
		'treaty',
		'sanctions',
		'talks',
		'summit',
		'bilateral',
		'外交官',
		'大使馆',
		'条约',
		'制裁',
		'会谈',
		'峰会',
		'双边'
	]
};

/**
 * Check if a headline contains alert keywords
 */
export function containsAlertKeyword(text: string): { isAlert: boolean; keyword?: string } {
	const lowerText = text.toLowerCase();
	for (const keyword of ALERT_KEYWORDS) {
		if (lowerText.includes(keyword)) {
			return { isAlert: true, keyword };
		}
	}
	return { isAlert: false };
}

/**
 * Detect region from text
 */
export function detectRegion(text: string): string | null {
	const lowerText = text.toLowerCase();
	for (const [region, keywords] of Object.entries(REGION_KEYWORDS)) {
		if (keywords.some((k) => lowerText.includes(k))) {
			return region;
		}
	}
	return null;
}

/**
 * Detect topics from text
 */
export function detectTopics(text: string): string[] {
	const lowerText = text.toLowerCase();
	const detected: string[] = [];
	for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
		if (keywords.some((k) => lowerText.includes(k))) {
			detected.push(topic);
		}
	}
	return detected;
}
