<script lang="ts">
    import PostsList from "$lib/components/PostsList.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: ({ articles } = data);
</script>

<h1>Welcome to SvelteKit</h1>

<PostsList {articles} />
