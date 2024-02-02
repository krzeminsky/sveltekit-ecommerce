<script lang="ts">
    import { enhance } from "$app/forms";
</script>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <form method="POST" use:enhance>
        <input name="password" placeholder="Enter admin password" type="text" required class="border-2 rounded-full px-4 py-2" />
        <button class="bg-indigo-500 px-4 py-2 rounded-full text-white">Submit</button>
    </form>
</div>