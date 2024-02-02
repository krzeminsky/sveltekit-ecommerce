<script lang="ts">
    import { cubicInOut } from "svelte/easing";
    import { fade } from "svelte/transition";

    export let label: string;
    export let options: string[];

    export let selected = 0;
    let expand = false;
</script>

<svelte:window on:click={() => expand = false} />

<div class="relative inline-block" on:click|stopPropagation role="none">
    <button class="rounded-full flex items-center shadow-md hover:shadow-lg {expand? 'shadow-lg' : ''} transition-all" on:click={() => expand = !expand}>
        <h1 class="w-fit px-4 py-2 rounded-full bg-indigo-500 text-white">{label}</h1>
        <h1 class="px-4 bg-gray-50 text-center min-w-24">{options[selected]}</h1>
    </button>

    {#if expand}
    <div id="options" class="absolute w-full top-full mt-2 left-0 grid bg-white shadow-md rounded-lg overflow-hidden" role="option" aria-selected={expand} transition:fade={{duration: 100, easing: cubicInOut}}>
        {#each options as o, i}
        <button on:click={() => { selected = i; expand = false; }} role="option" aria-selected={selected == i}>{o}</button>
        {/each}
    </div>
    {/if}
</div>

<style lang="postcss">
    #options button {
        @apply py-2 bg-transparent hover:bg-gray-50 active:bg-gray-100 transition-all;
    }
</style>