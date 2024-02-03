<script lang="ts" context="module">
    let dropdownCount = 0;

    const activeDropdown = writable(0);
</script>

<script lang="ts">
    import { cubicInOut } from "svelte/easing";
    import { writable } from "svelte/store";
    import { fade } from "svelte/transition";

    export let label: string;
    export let options: string[];
    export let allowMultiple = false;

    const id = ++dropdownCount;

    export let selected: number[] = allowMultiple? [] : [0];
    $: expand = $activeDropdown == id;

    $: selectedText = (() => {
        if (allowMultiple) {
            if (selected.length == 0) return 'None';
            else return selected.length == 1? options[selected[0]] : `(${selected.length})`;
        } else return options[selected[0]];
    })();

    function select(i: number) {
        if (allowMultiple) {
            const indexOf = selected.indexOf(i);
            
            if (indexOf == -1) selected.push(i);
            else selected.splice(indexOf, 1);
        } else {
            selected = [i];
            activeDropdown.set(0)
        }

        selected = selected;
    }
</script>

<svelte:window on:click={() => { if ($activeDropdown == id) activeDropdown.set(0) }} />

<div class="relative inline-block text-nowrap" on:click|stopPropagation role="none">
    <button class="rounded-full shadow-md hover:shadow-lg {expand? 'shadow-lg' : ''} transition-all" on:click={() => activeDropdown.set($activeDropdown == id? 0 : id) }>
        <h1 class="inline-block w-fit px-4 py-2 rounded-full bg-indigo-500 text-white align-middle">{label}</h1>
        <h1 class="inline-block align-middle px-4 bg-gray-50 text-center w-28 overflow-hidden whitespace-nowrap text-ellipsis">{selectedText}</h1>
    </button>

    {#if expand}
    <div id="options" class="absolute w-full top-full mt-2 left-0 grid bg-white shadow-md rounded-lg overflow-hidden z-10" role="menu" transition:fade={{duration: 100, easing: cubicInOut}}>
        {#each options as o, i}
        {@const isItemSelected = selected.includes(i)}
        <button on:click={() => select(i)} role="option" aria-selected={isItemSelected}>
            <span class="relative">
                {o}
                {#if isItemSelected}<img src="/icons/tick.svg" alt="selected" class="absolute left-full top-0 ml-2" />{/if}
            </span>
        </button>
        {/each}
    </div>
    {/if}
</div>

<style lang="postcss">
    #options button {
        @apply py-2 bg-transparent hover:bg-gray-50 active:bg-gray-100 transition-all;
    }
</style>