<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PanelId } from '$lib/config';
	import { slide } from 'svelte/transition';
	import Skeleton from './Skeleton.svelte';

	interface Props {
		id: PanelId;
		title: string;
		count?: number | string | null;
		status?: string;
		statusClass?: string;
		loading?: boolean;
		error?: string | null;
		draggable?: boolean;
		collapsible?: boolean;
		collapsed?: boolean;
		onCollapse?: () => void;
		header?: Snippet;
		actions?: Snippet;
		children: Snippet;
	}

	let {
		id,
		title,
		count = null,
		status = '',
		statusClass = '',
		loading = false,
		error = null,
		draggable = true,
		collapsible = false,
		collapsed = false,
		onCollapse,
		header,
		actions,
		children
	}: Props = $props();

	function handleCollapse() {
		if (collapsible && onCollapse) {
			onCollapse();
		}
	}
</script>

<div class="panel" class:draggable class:collapsed data-panel-id={id}>
	<div class="panel-header">
		<div class="panel-title-row">
			<h3 class="panel-title">{title}</h3>
			{#if count !== null}
				<span class="panel-count">{count}</span>
			{/if}
			{#if status}
				<span class="panel-status {statusClass}">{status}</span>
			{/if}
		</div>

		{#if header}
			{@render header()}
		{/if}

		<div class="panel-actions">
			{#if actions}
				{@render actions()}
			{/if}
			{#if collapsible}
				<button class="panel-collapse-btn" onclick={handleCollapse} aria-label="切换面板">
					{collapsed ? '▼' : '▲'}
				</button>
			{/if}
		</div>
	</div>

	{#if !collapsed}
		<div class="panel-content" transition:slide={{ duration: 200 }}>
			{#if error}
				<div class="error-msg">{error}</div>
			{:else if loading}
				<div class="loading-container">
					<Skeleton lines={3} height="1.5rem" />
					<Skeleton lines={2} height="1rem" />
				</div>
			{:else}
				{@render children()}
			{/if}
		</div>
	{/if}
</div>

<style>
	.panel {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		box-shadow: var(--shadow-sm);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition:
			box-shadow 0.2s,
			border-color 0.2s;
	}

	.panel:hover {
		border-color: var(--border-hover);
		box-shadow: var(--shadow);
	}

	.panel.draggable {
		cursor: grab;
	}

	.panel.draggable:active {
		cursor: grabbing;
	}

	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.65rem 0.85rem;
		background: var(--surface);
		border-bottom: 1px solid var(--border);
		min-height: 2.25rem;
	}

	.panel-title-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.panel-title {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.025em;
		color: var(--text-primary);
		margin: 0;
	}

	.panel-count {
		font-size: 0.65rem;
		font-weight: 500;
		color: var(--accent);
		background: rgba(var(--accent-rgb), 0.1);
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
	}

	.panel-status {
		font-size: 0.6rem;
		font-weight: 600;
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
		text-transform: uppercase;
	}

	.panel-status.monitoring {
		color: var(--text-secondary);
		background: var(--surface-hover);
	}

	.panel-status.elevated {
		color: var(--warning);
		background: rgba(245, 158, 11, 0.15);
	}

	.panel-status.critical {
		color: var(--danger);
		background: rgba(239, 68, 68, 0.15);
	}

	.panel-actions {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.panel-collapse-btn {
		background: none;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		padding: 0.25rem;
		font-size: 0.6rem;
		line-height: 1;
		transition: color 0.2s;
	}

	.panel-collapse-btn:hover {
		color: var(--text-primary);
	}

	.panel-content {
		flex: 1;
		padding: 0.75rem;
	}

	.error-msg {
		color: var(--danger);
		text-align: center;
		padding: 1rem;
		font-size: 0.75rem;
		background: rgba(239, 68, 68, 0.05);
		border-radius: var(--radius);
	}

	.loading-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
