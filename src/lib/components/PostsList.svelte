<script lang="ts">
    export let articles: { title: string; content: string; id: number }[];
</script>

<div class="articlesGrid">
    {#each articles as article}
        <article>
            <hgroup>
                <h3>{article.title}</h3>
                <small>{article.content}</small>
            </hgroup>
            <a href="/article/{article.id}" role="button" class="outline"
                >Read this article</a
            >
        </article>
    {/each}
</div>

<style>
    h3 {
        margin-bottom: 1rem;
    }
    article {
        margin: 0;
    }
    .articlesGrid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
    }
</style>
