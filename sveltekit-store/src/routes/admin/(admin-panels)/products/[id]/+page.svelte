<script lang="ts">
    import InputField from "$lib/components/form/input-field.svelte";
    import TextAreaField from "$lib/components/form/text-area-field.svelte";
    import TopbarContentLayout from "$lib/components/layouts/topbar-content-layout.svelte";
    import Breadcrumbs from "$lib/components/other/breadcrumbs.svelte";
    import IconButton from "$lib/components/ui/icon-button.svelte";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import ProgressIndicator from "$lib/components/ui/progress-indicator.svelte";
    import { goto } from "$app/navigation";
    import type { ProductData } from "$lib/validation/update-product-schema";

    export let data: PageData;

    $: productRecord = data.productRecord;
    let variants: { id: number, color: string, stock: { size: string, amount: number }[] }[] = [];

    let name = '';
    let description = '';
    let price: number;
    let category = '';
    let addMaterialValue = '';
    let materials: string[] = [];

    let savingChanges = false;

    $: allowSubmit = name && description && price && category && materials.length != 0 && !savingChanges;

    onMount(() => {
        if (productRecord.product.id != -1) {
            name = productRecord.product.name;
            description = productRecord.product.description;
            price = productRecord.product.price;
            category = productRecord.product.category;
            materials = productRecord.product.materials.split(',');

            productRecord.variants.forEach(v => {
                variants.push({ id: v.id, color: v.color, stock: JSON.parse(v.stock_map) });
            });

            variants = variants;
        }
    });

    function addMaterial() {        
        if (addMaterialValue) {
            materials.push(addMaterialValue);
            addMaterialValue = '';
            materials = materials;
        }
    }

    function addVariant() {
        variants.push({ id: -1, color: '', stock: [] });
        variants = variants;
    }

    function addStockVariant(targetVariant: { size: string, amount: number }[]) {
        targetVariant.push({ size: '', amount: 0 });
        variants = variants;
    }

    // ? why not use form actions? I find it weird to put hidden input fields with binded values, it's much cleaner to just include neccessary data in the body using fetch

    async function saveChanges() {
        savingChanges = true;
        
        const res = await fetch('/api/admin/product/update', { method: "POST", body: JSON.stringify({
            id: productRecord.product.id,
            name,
            price,
            description,
            category,
            materials: materials.join(','),
            variants
        } as ProductData ) });

        if (res.redirected) await goto(res.url);

        savingChanges = false;
    }

    async function deleteProduct() {
        const res = await fetch('/api/admin/product/delete', { method: "POST", body: productRecord.product.id.toString() });
        if (res.redirected) await goto(res.url);
    }
</script>

<svelte:head>
    <title>Product</title>
</svelte:head>

<TopbarContentLayout>
    <svelte:fragment slot="topbar">
        <a href="/admin/products" class="text-button">Return</a>

        <div class="flex gap-4">
            <button class="text-button-outlined outline-rose-400 text-rose-400" on:click={deleteProduct}>
                Delete product
            </button>

            <button class="text-button w-32" disabled={!allowSubmit} on:click={saveChanges}>
                {#if savingChanges}
                <ProgressIndicator fillColor="white" />
                {:else}
                Save changes
                {/if}
            </button>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="content">
        <h1 class="text-indigo-500 text-3xl mb-8">Product info</h1>
        
        <table id="product-editor" class="mb-8">
            <tr>
                <td>
                    <InputField id="name" label="Name" placeholder="Name" bind:value={name} />
                </td>

                <td rowspan="3">
                    <TextAreaField id="description" label="Description" placeholder="Write a short description..." bind:value={description} />
                </td>

                <td rowspan="3">
                    <div class="w-full h-full flex flex-col items-start">
                        <InputField id="add-material" label="Add material" placeholder="Add material" bind:value={addMaterialValue} on:keydown={e => { if (e.key == "Enter") addMaterial() }}>
                            <IconButton src="/icons/add.svg" alt="Add material" on:click={addMaterial} />
                        </InputField>

                        <div class="w-full flex-1 basis-0 overflow-y-scroll">
                            <Breadcrumbs bind:content={materials} />
                        </div>
                    </div>
                </td>
            </tr>

            <tr><td>
                <InputField id="unitPrice" label="Unit price" placeholder="Unit price" type="number" bind:value={price}/>
            </td></tr>

            <tr><td>
                <InputField id="category" label="Category" placeholder="Category" bind:value={category} />
            </td></tr>
        </table>

        <h1 class="text-indigo-500 text-3xl mb-8">Product variants</h1>

        <div class="px-4 grid gap-4">
            {#each variants as v, i (v)}
            <div class="w-full px-4 py-8 border-2 border-indigo-400 rounded-lg">
                <table id="variant-editor">
                    <tr>
                        <td class="align-top">
                            <h1 class="text-2xl text-indigo-500 pb-2">Properties</h1>
                            
                            <InputField label="Color" placeholder="Color" bind:value={v.color} />

                            <h1 class="text-2xl text-indigo-500 mt-4 mb-2">Galery</h1>

                            <div class="grid grid-cols-3 gap-4">
                                <button class="p-2 aspect-square h-24 border-indigo-400 border-dashed border-2 text-indigo-400 text-center text-sm rounded-lg">
                                    <img src="/icons/image.svg" alt="" class="mx-auto mb-1" />
                                    Add image
                                </button>
                            </div>
                        </td>

                        <td class="align-top" style="width: 28rem">
                            <h1 class="text-2xl text-indigo-500 pb-2">Variants</h1>
                            
                            <div class="grid grid-cols-3 gap-2 justify-center">
                                {#each v.stock as pair, i (pair)}
                                <InputField label="Size" placeholder="Size" bind:value={pair.size} />
                                <InputField label="Amount" placeholder="Amount" type="number" bind:value={pair.amount} />

                                <button class="text-button-outlined outline-rose-400 text-rose-400 justify-self-center self-end w-full" on:click={() => {v.stock.splice(i, 1); variants = variants}}>
                                    Delete
                                </button>
                                {/each}
    
                                <button class="dashed-border-button py-1.5 col-span-3" on:click={() => addStockVariant(v.stock)}>
                                    Add stock variant
                                </button>
                            </div>
                        </td>

                        <td class="align-top">
                            <button class="text-button-outlined outline-rose-400 text-rose-400" on:click={() => {variants.splice(i, 1); variants = variants}}>
                                Delete variant
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            {/each}

            <button class="py-6 dashed-border-button" on:click={addVariant}>
                <h1 class="text-xl">Add variant</h1>
            </button>
        </div>
    </svelte:fragment>
</TopbarContentLayout>

<style lang="postcss">
    table td {
        @apply relative w-96 px-4 py-1 h-1;
    }

    .dashed-border-button {
        @apply w-full border-dashed border-2 border-indigo-400 rounded-lg text-indigo-400 text-center;
    }
</style>