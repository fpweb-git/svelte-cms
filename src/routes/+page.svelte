<script lang="ts">
    import PostsList from "$lib/components/PostsList.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: ({ articles } = data);
</script>

<main>
    <h1>Fresh articles</h1>
    <PostsList {articles} />
</main>
