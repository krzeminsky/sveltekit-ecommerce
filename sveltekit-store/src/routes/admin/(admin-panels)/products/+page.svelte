<script lang="ts">
    import DropdownMenu from "$lib/components/other/dropdown-menu.svelte";
    import SortBy from "$lib/components/composites/sort-by.svelte";
    import Search from "$lib/components/other/search.svelte";
    import type { PageData } from "./$types";
    import IconButton from "$lib/components/ui/icon-button.svelte";
    import TopbarContentLayout from "$lib/components/layouts/topbar-content-layout.svelte";
    import type { ProductRecord } from "$lib/types/product";
    import { onMount } from "svelte";
    import ProgressIndicator from "$lib/components/ui/progress-indicator.svelte";
    import { goto } from "$app/navigation";
    import type { ProductFetchOptions } from "$lib/validation/get-product-schema";

    export let data: PageData;

    const sortOptions = ["Id", "Name", "Price"];

    let products: ProductRecord[] = [];

    let searchValue: string;
    let selectedSortOption: number;
    let sortDescending: boolean;

    let selectedCategories: number[];

    let awaitingResponse = false;

    const productsPerPage = 15;
    let currentPage = 0;
    let pageCount = Math.ceil(data.productCount / productsPerPage);

    onMount(() => {
        fetchProducts();
    })

    async function fetchProducts() {
        const categories = selectedCategories.map(c => data.categories[c]);

        awaitingResponse = true;

        const query = JSON.stringify({
            page: currentPage,
            count: productsPerPage,
            options: {
                name: searchValue,
                categories,
                sortOptions: {
                    sortBy: sortOptions[selectedSortOption],
                    descending: sortDescending
                }
            }
        } as ProductFetchOptions);

        const res = await fetch(`/api/products?query=${query}`, { method: "GET" })

        products = await res.json();

        awaitingResponse = false;
    }

    async function refreshProducts() {
        currentPage = 0;

        await fetchProducts();
    }

    async function switchPage(direction: -1|1) {
        let newPage = currentPage + direction;
        if (newPage == -1 || newPage == pageCount) return;

        currentPage = newPage;
        await fetchProducts();
    }
</script>

<svelte:head>
    <title>Products</title>
</svelte:head>

<TopbarContentLayout>
    <svelte:fragment slot="topbar">
        <div class="flex items-center gap-4 flex-shrink-0">
            <Search placeholder="Search by name" bind:value={searchValue} />
    
            <SortBy {sortOptions} bind:selected={selectedSortOption} bind:descending={sortDescending} />

            <DropdownMenu label="Cateogry" allowMultiple={true} options={data.categories} bind:selected={selectedCategories} />

            <IconButton src="/icons/refresh.svg" alt="Refresh products" on:click={refreshProducts} />
        </div>
    
        <a href="products/-1" class="text-button">Add product</a>
    </svelte:fragment>

    <svelte:fragment slot="content">
        {#if awaitingResponse}
        <div class="center-absolute">
            <ProgressIndicator size={64} fillColor="rgb(229 231 235)"/>
        </div>
        {:else}
            {#if products.length == 0}
            <h1 class="placeholder-center-text">Future products will be displayed here</h1>
            {:else}
            <div class="w-full h-full flex flex-col">
                <div class="flex-1 basis-0 overflow-y-auto">
                    <table class="w-full overflow-y-auto divide-y-2 divide-gray-100">
                        <tr>
                            <td class="text-gray-400">Id</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Category</td>
                        </tr>
        
                        {#each products as p}
                        <tr class="bg-transparent hover:bg-gray-100 transition-all cursor-pointer" on:click={() => goto(`/admin/products/${p.product.id}`) }>
                            <td class="text-gray-400">{p.product.id}</td>
                            <td>{p.product.name}</td>
                            <td>{p.product.price}</td>
                            <td>{p.product.category}</td>
                        </tr>
                        {/each}
                    </table>
                </div>

                <div id="page-navigator" class="mx-auto">
                    <button class="clear-icon-button" on:click={() => switchPage(-1)}>
                        <img src="/icons/navigate/navigate-before.svg" alt="Previous page" />
                    </button>
                    
                    <h1 class="px-2">{currentPage + 1} / {pageCount}</h1>
                    
                    <button class="clear-icon-button" on:click={() => switchPage(1)}>
                        <img src="/icons/navigate/navigate-next.svg" alt="Next page" />
                    </button>
                </div>
            </div>
            {/if}
        {/if}
    </svelte:fragment>
</TopbarContentLayout>

<style lang="postcss">
    #page-navigator * {
        @apply inline-block align-middle;
    }

    table td {
        @apply p-2 align-top;
    }
</style>