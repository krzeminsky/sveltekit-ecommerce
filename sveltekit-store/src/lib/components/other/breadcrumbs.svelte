<script lang="ts">
    export let content: string[];
</script>

<div class="flex gap-2 flex-wrap">
    {#each content as c, i}
    <button class="text-sm px-4 py-2 rounded-full bg-indigo-400 text-white shadow-md hover:shadow-lg active:shadow-lg transition-all" on:click={() => { content.splice(i, 1); content = content }}>
        <span class="align-middle">{c}</span>
        <img src="/icons/close.svg" alt="delete breadcrum" class="inline-block" />
    </button>
    {/each}
</div>