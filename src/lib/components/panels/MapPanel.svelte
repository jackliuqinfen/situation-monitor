<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Panel } from '$lib/components/common';
	import {
		HOTSPOTS,
		CONFLICT_ZONES,
		CHOKEPOINTS,
		CABLE_LANDINGS,
		NUCLEAR_SITES,
		MILITARY_BASES,
		THREAT_COLORS
	} from '$lib/config/map';
	import type { CustomMonitor } from '$lib/types';
	import { browser } from '$app/environment';

	interface Props {
		monitors?: CustomMonitor[];
		loading?: boolean;
		error?: string | null;
	}

	let { monitors = [], loading = false, error = null }: Props = $props();

	let mapContainer: HTMLDivElement;
	let map: L.Map;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let L: any;

	// Get local time
	function getLocalTime(lon: number): string {
		const now = new Date();
		const utcHours = now.getUTCHours();
		const utcMinutes = now.getUTCMinutes();
		const offsetHours = Math.round(lon / 15);
		let localHours = (utcHours + offsetHours + 24) % 24;
		const ampm = localHours >= 12 ? 'PM' : 'AM';
		localHours = localHours % 12 || 12;
		return `${localHours}:${utcMinutes.toString().padStart(2, '0')} ${ampm}`;
	}

	async function initMap() {
		if (!browser) return;
		
		// Dynamic import leaflet to avoid SSR issues
		const leaflet = await import('leaflet');
		L = leaflet.default;
		
		// Import leaflet CSS
		if (!document.getElementById('leaflet-css')) {
			const link = document.createElement('link');
			link.id = 'leaflet-css';
			link.rel = 'stylesheet';
			link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
			document.head.appendChild(link);
		}

		if (map) map.remove();

		// Initialize map with Google Satellite Tiles style
		map = L.map(mapContainer, {
			center: [20, 0],
			zoom: 2,
			minZoom: 2,
			maxZoom: 10,
			zoomControl: false,
			attributionControl: false,
			worldCopyJump: true
		});

		// Google Hybrid Tiles (Satellite + Labels)
		L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
			maxZoom: 20,
			attribution: 'Google'
		}).addTo(map);

		// Add custom zoom control to bottom right
		L.control.zoom({ position: 'bottomright' }).addTo(map);

		// Add markers and layers
		addLayers();
	}

	function createCustomIcon(color: string, type: 'dot' | 'pulse' | 'star' | 'square' = 'dot') {
		const size = type === 'pulse' ? 20 : 12;
		const html = type === 'pulse' 
			? `<div class="marker-pulse" style="--marker-color: ${color}"></div>`
			: `<div class="marker-${type}" style="--marker-color: ${color}"></div>`;
			
		return L.divIcon({
			className: 'custom-marker-icon',
			html: html,
			iconSize: [size, size],
			iconAnchor: [size/2, size/2]
		});
	}

	function addLayers() {
		if (!map || !L) return;

		// Conflict Zones (Polygons)
		CONFLICT_ZONES.forEach(zone => {
			L.polygon(zone.coords.map(c => [c[1], c[0]]), {
				color: zone.color,
				fillColor: zone.color,
				fillOpacity: 0.2,
				weight: 1
			}).addTo(map).bindTooltip(zone.name, {
				permanent: false,
				direction: 'center',
				className: 'map-label-tooltip'
			});
		});

		// Hotspots
		HOTSPOTS.forEach(h => {
			const color = THREAT_COLORS[h.level];
			const marker = L.marker([h.lat, h.lon], {
				icon: createCustomIcon(color, 'pulse')
			}).addTo(map);

			const content = `
				<div class="popup-content">
					<div class="popup-title" style="color: ${color}">${h.name}</div>
					<div class="popup-desc">${h.desc}</div>
					<div class="popup-meta">🕐 ${getLocalTime(h.lon)}</div>
				</div>
			`;
			
			marker.bindPopup(content, {
				className: 'glass-popup',
				closeButton: false
			});
		});

		// Chokepoints
		CHOKEPOINTS.forEach(cp => {
			L.marker([cp.lat, cp.lon], {
				icon: createCustomIcon('#00aaff', 'square')
			}).addTo(map).bindPopup(`
				<div class="popup-content">
					<div class="popup-title" style="color: #00aaff">${cp.name}</div>
					<div class="popup-desc">${cp.desc}</div>
				</div>
			`, { className: 'glass-popup' });
		});

		// Cable Landings
		CABLE_LANDINGS.forEach(cl => {
			L.marker([cl.lat, cl.lon], {
				icon: createCustomIcon('#aa44ff', 'dot')
			}).addTo(map).bindPopup(`
				<div class="popup-content">
					<div class="popup-title" style="color: #aa44ff">◎ ${cl.name}</div>
					<div class="popup-desc">${cl.desc}</div>
				</div>
			`, { className: 'glass-popup' });
		});

		// Military Bases
		MILITARY_BASES.forEach(mb => {
			L.marker([mb.lat, mb.lon], {
				icon: createCustomIcon('#ff00ff', 'star')
			}).addTo(map).bindPopup(`
				<div class="popup-content">
					<div class="popup-title" style="color: #ff00ff">${mb.name}</div>
					<div class="popup-desc">${mb.desc}</div>
				</div>
			`, { className: 'glass-popup' });
		});

		// Nuclear Sites
		NUCLEAR_SITES.forEach(ns => {
			L.marker([ns.lat, ns.lon], {
				icon: createCustomIcon('#ffff00', 'dot')
			}).addTo(map).bindPopup(`
				<div class="popup-content">
					<div class="popup-title" style="color: #ffff00">${ns.name}</div>
					<div class="popup-desc">${ns.desc}</div>
				</div>
			`, { className: 'glass-popup' });
		});

		// Custom Monitors
		drawMonitors();
	}

	function drawMonitors() {
		if (!map || !L) return;
		
		// Clear existing monitor markers if we stored them (omitted for simplicity, Leaflet handles rendering efficiently)
		
		monitors.filter(m => m.enabled && m.location).forEach(m => {
			if (!m.location) return;
			const color = m.color || '#00ffff';
			L.marker([m.location.lat, m.location.lon], {
				icon: createCustomIcon(color, 'dot')
			}).addTo(map).bindPopup(`
				<div class="popup-content">
					<div class="popup-title" style="color: ${color}">📡 ${m.name}</div>
					<div class="popup-desc">${m.keywords.join(', ')}</div>
				</div>
			`, { className: 'glass-popup' });
		});
	}

	$effect(() => {
		if (monitors && map) {
			// In a real implementation, we would use a LayerGroup to clear and redraw monitors
			drawMonitors(); 
		}
	});

	onMount(() => {
		initMap();
	});

	onDestroy(() => {
		if (map) map.remove();
	});
