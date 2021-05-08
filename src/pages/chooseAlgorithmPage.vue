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
                <b-card bg-variant="primary" text-variant="white" header="Choose a dataset" class="text-center">
<!--                    <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>-->
                    <div class="form-group">
<!--                        <label>What is your current employment status?</label><br/>-->
                        <div v-for="(dataset,index) in datasets" :key="index">
                            <input name="status"  type="radio" :value="dataset" v-model="chosenDataset" :disabled="chooseOwnFile"/> {{dataset}}
                            <b-icon icon="exclamation-circle-fill" variant="warning" style="margin-left: 10px" v-b-tooltip="'click for more statistic of the data'" v-on:click="moveToDatasetPage(dataset)"></b-icon>
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
                                v-model="file"
                                :state="Boolean(file)"
                                placeholder="Choose a file or drop it here..."
                                drop-placeholder="Drop file here..."
                        ></b-form-file>
                    </div>
                </b-card>

                <b-card bg-variant="secondary" text-variant="white" header="Choose an algorithm" class="text-center">
<!--                    <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>-->
                    <div class="custom-control custom-switch" v-for="(algorithm, index) in algorithms" :key="index" >
                        <input
                                type="checkbox"
                                @click="clickOnOptionalAlgorithm(index)"
                        >
                        <label>
                            {{ algorithm}}
                        </label>
                        <b-icon icon="exclamation-circle-fill" variant="warning" style="margin-left: 10px" v-b-tooltip="'click for more information about of the algorithm'"></b-icon>
                    </div>
                </b-card>

            </b-card-group>
        </div>
        <br>
        <b-form-input v-model="trainPercent" id="input-small" size="md" placeholder="Enter train data percent" class="centered_input"></b-form-input>
        <br>
        <b-form-checkbox v-model="chooseEmailFile">
            I would like to receive an email when running is completed
        </b-form-checkbox>
        <br>
        <div class="centered_input">
            <b-form-input
                    v-model="clientEmail"
                    type="email"
                    placeholder="Enter email"
                    v-show="chooseEmailFile"
            ></b-form-input>
        </div>
        <b-button pill variant="info" size="md" style="margin-top: 20px" v-on:click="runModels">Run and compare!</b-button>
        <br>
        <br>
        <b-alert fade dismissible variant="primary" :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false" >You have to mark at least on algorithm and one dataset</b-alert>


    </div>
</template>

<script>
    export default {
        name: "ChooseAlgorithmPage",
        data(){
            return{
                algorithms: [
                    'alg1', 'alg2', 'alg3'
                ],
                chosenAlgorithms: new Array(10),
                datasets: [
                    'dataset1','dataset2', 'dataset3'
                ],
                text:'',
                chosenDataset:'',
                country:'',
                file: null,
                chooseOwnFile: false,
                chooseEmailFile: false,
                clientEmail:'',
                trainPercent:'',
                visible:false,
                showDismissibleAlert: false,
                showDismissibleAlert_trainPercent: false


            }

        },
        created() {
            // this.getAlgorithmsNames()
            // this.getDatasetsNames()
        },
        methods:{
            clickOnOptionalAlgorithm(index) {
                console.log("index", index)
                if(this.chosenAlgorithms[index]==1){
                    this.chosenAlgorithms[index]=0
                }else{
                    this.chosenAlgorithms[index]=1
                }
                console.log(this.chosenAlgorithms)
            },
            async getAlgorithmsNames() {
                const response = await this.axios.get(
                    "http://localhost:5000/algo_names"
                );
                this.algorithms=[]
                this.algorithms.push(...response.data)
            },
            async getDatasetsNames() {
                const response = await this.axios.get(
                    "http://localhost:5000/dataset_names"
                );
                this.datasets=response.data
            },
            async submitFile() {
                let formData = new FormData();
                formData.append('file', this.file);
                console.log('>> formData >> ', formData);

                // You should have a server side REST API
                const response = await this.axios.post('http://localhost:3000/fileCheck',
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                return response.data
            },
            runModels() {
                console.log("alertvariant:",this.alertvariant)
                if(!this.chooseOwnFile && this.chosenDataset===''){
                    this.showDismissibleAlert=true
                }
                else if(!this.chosenAlgorithms.includes(1))
                    this.showDismissibleAlert=true;
                else if(this.chooseOwnFile && this.file===null){
                    this.showDismissibleAlert=true
                }
                else if(this.chooseEmailFile && this.clientEmail===''){
                    this.showDismissibleAlert=true
                }
                else if(!this.chooseOwnFile){
                    // const response = await this.axios.post("http://localhost:3000/runModel", {
                    //     email: this.clientEmail,
                    //     array: this.chosenAlgorithms,
                    //     ds_name: this.chosenDataset,
                    //     percent: this.trainPercent
                    // });
                }
                else{
                    //sending dataset from client - check how to do it!
                }
                if(this.chooseEmailFile){
                    this.$router.push({name: 'thanks'});
                }
                else{
                    //redirecting to result page - check how to redirect!
                }
            },
            moveToDatasetPage(datasetName){

            }


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
    .centered_input{
        margin-left: 32%;
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
