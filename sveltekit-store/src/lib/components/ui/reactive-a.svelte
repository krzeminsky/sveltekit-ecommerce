<script lang="ts">
    import { page } from "$app/stores";

    export let href: string;
</script>

<a {href} class="py-2 transition-all {$page.url.pathname == href? 'bg-indigo-400 text-white' : 'bg-transparent text-black hover:bg-indigo-300 hover:text-white active:bg-indigo-400 active:text-white'}"><slot/></a>