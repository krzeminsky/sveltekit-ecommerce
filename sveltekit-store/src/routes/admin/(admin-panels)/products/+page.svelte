<script lang="ts">
    import DropdownMenu from "$lib/components/other/dropdown-menu.svelte";
    import RadioIconGroup from "$lib/components/other/radio-icon-group.svelte";
    import Search from "$lib/components/other/search.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>Products</title>
</svelte:head>

<div class="flex gap-2 justify-between items-center">
    <div class="flex items-center gap-2">
        <Search/>

        <div id="sort-options">
            <DropdownMenu label="Sort by" options={["Name", "Price", "Age"]}/>

            <RadioIconGroup iconPaths={["/icons/expand/expand-more.svg", "/icons/expand/expand-less.svg"]}/>
        </div>
    </div>

    <button class="text-button">Add product</button>
</div>