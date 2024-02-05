<script lang="ts">
    import InputField from "$lib/components/form/input-field.svelte";
    import TopbarContentLayout from "$lib/components/layouts/topbar-content-layout.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>Product</title>
</svelte:head>

<TopbarContentLayout>
    <svelte:fragment slot="topbar">
        <a href="/admin/products" class="text-button">Return</a>


        <div class="flex gap-4">
            <button class="clear-text-button bg-rose-400">Delete product</button>
            <button class="text-button">Save changes</button>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="content">
        <div class="w-full h-full flex flex-col">
            <div class="flex flex-shrink-0 gap-16 justify-between">

            </div>
        </div>
    </svelte:fragment>
</TopbarContentLayout>