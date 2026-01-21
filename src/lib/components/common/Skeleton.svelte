<script lang="ts">
	interface Props {
		width?: string;
		height?: string;
		lines?: number;
		class?: string;
	}

	let { width = '100%', height = '1rem', lines = 1, class: className = '' }: Props = $props();
</script>

<div class="skeleton-container {className}">
	{#each Array(lines) as _, i}
		<div
			class="skeleton"
			style="width: {lines > 1 && i === lines - 1 ? '70%' : width}; height: {height};"
		></div>
	{/each}
</div>

<style>
	.skeleton-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}

	.skeleton {
		background-color: var(--surface-hover);
		border-radius: 4px;
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
