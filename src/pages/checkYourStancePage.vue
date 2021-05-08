<template>
    <div class="centered_content">
        <div class="content_title">
            Let's play!
        </div>
        <br>
        <span class="content_span">Do you want to see something cool? Let us guess your stance!</span>
        <div class="centered_element">
            <b-form-select v-model="chosenTopic" :options="options" aria-placeholder="Choose a topic"></b-form-select>
        </div>
        <div class="centered_element">
            <b-form-input v-model="text" placeholder="Enter your stance"></b-form-input>
        </div>
        <b-button pill variant="info" size="md" style="margin-top: 20px" v-on:click="checkStance">Check My Stance!</b-button>
        <br>
        <br>
        <b-alert fade dismissible variant="primary" :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">You should enter both topic and stance</b-alert>
        <span class="content_span" v-show="showStance">Your stance is: {{this.stance}}</span>
    </div>
</template>

<script>
    export default {
        name: "checkYourStancePage",
        created() {
            this.getTopics()
        },
        data(){
            return{
                options: [
                    { value: null, text: 'Select a topic', disabled: true },'a','b','c'
                ],
                text:'',
                chosenTopic:null,
                showDismissibleAlert: false,
                stance:'',
                showStance:false
            }
        },
        methods:{
            async getTopics(){
                const response = await this.axios.get(
                    "http://127.0.0.1:5000/get_topics"
                );
                this.options.push(...response.data)
            },
            async checkStance() {
                if (this.chosenTopic === null || this.text === '') {
                    this.showDismissibleAlert = true
                } else {
                    const response = await this.axios.get(
                        "http://127.0.0.1:5000/get_stance/"+this.text+"/"+this.chosenTopic
                    );
                    this.stance = response.data;
                    this.showStance=true
                }

            },
        }
    }

</script>

<style scoped>
    .content_title {
        font-family: 'Bradley Hand', cursive;
        font-weight: bold;
        font-size: 40px;
    }
    .content_span {
        font-family: 'Bradley Hand', cursive;
        font-size: 20px;
        margin: 60px;
    }
    .centered_content{
        margin: 50px;
        text-align: center;
    }
    .select_topic{
        margin: 30px;
    }
    .centered_element{
        margin-left: 18%;
        margin-top: 20px;
        text-align: center;
        width: 600px;
    }

</style>