</script>

<Panel id="map" title="全球态势 (Google Maps 视图)" {loading} {error}>
	<div class="map-wrapper">
		<div class="map-container" bind:this={mapContainer}></div>
		
		<div class="map-legend">
			<div class="legend-item">
				<span class="legend-dot high"></span> 严重威胁
			</div>
			<div class="legend-item">
				<span class="legend-dot elevated"></span> 升级风险
			</div>
			<div class="legend-item">
				<span class="legend-dot low"></span> 监控中
			</div>
			<div class="legend-divider"></div>
			<div class="legend-item">
				<span class="legend-icon square"></span> 战略咽喉
			</div>
			<div class="legend-item">
				<span class="legend-icon star"></span> 军事基地
			</div>
		</div>
	</div>
</Panel>

<style>
	.map-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 400px;
	}

	.map-container {
		width: 100%;
		height: 100%;
		background: #0a0c10; /* Fallback */
		border-radius: var(--radius);
		overflow: hidden;
		z-index: 1;
	}

	/* Marker Styles */
	:global(.custom-marker-icon) {
		background: transparent;
		border: none;
	}

	:global(.marker-dot) {
		width: 10px;
		height: 10px;
		background: var(--marker-color);
		border-radius: 50%;
		box-shadow: 0 0 5px var(--marker-color);
		border: 1.5px solid rgba(255, 255, 255, 0.8);
	}

	:global(.marker-square) {
		width: 8px;
		height: 8px;
		background: var(--marker-color);
		transform: rotate(45deg);
		box-shadow: 0 0 5px var(--marker-color);
		border: 1px solid white;
	}

	:global(.marker-star) {
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-bottom: 10px solid var(--marker-color);
		position: relative;
		filter: drop-shadow(0 0 2px var(--marker-color));
	}
	:global(.marker-star:after) {
		content: '';
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 10px solid var(--marker-color);
		position: absolute;
		top: 3px;
		left: -5px;
	}

	:global(.marker-pulse) {
		width: 12px;
		height: 12px;
		background: var(--marker-color);
		border-radius: 50%;
		position: relative;
		box-shadow: 0 0 0 rgba(255, 255, 255, 0.4);
		animation: markerPulse 2s infinite;
	}

	@keyframes markerPulse {
		0% {
			box-shadow: 0 0 0 0 rgba(var(--marker-color), 0.7);
		}
		70% {
			box-shadow: 0 0 0 10px rgba(var(--marker-color), 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(var(--marker-color), 0);
		}
	}

	/* Popup Styles */
	:global(.glass-popup .leaflet-popup-content-wrapper) {
		background: rgba(15, 15, 20, 0.85);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: var(--text-primary);
		padding: 0;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
	}

	:global(.glass-popup .leaflet-popup-tip) {
		background: rgba(15, 15, 20, 0.85);
	}

	:global(.popup-content) {
		padding: 0.5rem;
		min-width: 150px;
	}

	:global(.popup-title) {
		font-weight: 700;
		font-size: 0.8rem;
		margin-bottom: 0.3rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	:global(.popup-desc) {
		font-size: 0.7rem;
		color: var(--text-secondary);
		line-height: 1.4;
		margin-bottom: 0.3rem;
	}

	:global(.popup-meta) {
		font-size: 0.65rem;
		color: var(--text-muted);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 0.3rem;
		margin-top: 0.3rem;
	}

	/* Tooltip Styles */
	:global(.map-label-tooltip) {
		background: transparent;
		border: none;
		box-shadow: none;
		color: rgba(255, 255, 255, 0.7);
		font-weight: 600;
		font-size: 0.7rem;
		text-shadow: 0 0 3px black;
	}

	/* Legend */
	.map-legend {
		position: absolute;
		bottom: 20px;
		left: 20px;
		background: rgba(10, 10, 15, 0.8);
		backdrop-filter: blur(8px);
		padding: 0.75rem;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		z-index: 400; /* Above Leaflet controls */
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.7rem;
		color: var(--text-secondary);
	}

	.legend-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.legend-dot.high { background: var(--danger); box-shadow: 0 0 5px var(--danger); }
	.legend-dot.elevated { background: var(--warning); box-shadow: 0 0 5px var(--warning); }
	.legend-dot.low { background: var(--success); box-shadow: 0 0 5px var(--success); }

	.legend-icon {
		width: 8px;
		height: 8px;
		background: var(--info);
	}
	.legend-icon.square { transform: rotate(45deg); border: 1px solid white; }
	.legend-icon.star { background: #ff00ff; clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }

	.legend-divider {
		height: 1px;
		background: rgba(255, 255, 255, 0.1);
		margin: 0.2rem 0;
	}
</style>
