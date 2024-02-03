<script lang="ts">
    import DropdownMenu from "$lib/components/other/dropdown-menu.svelte";
    import SortBy from "$lib/components/composites/sort-by.svelte";
    import Search from "$lib/components/other/search.svelte";
    import type { PageData } from "./$types";
    import IconButton from "$lib/components/ui/icon-button.svelte";
    import TopbarContentLayout from "$lib/components/layouts/topbar-content-layout.svelte";

    export let data: PageData;
</script>

<svelte:head>
    <title>Products</title>
</svelte:head>

<TopbarContentLayout>
    <svelte:fragment slot="topbar">
        <div class="flex items-center gap-4 flex-shrink-0">
            <Search placeholder="Search by name" />
    
            <SortBy sortOptions={["Name", "Price", "Age"]} />

            <DropdownMenu label="Cateogry" allowMultiple={true} options={data.categories} />

            <IconButton src="/icons/refresh.svg" alt="Refresh products" />
        </div>
    
        <a href="products/-1" class="text-button">Add product</a>
    </svelte:fragment>

    <svelte:fragment slot="content">
        {#if data.products.length == 0}
        <h1 class="placeholder-center-text">Future products will be displayed here</h1>
        {:else}
        .
        {/if}
    </svelte:fragment>
</TopbarContentLayout>