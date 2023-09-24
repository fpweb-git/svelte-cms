<script>
    import Logo from "./Logo.svelte";
</script>

<nav>
    <ul>
        <li>
            <a href="/" style="color: var(--h3-color);"
                ><strong><Logo />Blog starter</strong></a
            >
        </li>
    </ul>
    <ul>
        <li><a href="/admin">Admin</a></li>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/register">Register</a></li>
    </ul>
</nav>
