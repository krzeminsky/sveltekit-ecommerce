<script lang="ts">
    export let src: string;
    export let alt: string;
</script>

<button class="button" on:click>
    <img {src} {alt} />
</button>