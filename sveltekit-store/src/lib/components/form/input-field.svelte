<script lang="ts">
    import { v1 } from "uuid";

    export let id: string = v1();
    export let label: string = '';
    export let type: string = 'text';
    export let placeholder: string = '';
    export let required = false;
    export let autocomplete: string = 'nope';

    export let field: HTMLInputElement|undefined = undefined;
    export let value: any = '';

    $: if (field) field.value = value;
</script>

<div class="relative w-full group flex gap-2 min-w-0 mt-6">
    <label for={id} class="text-gray-600 bg-transparent px-1 absolute left-0 bottom-full group-focus-within:translate-y-1/2 group-focus-within:left-5 group-focus-within:bg-white transition-all">{label}</label>
    <input {id} {type} {placeholder} {autocomplete} {required} class="flex-1 basis-0 min-w-0 h-full border-2 px-5 py-2 rounded-xl outline-none focus:border-gray-500 transition-all" bind:this={field} on:input={e => value = type == "number"? e.currentTarget.valueAsNumber : e.currentTarget.value} on:keydown />
    <slot />
</div>