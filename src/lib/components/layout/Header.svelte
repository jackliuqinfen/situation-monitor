<script lang="ts">
	import { isRefreshing, lastRefresh } from '$lib/stores';

	interface Props {
		onSettingsClick?: () => void;
	}

	let { onSettingsClick }: Props = $props();

	const lastRefreshText = $derived(
		$lastRefresh
			? `最后更新：${new Date($lastRefresh).toLocaleTimeString('zh-CN', { hour: 'numeric', minute: '2-digit' })}`
			: '从未刷新'
	);
</script>

<header class="header">
	<div class="header-left">
		<h1 class="logo">
			<span class="logo-icon">🌐</span>
			<span class="logo-text">全球态势监控系统</span>
		</h1>
	</div>

	<div class="header-center">
		<div class="refresh-status">
			{#if $isRefreshing}
				<div class="spinner"></div>
				<span class="status-text loading">正在刷新数据...</span>
			{:else}
				<span class="status-dot"></span>
				<span class="status-text">{lastRefreshText}</span>
			{/if}
		</div>
	</div>

	<div class="header-right">
		<button class="header-btn settings-btn" onclick={onSettingsClick} title="设置">
			<span class="btn-icon">⚙</span>
			<span class="btn-label">设置</span>
		</button>
	</div>
</header>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1.5rem;
		height: 3.5rem;
		background: var(--surface);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 100;
		gap: 1rem;
		box-shadow: var(--shadow-sm);
	}

	.header-left {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.logo {
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: var(--text-primary);
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.logo-icon {
		font-size: 1.25rem;
	}

	.header-center {
		display: flex;
		align-items: center;
		flex: 1;
		justify-content: center;
		min-width: 0;
	}

	.refresh-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--surface-hover);
		padding: 0.25rem 0.75rem;
		border-radius: 2rem;
		border: 1px solid var(--border);
	}

	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: var(--success);
		box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
	}

	.status-text {
		font-size: 0.75rem;
		color: var(--text-secondary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.status-text.loading {
		color: var(--accent);
	}

	.spinner {
		width: 10px;
		height: 10px;
		border: 2px solid var(--surface);
		border-top-color: var(--accent);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.header-btn {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		height: 2rem;
		padding: 0 0.75rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 4px;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.header-btn:hover {
		background: var(--surface-hover);
		border-color: var(--border-hover);
		color: var(--text-primary);
		transform: translateY(-1px);
		box-shadow: var(--shadow-sm);
	}

	.header-btn:active {
		transform: translateY(0);
	}

	.btn-icon {
		font-size: 0.9rem;
	}

	.btn-label {
		display: none;
	}

	@media (min-width: 768px) {
		.btn-label {
			display: inline;
		}
	}
</style>
