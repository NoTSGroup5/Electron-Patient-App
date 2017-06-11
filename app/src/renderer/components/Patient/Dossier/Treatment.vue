<template>
    <tr>
        <td>{{ treatment.description }}</td>
        <td>{{ treatment.startDate | formatDate }}  {{treatment.endDate? " - " : "" }}  {{treatment.endDate | formatDate }}</td>
        <td><a v-on:click="showLogs">Weergeven</a></td>
    </tr>
</template>

<script>
    export default {
        props: {
            treatment: {
                id: String,
                description: String,
                startDate: String
            }
        },
        methods: {
            showLogs(){
                this.$emit('showLogs', this.treatment)
            }
        }
    }
</script>

<style scoped>
</style>
