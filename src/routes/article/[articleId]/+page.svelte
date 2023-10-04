<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ article } = data);

    function convertDataToHtml(blocks: string) {
        let convertedHtml = "";
        let content = JSON.parse(blocks);
        content.blocks.map((block) => {
            switch (block.type) {
                case "header":
                    convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                    break;
                case "paragraph":
                    convertedHtml += `<p>${block.data.text}</p>`;
                    break;
                case "list":
                    convertedHtml += "<ul>";
                    block.data.items.forEach((li) => {
                        convertedHtml += `<li>${li}</li>`;
                    });
                    convertedHtml += "</ul>";
                    break;
                // Add more cases as needed for other block types
                default:
                    console.log("Unknown block type", block.type);
                    break;
            }
        });
        return convertedHtml;
    }

    let content = convertDataToHtml(data.article.content);
</script>

<h1>{article.title}</h1>
<div>
    {@html content}
</div>
