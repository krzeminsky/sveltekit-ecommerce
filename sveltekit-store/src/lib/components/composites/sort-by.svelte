<script lang="ts">
    import DropdownMenu from "../other/dropdown-menu.svelte";
    import RadioIconGroup from "../other/radio-icon-group.svelte";

    export let sortOptions: string[];

    export let descending = true;
    export let selected = 0;

    let selectedSortOption: number[] = [0];
    let selectedOrder = 0;

    $: descending = selectedOrder == 0;
    $: selected = selectedSortOption[0];
</script>

<div class="flex gap-2 items-center">
    <DropdownMenu label="Sort by" options={sortOptions} bind:selected={selectedSortOption} />

    <RadioIconGroup bind:selected={selectedOrder}  icons={[
        { src: "/icons/expand/expand-more.svg", alt: "Sort descending" },
        { src: "/icons/expand/expand-less.svg", alt: "Sort ascending" }
    ]} />
</div>