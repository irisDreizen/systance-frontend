<template>
    <b-form-checkbox
            id="checkbox-1"
            v-model="status"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
    >
        I accept the terms and use
    </b-form-checkbox>
</template>

<script>
    export default {
        name: "ChooseAlgorithmPage"
    }
</script>

<style scoped>

</style>
