<template>
    <tr>
        <td>{{visit.organisation.name}}</td>
        <td>{{visit.date | formatDate }} </td>
        <td>{{visit.description}}</td>
    </tr>
</template>

<script>
    export default {
        props: [
            'visit'
        ]
    }
</script>

<style scoped>
</style>