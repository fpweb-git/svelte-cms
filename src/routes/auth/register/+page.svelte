<script lang="ts">
    // import type { ActionData } from "./$types";
    // export let form: ActionData;
</script>

<main>
    <h1>Register</h1>
    <form action="?/registerUser" method="POST">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" />
        <label for="email">Email</label>
        <input type="email" id="email" name="email" />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" />
        <label for="confirmPassword">Confirm password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
        <button type="submit">Register</button>
    </form>
</main>

<style>
    main {
        max-width: 640px;
        margin: 0 auto;
    }
</style>
