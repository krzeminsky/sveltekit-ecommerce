<script lang="ts">
    export let justifyBetweenTopBar = true;
</script>

<div class="w-full h-full flex flex-col">
    <div class="relative w-full flex gap-4 {justifyBetweenTopBar? 'justify-between' : ''} items-center mb-8">
        <slot name="topbar" />
    </div>

    <div class="relative flex-1 basis-0 overflow-y-auto">
        <slot name="content" />
    </div>
</div>