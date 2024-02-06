<script lang="ts">
    export let id: string;
    export let label: string = '';
    export let type: string = 'text';
    export let placeholder: string = '';
    export let required = false;
    export let autocomplete: string = 'nope';

    export let value = '';
</script>

<div class="relative w-full group">
    <label for={id} class="text-gray-600 bg-transparent px-1 absolute left-0 bottom-full group-focus-within:translate-y-1/2 group-focus-within:left-5 group-focus-within:bg-white transition-all">{label}</label>
    <input {id} {type} {placeholder} {autocomplete} {required} class="w-full h-full border-2 px-5 py-2 rounded-xl outline-none focus:border-gray-500 transition-all" on:keydown on:input={e => value = e.currentTarget.value} />
</div>