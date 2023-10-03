<script lang="ts">
    import RichText from "$lib/components/RichText.svelte";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
    let editor;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const content = await editor.save(); // get data from Editor.js

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", JSON.stringify(content));

        const response = await fetch("?/createArticle", {
            method: "POST",
            headers: {
                "x-sveltekit-action": "true",
            },
            body: formData,
        });

        if (!response.ok) {
            console.error("There was an error submitting the form");
        }
        window.location.reload();
    };

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
    <form on:submit={handleSubmit}>
        <h3>New article</h3>
        <label for="title">Title</label>
        <input type="text" id="title" name="title" />
        <label for="content">Content</label>
        <div id="content" style="margin-bottom: 18px ;">
            <RichText bind:editor />
        </div>
        <!-- <textarea name="content" id="content" rows="5" /> -->
        <button type="submit">Add article</button>
    </form>
</div>
