<script lang="ts">
    import SortBy from "$lib/components/composites/sort-by.svelte";
    import TopbarContentLayout from "$lib/components/layouts/topbar-content-layout.svelte";
    import Search from "$lib/components/other/search.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>Orders</title>
</svelte:head>

<TopbarContentLayout justifyBetweenTopBar={false}>
    <svelte:fragment slot="topbar">
        <Search placeholder="Search by name" />

        <SortBy sortOptions={["Name", "Price", "Age", "Status"]} />
    </svelte:fragment>

    <svelte:fragment slot="content">
        {#if data.orders.length == 0}
        <h1 class="placeholder-center-text">Future orders will be displayed here</h1>
        {:else}
        .
        {/if}
    </svelte:fragment>
</TopbarContentLayout>