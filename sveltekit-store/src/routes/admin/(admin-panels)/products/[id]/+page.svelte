<script lang="ts">
    import InputField from "$lib/components/form/input-field.svelte";
    import TextAreaField from "$lib/components/form/text-area-field.svelte";
    import TopbarContentLayout from "$lib/components/layouts/topbar-content-layout.svelte";
    import Breadcrumbs from "$lib/components/other/breadcrumbs.svelte";
    import IconButton from "$lib/components/ui/icon-button.svelte";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    let productRecord = data.productRecord;

    let name = '';
    let description = '';
    let price: number;
    let category = '';
    let addMaterialValue = '';
    let materials: string[] = [];

    $: allowSubmit = name && description && price && category && materials.length != 0;

    onMount(() => {
        if (productRecord.product.id != -1) {
            name = productRecord.product.name;
            description = productRecord.product.description;
            price = productRecord.product.price;
            category = productRecord.product.category;
            materials = productRecord.product.materials.split(',')
        }
    });

    function addMaterial() {        
        if (addMaterialValue) {
            materials.push(addMaterialValue);
            addMaterialValue = '';
            materials = materials;
        }
    }
</script>

<svelte:head>
    <title>Product</title>
</svelte:head>

<TopbarContentLayout>
    <svelte:fragment slot="topbar">
        <a href="/admin/products" class="text-button">Return</a>


        <div class="flex gap-4">
            <button class="text-button-outlined outline-rose-400 text-rose-400">Delete product</button>
            <button class="text-button" disabled={!allowSubmit}>Save changes</button>
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
                    <div class="w-full h-full flex flex-col items-start gap-2">
                        <InputField id="add-material" label="Add material" placeholder="Add material" bind:value={addMaterialValue} on:keydown={e => { if (e.key == "Enter") addMaterial() }}>
                            <IconButton src="/icons/add.svg" alt="Add material" on:click={addMaterial} />
                        </InputField>

                        <div class="w-full flex-1 basis-0 overflow-y-scroll">
                            <Breadcrumbs bind:content={materials} />
                        </div>
                    </div>
                </td>
            </tr>

            <tr>
                <td>
                    <InputField id="unitPrice" label="Unit price" placeholder="Unit price" type="number" bind:value={price}/>
                </td>
            </tr>

            <tr>
                <td>
                    <InputField id="category" label="Category" placeholder="Category" bind:value={category} />
                </td>
            </tr>
        </table>

        <h1 class="text-indigo-500 text-3xl mb-8">Product variants</h1>

        <div class="grid">
            {#each productRecord.variants as v}
            <div>

            </div>
            {/each}

            <button class="w-full py-6 border-dashed border-2 border-indigo-400 rounded-lg grid place-content-center">
                <h1 class="text-xl text-indigo-400">Add variant</h1>
            </button>
        </div>
    </svelte:fragment>
</TopbarContentLayout>

<style lang="postcss">
    #product-editor td {
        @apply relative w-96 p-4 h-1;
    }
</style>