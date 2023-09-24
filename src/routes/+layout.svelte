<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import "../assets/main.css";
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<div class="container">
    <Header user={data} />
    <slot />
</div>
