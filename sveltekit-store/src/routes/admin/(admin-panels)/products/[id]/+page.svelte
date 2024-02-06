<script lang="ts">
    import InputField from "$lib/components/form/input-field.svelte";
    import TextAreaField from "$lib/components/form/text-area-field.svelte";
    import TopbarContentLayout from "$lib/components/layouts/topbar-content-layout.svelte";
    import Breadcrumbs from "$lib/components/other/breadcrumbs.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    let propertiesChanged = false;

    let materials: string[] = [];

    function addMaterial(e: KeyboardEvent) {
        const target = e.currentTarget as HTMLInputElement;
        const val = target.value.trim();

        if (e.key == "Enter" && val) {
            materials.push(val);
            target.value = '';
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
            <button class="text-button" disabled={!propertiesChanged}>Save changes</button>
        </div>
    </svelte:fragment>

    <svelte:fragment slot="content">
        <h1 class="text-indigo-500 text-3xl mb-8">Product info</h1>
        
        <table id="product-editor">
            <tr>
                <td>
                    <InputField id="name" label="Name" placeholder="Name" />
                </td>

                <td rowspan="3">
                    <TextAreaField id="description" label="Description" placeholder="Write a short description..." />
                </td>

                <td rowspan="3">
                    <div class="w-full h-full flex flex-col items-start gap-2">
                        <InputField id="add-material" label="Add material" placeholder="Add material" on:keydown={addMaterial} />

                        <Breadcrumbs bind:content={materials} />
                    </div>
                </td>
            </tr>

            <tr>
                <td>
                    <InputField id="unitPrice" label="Unit price" placeholder="Unit price" type="number" />
                </td>
            </tr>

            <tr>
                <td>
                    <InputField id="category" label="Category" placeholder="Category" />
                </td>
            </tr>
        </table>
    </svelte:fragment>
</TopbarContentLayout>

<style lang="postcss">
    #product-editor td {
        @apply relative w-96 p-4 h-1;
    }
</style>