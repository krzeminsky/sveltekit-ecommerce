<script lang="ts">
    export let icons: { src: string, alt: string }[];
    export let selected = 0;
</script>

<div class="flex gap-2" role="radiogroup">
    {#each icons as icon, i}
    <button on:click={() => selected = i} class="p-2 rounded-full transition-all {selected == i? 'bg-gray-100 shadow-md' : 'bg-transparent'}" role="radio" aria-checked={selected == i}>
        <img src={icon.src} alt={icon.alt} />
    </button>
    {/each}
</div>