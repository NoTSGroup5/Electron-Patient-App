export default [
    {
        path: '/',
        name: 'home',
        component: require('./components/Home/LandingPageView')
    },
    {
        path: '/patient',
        name: 'patient',
        component: require('components/Patient/Patient')
    }, {
        path: '/patient/dossier',
        name: 'dossier',
        component: require('components/Patient/Dossier')
    },
    {
        path: '/settings',
        name: 'settings',
        component: require('components/Patient/Settings')
    },
    {
        path: '*',
        redirect: '/'
    }
]
