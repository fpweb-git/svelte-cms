<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ article } = data);
</script>

<h1>{article.title}</h1>
<p>{article.content}</p>
