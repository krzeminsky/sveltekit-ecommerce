<script lang="ts">
    import IconButton from "../ui/icon-button.svelte";

    export let value = '';
    export let placeholder = "Search"
    export let showButton = false;
</script>

<div>
    <input type="search" {placeholder} class="px-4 py-2 bg-gray-50 rounded-full shadow-md outline-none focus:outline-none focus:shadow-lg transition-all" bind:value />
    {#if showButton}
    <IconButton src="/icons/search.svg" alt="Search" on:click />
    {/if}
</div>