<template>
    <div id="app">
        <Navbar title="EPD">
            <NavbarLink to="/" :active="$route.path === '/'">Home</NavbarLink>
            <NavbarLink to="/patient/dossier" :active="$route.path === '/patient/dossier'">Mijn dossier</NavbarLink>
            <NavbarLink to="/patient" :active="$route.path === '/patient'">Contact gegevens</NavbarLink>
            <NavbarLink to="/settings" :active="$route.path === '/settings'">Instellingen</NavbarLink>
        </Navbar>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import store from 'renderer/vuex/store';
    import Navbar from './components/Shared/Bootstrap/Navbar/Navbar';
    import NavbarLink from './components/Shared/Bootstrap/Navbar/NavbarLink';

    export default {
        store,

        components: {
            Navbar,
            NavbarLink
        }
    }
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Lato:300);

    * {
        margin: 0;
        padding: 0;
    }

    html,
    body {
        height: 100%;
        width: 100%
    }
</style>
