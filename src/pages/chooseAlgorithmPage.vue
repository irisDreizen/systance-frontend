<template>
    <div class="centered_content">
        <div class="content_title">
            Comparing Algorithms
        </div>
        <br>
        <span class="content_span">In this page, the magic happens!</span>
        <br>
        <br>
        <span class="content_span">Here, you can choose a dataset which we provide you, or your own one, and choose several algorithms to run on it.</span>
        <br>
        <span class="content_span">If you need more information about the datasets or the algorithms, you can click the info button.</span>
        <br>
        <br>
        <span class="content_span">Please notice that some of the algorithms may take a long running time, so we highly recommend to enter your email at the buttom of the page, and we will send you a meassage as soon as the algorithms will finish running.</span>
        <br>
        <br>
        <div class="mt-3">
            <b-card-group deck>
                <b-card bg-variant="secondary" text-variant="white" header="Choose a dataset" class="text-center">
<!--                    <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>-->
                    <div class="form-group">
<!--                        <label>What is your current employment status?</label><br/>-->
                        <div v-for="dataset in datasets" :key="dataset.value">
                            <input name="status"  type="radio" :value="dataset.value" v-model="chosenDataset" :disabled="chooseOwnFile"/> {{dataset.text}}
                            <br/>
                        </div>
                    </div>
                    <b-form-checkbox
                            id="checkbox-1"
                            v-model="chooseOwnFile"
                            name="checkbox-1">
                        I would like to add my own csv file
                    </b-form-checkbox>
                    <br>
                    <span v-show="chooseOwnFile">Please notice that you have to add CSV file with the the exactly columns names: Claim, Sentence, Stance (first letter in upper case), otherwise the program won't run.</span>
                    <br>
                    <br>
                    <div v-show="chooseOwnFile">
                        <!-- Styled -->
                        <b-form-file
                                v-model="file1"
                                :state="Boolean(file1)"
                                placeholder="Choose a file or drop it here..."
                                drop-placeholder="Drop file here..."
                        ></b-form-file>
                    </div>
                </b-card>

                <b-card bg-variant="primary" text-variant="white" header="Choose an algorithm" class="text-center">
<!--                    <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>-->
                    <div class="custom-control custom-switch" v-for="(algorithm, index) in algorithms" :key="algorithm.value" >
                        <input
                                type="checkbox"
                                @click="clickOnOptionalAlgorithm(index)"
                        >
                        <label>
                            {{ algorithm.text }}
                        </label>
                    </div>
                </b-card>

            </b-card-group>
        </div>
        <br>
        <br>
        <b-form-checkbox v-model="chooseEmailFile">
            I would like to receive an email when running is completed
        </b-form-checkbox>
        <br>
        <div class="centered_element">
            <b-form-input
                    v-model="clientEmail"
                    type="email"
                    placeholder="Enter email"
                    v-show="chooseEmailFile"
            ></b-form-input>
        </div>
        <b-button pill variant="info" size="md" style="margin-top: 20px">Run and compare!</b-button>

    </div>
</template>

<script>
    export default {
        name: "ChooseAlgorithmPage",
        data(){
            return{
                options: [
                    { value: null, text: 'Topic1' },
                    { value: 'a', text: 'Topic2' },
                    { value: 'b', text: 'Topic3' },
                    { value: { C: '3PO' }, text: 'Topic4' },
                    { value: 'd', text: 'Topic5', disabled: true }
                ],
                algorithms: [
                    { value: 'alg1', text: 'alg1' },
                    { value: 'a;g2', text: 'alg2' },
                    { value: 'alg3', text: 'alg3' },
                ],
                chosenAlgorithms: new Array(10),
                datasets: [
                    { value: 'dataset1', text: 'dataset1' },
                    { value: 'dataset2', text: 'dataset2' },
                    { value: 'dataset3', text: 'dataset3' },
                ],
                text:'',
                chosenDataset:'',
                country:'',
                file1: null,
                chooseOwnFile: false,
                chooseEmailFile: false,
                clientEmail:''
            }

        },
        methods:{
            clickOnOptionalAlgorithm(index) {
                if(this.chosenAlgorithms[index]==1){
                    this.chosenAlgorithms[index]=0
                }else{
                    this.chosenAlgorithms[index]=1
                }
                console.log(this.chosenDataset)
            },

        }

    }
</script>

<style scoped>
    .content_title {
        font-family: 'Bradley Hand', cursive;
        font-weight: bold;
    }
    .centered_content{
        margin: 50px;
        text-align: center;
    }
    .centered_element{
        margin-left: 40%;
        text-align: center;
        width: 300px;
    }
    .content_buttons{
        margin: 50px;
    }
    .content_title {
        font-family: 'Bradley Hand', cursive;
        font-weight: bold;
        font-size: 40px;
    }
</style>
