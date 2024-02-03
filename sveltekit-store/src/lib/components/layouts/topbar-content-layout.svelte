<script lang="ts">
    export let justifyBetweenTopBar = true;
</script>

<div class="w-full h-full flex flex-col">
    <div class="relative w-full flex gap-4 {justifyBetweenTopBar? 'justify-between' : ''} items-center mb-2">
        <slot name="topbar" />
    </div>

    <div class="rlative flex-1">
        <slot name="content" />
    </div>
</div>