<script lang="ts">
    import ReactiveA from "$lib/components/ui/reactive-a.svelte";
</script>
<div class="w-full h-screen bg-gradient-to-tr from-gray-200 to-white grid place-items-center">
    <div class="w-[90%] h-[90%] bg-white drop-shadow-xl rounded-xl flex">
        <div id="navigators" class="grid min-w-52 content-start h-full shadow-xl text-center rounded-xl overflow-hidden">
            <ReactiveA href="/admin/dashboard">Dashboard</ReactiveA>
            <ReactiveA href="/admin/moderators">Moderators</ReactiveA>
            <ReactiveA href="/admin/products">Products</ReactiveA>
            <ReactiveA href="/admin/orders">Orders</ReactiveA>
            <ReactiveA href="/admin/activeSales">Active sales</ReactiveA>
        </div>

        <div class="relative p-6 flex-1">
            <slot/>
        </div>
    </div>
</div>