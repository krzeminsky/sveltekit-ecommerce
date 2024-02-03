<script lang="ts">
    import TopbarContentLayout from "$lib/components/layouts/topbar-content-layout.svelte";
import Search from "$lib/components/other/search.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>Moderators</title>
</svelte:head>

{#if !data.moderators}
<h1 class="placeholder-center-text">Only head admin can access this page</h1>
{:else}
<TopbarContentLayout>
    <svelte:fragment slot="topbar">
        <Search placeholder="Search by nickname" />
    
        <button class="text-button">Add moderator</button>
    </svelte:fragment>

    <svelte:fragment slot="content">
        {#if data.moderators.length == 0}
        <h1 class="placeholder-center-text">Future moderators will be displayed here</h1>
        {:else}
        .
        {/if}
    </svelte:fragment>
</TopbarContentLayout>   
{/if}