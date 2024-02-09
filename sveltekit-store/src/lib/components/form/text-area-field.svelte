<script lang="ts">
    export let id: string;
    export let label: string = '';
    export let placeholder: string = '';

    export let value = '';
</script>

<div class="relative w-full h-full group mt-6">
    <label for={id} class="text-gray-600 bg-transparent px-1 absolute left-0 bottom-full group-focus-within:translate-y-1/2 group-focus-within:left-5 group-focus-within:bg-white transition-all">{label}</label>
    <textarea {id} {placeholder} class="resize-none w-full h-full border-2 px-5 py-2 rounded-xl outline-none focus:border-gray-500 transition-all" bind:value />
</div>