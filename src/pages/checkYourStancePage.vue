<template>
    <div class="centered_content">
        <br>
        <div class="content_title">
            Let's play!
        </div>
        <br>
        <span class="content_span">Do you want to see something cool? Let us guess your stance!</span>
        <br>
        <br>
        <span class="content_span_smaall_margin">Choose model to run:</span>
        <select v-model="algorithmName" style="border-radius: 10px">
            <option v-for="algorithm in algorithms" :key="algorithm">{{algorithm}}</option>
        </select>
        <b-icon v-show="algorithmName!=''" icon="exclamation-circle-fill" variant="info" style="margin-left: 10px" v-b-tooltip="'click for more information about the algorithm'" v-on:click="openModal()"></b-icon>

        <div>
            <b-modal id="bv-modal-example" hide-footer>
                <template #modal-title>
                    {{modalAlgorithmData}}
                </template>
                <div class="d-block text-center">
                    {{modalAlgorithmInfo}}
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Got it!</b-button>
            </b-modal>
        </div>
<!--        <div class="centered_element">-->
<!--            <b-form-select  size="sm" v-model="chosenTopic" :options="options" aria-placeholder="Choose a topic"></b-form-select>-->
<!--        </div>-->
<!--        <b-dropdown class="m-md-2" :text="chosenTopic">-->
<!--            <b-dropdown-item v-for="option in options" :key="option" v-on:click="this.chosenTopic=option">{{option}} </b-dropdown-item>-->
<!--        </b-dropdown>-->
        <span class="content_span_smaall_margin">Choose a topic:</span>
        <select v-model="chosenTopic" style="border-radius: 10px">
            <option disabled hidden>Choose a topic</option>
            <option v-for="option in options" :key="option">{{option}}</option>
        </select>
        <br>
        <input style="border-radius: 10px; width: 600px; height: 30px; margin: 20px auto; text-align: center" v-model="sentence" placeholder="Enter your sentence"/>

<!--        <div class="centered_element">-->
<!--            <b-form-input style="text-align: center" v-model="text" placeholder="Enter your stance"></b-form-input>-->
<!--        </div>-->
        <br>
        <b-button v-show="!loading" pill variant="info" size="md" style="margin-top: 20px" v-on:click="checkStance">Check My Stance!</b-button>
        <div v-show=loading>
            <span class="content_title">Loading...</span></div>
        <br>
        <b-alert fade dismissible variant="primary" :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">You should enter both topic and stance</b-alert>
        <b-alert fade dismissible variant="primary" :show="showDismissibleAlert_specialChars" @dismissed="showDismissibleAlert_specialChars=false">The sentence should contain only letters, without special chars</b-alert>
        <b-alert fade dismissible variant="primary" :show="showDismissibleAlert_chooseAlgorithm" @dismissed="showDismissibleAlert_chooseAlgorithm=false">You need to choose one algorithm</b-alert>


        <div v-show="showStance">
            <br>
            <span class="content_span" >Your stance is: {{this.stance}}</span>
            <br>
        </div>
        <br>
      <img src="../assets/stance.png" alt="Italian Trulli" width="520" height="257">

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
                sentence:'',
                chosenTopic:null,
                showDismissibleAlert: false,
                stance:'',
                showStance:false,
                loading: false,
                showDismissibleAlert_specialChars: false,
                modalAlgorithmData: '',
                modalAlgorithmInfo: '',
                algorithmName: '',
                algorithms: ['SEN', 'TRANSFORMER'],
                showDismissibleAlert_chooseAlgorithm: false

            }
        },
        methods:{
            async getTopics(){
                const response = await this.axios.get(
                    "http://127.0.0.1:5000/get_topics"
                );
                this.options = response.data
            },
            async checkStance() {
                this.showStance = false;
                if (this.chosenTopic === null || this.sentence === '') {
                    this.showDismissibleAlert = true
                }
                else if(this.algorithmName == ''){
                    this.showDismissibleAlert_chooseAlgorithm = true
                }
                else if(!this.hasNoSpecialChars(this.sentence)){
                    this.showDismissibleAlert_specialChars = true
                }
                else {
                    this.loading = true;
                    const response = await this.axios.get(
                        "http://127.0.0.1:5000/get_stance/"+this.sentence+"/"+this.chosenTopic+"/"+this.algorithmName
                    );
                    this.stance = response.data;
                    this.loading = false;
                    this.showStance=true

                }

            },
            hasNoSpecialChars(string){
                let format = /^[a-zA-Z0-9- ,]*$/;
                return format.test(string);
            },
            async openModal(){
                if(this.algorithmName!=''){
                    const response = await this.axios.get(
                        "http://127.0.0.1:5000/models_desc/"+this.algorithmName
                    );
                    this.modalAlgorithmData=this.algorithmName;
                    this.modalAlgorithmInfo=response.data;
                    this.$bvModal.show('bv-modal-example')
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
    .content_span_smaall_margin {
        font-family: 'Bradley Hand', cursive;
        font-size: 20px;
        margin: 10px;
    }
    .centered_content{
        text-align: center;
        background-color: lightgrey;
        margin: auto;
        width: auto;
        height: 680px;
    }
    .select_topic{
        margin: 30px;
    }
    .centered_element{
        /*margin-left: 18%;*/
        margin-top: 20px;
        /*text-align: center;*/
        /*width: 600px;*/
    }
    .pic{
      background: url("../assets/stance.png");
    }

</style>
