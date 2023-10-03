<script>
    import { onMount } from "svelte";

    export let editor;

    onMount(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const ImageTool = (await import("@editorjs/image")).default;

        editor = new EditorJS({
            /**
             * Id of Element that should contain the Editor
             */
            holder: "editorjs",

            /**
             * Available Tools list.
             * Pass Tool's class or Settings object for each Tool you want to use
             */
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ["link"],
                    config: {
                        placeholder: "Enter a header",
                        levels: [1, 2, 3, 4],
                        defaultLevel: 1,
                    },
                    shortcut: "CMD+SHIFT+H",
                },
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
                            byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
                        },
                    },
                },
                // inlineToolbar: ["link", "marker", "bold", "italic"],
                // ...
            },
        });
    });
</script>

<div id="editorjs" style="border: 1px solid #374956; border-radius: 0.25rem;" />
