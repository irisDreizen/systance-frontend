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
                    <div class="form-group">
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
                    <div v-show="chooseOwnFile">
                        <br>
                        <span>Please notice that you have to add CSV file with the the exactly columns names: Claim, Sentence, Stance (first letter in upper case), otherwise the program won't run.</span>
                        <br>
                        <br>
                            <b-form-file
                                    v-model="file"
                                    :state="Boolean(file)"
                                    placeholder="Choose a file or drop it here..."
                                    drop-placeholder="Drop file here..."
                            ></b-form-file>
                        <br>
                        <br>
                        <span >What is the type of your dataset?</span>
                        <br>
                        <div v-for="(fileType,index) in fileTypes" :key="index">
                            <input name="status"  type="radio" :value="fileType.value" v-model="chosenFileType" /> {{fileType.text}}
                            <b-icon icon="exclamation-circle-fill" variant="warning" style="margin-left: 10px" v-b-tooltip="fileType.info"></b-icon>
                            <br/>
                        </div>
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
                        <b-icon icon="exclamation-circle-fill" variant="warning" style="margin-left: 10px" v-b-tooltip="'click for more information about of the algorithm'" v-on:click="openModal(algorithm)"></b-icon>
                    </div>
                </b-card>

            </b-card-group>
        </div>
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
        <b-alert fade dismissible variant="primary" :show="showDismissibleAlert_email" @dismissed="showDismissibleAlert_email=false" >Please enter a valid email</b-alert>
        <b-alert fade dismissible variant="danger" :show="showDismissibleAlert_backendError" @dismissed="showDismissibleAlert_backendErrorl=false" >{{backendErrorText}}</b-alert>

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
                fileTypes:[
                    {value:'topic_based', text: 'topic based', info: 'Topic based dataset mean that you whould like to check a stance regarding to specific topic. An example for a topic might be Donald Trump'},
                    {value: 'headline_based', text: 'headline based', info: 'Headline based dataset means that you you have a headline, and you would like to find out what the stance of the headline regarding to another text(article for example)' }],
                chosenFileType:'',
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
                showDismissibleAlert_email: false,
                showDismissibleAlert_backendError: false,
                modalAlgorithmData:'',
                modalAlgorithmInfo:'',
                backendErrorText:''
            }

        },
        created() {
            this.getAlgorithmsNames()
            this.getDatasetsNames()
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
            runModels() {
                let response=null;
                let id=null;
                if(!this.chooseOwnFile && this.chosenDataset===''){
                    this.showDismissibleAlert=true
                }
                else if(!this.chosenAlgorithms.includes(1)){
                    this.showDismissibleAlert=true;
                }
                else if(this.chooseOwnFile && this.file===null){
                    this.showDismissibleAlert=true
                }
                else if(this.chooseEmailFile && this.clientEmail===''){
                    this.showDismissibleAlert=true
                }
                else if(this.chooseEmailFile && !this.validateEmail(this.clientEmail)){
                    this.showDismissibleAlert_email = true
                }
                else if(this.chooseOwnFile && this.chosenFileType===''){
                    this.showDismissibleAlert=true
                }
                else if(!this.chooseOwnFile){
                    response = this.runModels_ourDataset()
                    id = response.data;
                }
                else{
                    response = this.runModels_ownFile()
                    id = response.data;
                }
                if(response.status === 501){
                    this.showDismissibleAlert_backendError=true
                }
                else if(this.showDismissibleAlert===false && this.showDismissibleAlert_email===false){
                    if(this.chooseEmailFile){
                        this.$router.push({name: 'thanks'});
                    }
                    else{
                        this.$router.push({
                            name: 'results',
                            params: { resultId: id }
                        });
                    }
                }

            },
            async runModels_ownFile(){
                let formData = new FormData();
                formData.append('file', this.file);
                formData.append('email',this.clientEmail);
                formData.append('array', JSON.stringify(this.chosenAlgorithms));
                formData.append('percent', this.trainPercent);
                formData.append('fileType', this.chosenFileType);

                const response = await this.axios.post('http://localhost:3000/runModel_ownFile',
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    },
                );
                return response
            },
            async runModels_ourDataset(){
                const response = await this.axios.post("http://localhost:3000/runModel_ourDataSet", {
                    email: this.clientEmail,
                    array: this.chosenAlgorithms,
                    ds_name: this.chosenDataset,
                    percent: this.trainPercent,
                });
                return response
            },
            moveToDatasetPage(datasetName){
                this.$router.push({
                    name: 'datasetInfo',
                    params: { datasetName: datasetName }
                });
            },
            async openModal(algorithmName){
                const response = await this.axios.get(
                    "http://localhost:5000/algoInfo/"+algorithmName
                );
                this.modalAlgorithmData=algorithmName;
                this.modalAlgorithmInfo=response.data;
                this.$bvModal.show('bv-modal-example')
            },
            validateEmail(email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
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
