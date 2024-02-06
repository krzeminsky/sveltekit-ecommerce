<script lang="ts">
    export let content: string[];
</script>

<div class="flex gap-2 flex-wrap">
    {#each content as c, i}
    <button class="text-sm px-4 py-2 rounded-full bg-gray-400 text-white shadow-md" on:click={() => { content.splice(i, 1); content = content }}>{c}</button>
    {/each}
</div>