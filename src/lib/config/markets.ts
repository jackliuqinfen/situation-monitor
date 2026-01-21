/**
 * Market configuration - sectors, commodities, stocks
 */

export interface SectorConfig {
	symbol: string;
	name: string;
}

export interface CommodityConfig {
	symbol: string;
	name: string;
	display: string;
}

export const SECTORS: SectorConfig[] = [
	{ symbol: 'XLK', name: '科技' },
	{ symbol: 'XLF', name: '金融' },
	{ symbol: 'XLE', name: '能源' },
	{ symbol: 'XLV', name: '医疗' },
	{ symbol: 'XLY', name: '消费' },
	{ symbol: 'XLI', name: '工业' },
	{ symbol: 'XLP', name: '必需品' },
	{ symbol: 'XLU', name: '公用事业' },
	{ symbol: 'XLB', name: '材料' },
	{ symbol: 'XLRE', name: '房地产' },
	{ symbol: 'XLC', name: '通讯' },
	{ symbol: 'SMH', name: '半导体' }
];

export const COMMODITIES: CommodityConfig[] = [
	{ symbol: '^VIX', name: 'VIX', display: 'VIX' },
	{ symbol: 'GC=F', name: '黄金', display: 'GOLD' },
	{ symbol: 'CL=F', name: '原油', display: 'OIL' },
	{ symbol: 'NG=F', name: '天然气', display: 'NATGAS' },
	{ symbol: 'SI=F', name: '白银', display: 'SILVER' },
	{ symbol: 'HG=F', name: '铜', display: 'COPPER' }
];

// Major stock indices
export const INDICES = [
	{ symbol: '^DJI', name: '道琼斯', display: 'DOW' },
	{ symbol: '^GSPC', name: '标普500', display: 'S&P' },
	{ symbol: '^IXIC', name: '纳斯达克', display: 'NDQ' },
	{ symbol: '^RUT', name: '罗素2000', display: 'RUT' }
];

// Crypto assets tracked
export const CRYPTO = [
	{ id: 'bitcoin', symbol: 'BTC', name: '比特币' },
	{ id: 'ethereum', symbol: 'ETH', name: '以太坊' },
	{ id: 'solana', symbol: 'SOL', name: '索拉纳' }
];
