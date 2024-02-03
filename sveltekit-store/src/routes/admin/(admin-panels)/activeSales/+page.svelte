<script lang="ts">
    import SortBy from "$lib/components/composites/sort-by.svelte";
import TopbarContentLayout from "$lib/components/layouts/topbar-content-layout.svelte";
    import Search from "$lib/components/other/search.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>
<svelte:head>
    <title>Active sales</title>
</svelte:head>

<TopbarContentLayout>
    <svelte:fragment slot="topbar">
        <div class="flex items-center gap-4">
            <Search placeholder="Search by name" />

            <SortBy sortOptions={["Name", "Expiration date"]} />
        </div>

        <a href="activeSales/-1" class="text-button">Create sale</a>
    </svelte:fragment>

    <svelte:fragment slot="content">
        {#if data.sales.length == 0}
        <h1 class="placeholder-center-text">Future sales will be displayed here</h1>
        {:else}
        .
        {/if}
    </svelte:fragment>
</TopbarContentLayout>