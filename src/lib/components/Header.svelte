<script lang="ts">
    import Logo from "./Logo.svelte";
    export let user: any;
</script>

<nav>
    <ul>
        <li>
            <a href="/" style="color: var(--h3-color);"
                ><strong><Logo />SveltePress</strong></a
            >
        </li>
    </ul>
    <ul>
        {#if !user.userId}
            <li><a href="/auth/login">Login</a></li>
            <li><a href="/auth/register">Register</a></li>
        {:else}
            <li>{user.username}</li>
            {#if user.role === "ADMIN"}
                <li><a role="button" href="/admin">Admin</a></li>
            {/if}
            <li>
                <form action="/auth/logout" style="margin: 0" method="POST">
                    <button
                        type="submit"
                        class="outline"
                        style="padding: 9.5px;">Logout</button
                    >
                </form>
            </li>
        {/if}
    </ul>
</nav>
