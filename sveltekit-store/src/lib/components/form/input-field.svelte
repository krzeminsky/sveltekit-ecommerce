<script lang="ts">
    export let label: string = '';
    export let placeholder: string = '';
    export let type: string = 'text';
    export let required = false;

    export let value: any = '';
</script>

<label class="w-full relative">
    <small class="absolute top-0 left-4 -translate-y-1/2 bg-white px-1 text-indigo-500">{label}</small>
    <input {type} {placeholder} {required} class="w-full px-4 py-2 border-2 border-indigo-500 rounded-2xl shadow-md focus:shadow-lg outline-none focus:outline-none transition-all" on:input={e => value = e.currentTarget.value} />
</label>