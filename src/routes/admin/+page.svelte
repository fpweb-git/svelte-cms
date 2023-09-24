<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;

    $: ({ articles } = data);
</script>

<h1>admin</h1>

<div class="grid">
    <div>
        {#each articles as article}
            <article>
                <header>{article.title}</header>
                <p>{article.content}</p>
                <form action="?/deleteArticle&id={article.id}" method="POST">
                    <button type="submit" class="outline">Delete article</button
                    >
                </form>
                <a
                    role="button"
                    style="width: 100%;"
                    href="/admin/edit/{article.id}"
                    class="outline contrast">Edit article</a
                >
            </article>
        {/each}
    </div>
    <form action="?/createArticle" method="POST">
        <h3>New article</h3>
        <label for="title">Title</label>
        <input type="text" id="title" name="title" />
        <label for="content">Content</label>
        <textarea name="content" id="content" rows="5" />
        <button type="submit">Add article</button>
    </form>
</div>
