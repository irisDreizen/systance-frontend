<template>
  <div class="background">
    <div class="centered_content">
        <br>
        <br>
        <div class="content_title">
            RUN ALGORITHMS
        </div>
        <span style="font-size: 20px" class="content_span">In this page, the magic happens!</span>
        <br>
        <br>
        <span style="font-size: 15px" class="content_span">Here, you can choose a dataset which we provide you, or add your own one, and choose several algorithms to run with it.</span>
        <br>
        <span style="font-size: 15px" class="content_span">If you would like more information about the datasets or the algorithms, you can click the info button.</span>
        <br>
        <br>
        <span style="font-size: 15px" class="content_span">Please notice that some of the algorithms may take a long time to run, so we highly recommend that you enter your email at the bottom of the page, and we will send you an email as soon as the algorithms will finish running.</span>
        <br>
        <br>
        <div class="mt-3">
            <b-card-group deck>
                <b-card bg-variant="Light" text-variant="white" header="CHOOSE A DATASET" class="card" style="margin-left: 30px;" header-class="header_class">
                    <div class="form-group">
                        <div v-for="(dataset,index) in datasets" :key="index">
                            <input name="status"  type="radio" :value="dataset" v-model="chosenDataset" :disabled="chooseOwnFile" style="font-size: 20px"/> {{dataset}}
                            <b-icon icon="exclamation-circle-fill" variant="warning" style="margin-left: 10px" v-b-tooltip="'click for more information and statistics of the data'" v-on:click="moveToDatasetPage(dataset)"></b-icon>
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
                        <span>Please notice that you have to add a CSV file with the the exact following columns names: Claim, Sentence, Stance (first letter in upper case), otherwise the program won't run.</span>
                        <br>
                        <br>
                            <b-form-file
                                    v-model="file"
                                    :state="Boolean(file)"
                                    placeholder="Choose a file or drop it here..."
                                    drop-placeholder="Drop file here..."
                                    @input="setUploadFile()"
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

                <b-card bg-variant="Light" text-variant="white" header="CHOOSE AN ALGORITHM" class="card"  style="margin-right: 30px" header-class="header_class">
<!--                    <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>-->
                    <div class="custom-control custom-switch" v-for="(algorithm, index) in algorithms" :key="index" >
                        <input
                                type="checkbox"
                                @click="clickOnOptionalAlgorithm(index)"
                        >
                        <label>
                            {{ algorithm}}
                        </label>
                        <b-icon icon="exclamation-circle-fill" variant="warning" style="margin-left: 10px" v-b-tooltip="'click for more information about the algorithm'" v-on:click="openModal(algorithm)"></b-icon>
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
        Enter train data percent (number between 1 to 100): <input style="border-radius: 10px" v-model="trainPercent"/>
<!--        <b-form-input v-model="trainPercent" id="input-small" size="md" placeholder="Train data percent" class="centered_input"></b-form-input>-->
        <br>
        <br>
        <b-form-checkbox v-model="chooseEmailFile">
            I would like to receive an email when the run has completed
            <input class="centered_content" style="border-radius: 10px; width: 350px; margin: 0 auto" v-model="clientEmail" placeholder="Enter email" v-show="chooseEmailFile"/>
        </b-form-checkbox>
<!--        <div class="centered_input">-->
<!--            <input class="centered_content" style="border-radius: 10px; width: 350px; margin: 0 auto" v-model="clientEmail" placeholder="Enter email" v-show="chooseEmailFile"/>-->
<!--&lt;!&ndash;            <b-form-input&ndash;&gt;-->
<!--&lt;!&ndash;                    v-model="clientEmail"&ndash;&gt;-->
<!--&lt;!&ndash;                    type="email"&ndash;&gt;-->
<!--&lt;!&ndash;                    placeholder="Enter email"&ndash;&gt;-->
<!--&lt;!&ndash;                    v-show="chooseEmailFile"&ndash;&gt;-->
<!--&lt;!&ndash;            ></b-form-input>&ndash;&gt;-->
<!--        </div>-->
        <b-button v-show="!loading" pill variant="info" size="md" style="margin-top: 20px" v-on:click="runModels">Run and compare!</b-button>
        <div v-show=loading>
            <span class="content_title">Loading...</span></div>
        <br>
        <br>
        <br>
        <b-alert fade dismissible variant="primary" :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">You have to mark at least one algorithm and one dataset</b-alert>
        <b-alert fade dismissible variant="primary" :show="showDismissibleAlert_email" @dismissed="showDismissibleAlert_email=false">Please enter a valid email</b-alert>
        <b-alert fade dismissible variant="primary" :show="showDismissibleAlert_trainPercent" @dismissed="showDismissibleAlert_trainPercent=false">Train percent must be in range of 1-100</b-alert>
        <b-alert fade dismissible variant="danger" :show="showDismissibleAlert_backendError" @dismissed="showDismissibleAlert_backendErrorl=false" >{{backendErrorText}}</b-alert>
        <b-alert fade dismissible variant="danger" :show="showDismissibleAlert_invalidFile" @dismissed="showDismissibleAlert_invalidFile=false" >File must be a csv file</b-alert>
        <b-alert fade dismissible variant="danger" :show="showDismissibleAlert_fileType" @dismissed="showDismissibleAlert_fileType=false" >You must choose one file type (topic/headline based)</b-alert>
    </div>
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
                    {value:'topic_based', text: 'topic based', info: 'Topic based dataset means that you would like to check a stance regarding to a specific topic (or several topics). An example for a topic might be Donald Trump'},
                    {value: 'headline_based', text: 'headline based', info: 'Headline based dataset means that your data was taken from articles and includes headlines and text/body, and you would like to find out what the stance of the headline is.' }],
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
                showDismissibleAlert_trainPercent:false,
                showDismissibleAlert_invalidFile:false,
                showDismissibleAlert_fileType: false,
                modalAlgorithmData:'',
                modalAlgorithmInfo:'',
                backendErrorText:'',
                loading: false,
                validFile: true

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
                    "http://127.0.0.1:5000/algo_names"
                );
                this.algorithms=[]
                this.algorithms.push(...response.data)
                this.chosenAlgorithms = new Array(this.algorithms.length)

            },
            async getDatasetsNames() {
                const response = await this.axios.get(
                    "http://127.0.0.1:5000/dataset_names"
                );
                this.datasets=response.data
            },
            async runModels() {
                let response = null;
                let id = null;
                try{
                    if (!this.chooseOwnFile && this.chosenDataset === '') {
                        this.showDismissibleAlert = true
                    } else if (!this.chosenAlgorithms.includes(1)) {
                        this.showDismissibleAlert = true;
                    } else if (this.chooseOwnFile && this.file === null) {
                        this.showDismissibleAlert = true
                    } else if (this.chooseEmailFile && this.clientEmail === '') {
                        this.showDismissibleAlert = true
                    } else if (this.chooseEmailFile && !this.validateEmail(this.clientEmail)) {
                        this.showDismissibleAlert_email = true
                    } else if (this.chooseOwnFile && this.chosenFileType === '') {
                        this.showDismissibleAlert_fileType = true
                    }
                    else if (this.chooseOwnFile && this.validFile === false) {
                        this.showDismissibleAlert_invalidFile = true
                    }
                    else if(!this.checkInputNumber(this.trainPercent)){
                        this.showDismissibleAlert_trainPercent = true
                    }
                    else if (!this.chooseOwnFile) {
                        this.loading = true;
                        response = await this.runModels_ourDataset();
                        id = response.data;
                    } else {
                        this.loading = true;
                        response = await this.runModels_ownFile();
                        id = response.data;
                    }
                    if (this.showDismissibleAlert === false && this.showDismissibleAlert_email === false) {
                        console.log("response", response);
                        if (this.chooseEmailFile) {
                            this.$router.push({name: 'thanks'});
                        } else {
                            this.$router.push({
                                name: 'resultsPreview',
                                params: {resultId: id}
                            });
                        }
                    }
                }
                catch (e) {
                    this.loading = false;
                     this.backendErrorText = e.response.data;
                    this.showDismissibleAlert_backendError = true;
                }


            },
            async runModels_ownFile(){
                let formData = new FormData();
                formData.append('file', this.file);
                formData.append('email',this.clientEmail);
                formData.append('array', this.getChosenAlgorithmArray());
                formData.append('percent', this.trainPercent);
                formData.append('fileType', this.chosenFileType);

                const response = await this.axios.post('http://127.0.0.1:5000/add_dataset_run_model',
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    },
                );
                return response
            },
            async runModels_ourDataset(){
                let formData = new FormData();
                formData.append('email',this.clientEmail);
                formData.append('array', this.getChosenAlgorithmArray());
                formData.append('ds_name', this.chosenDataset);
                formData.append('percent', this.trainPercent);
                const response = await this.axios.post("http://127.0.0.1:5000/run_model",
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                },
                );
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
                    "http://127.0.0.1:5000/models_desc/"+algorithmName
                );
                this.modalAlgorithmData=algorithmName;
                this.modalAlgorithmInfo=response.data;
                this.$bvModal.show('bv-modal-example')
            },
            validateEmail(email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            },
            getChosenAlgorithmArray(){
                let algorithmsArray = [];
                let algorithmsArray_string ='';
                let i;
                let j;
                for (i = 0; i < this.chosenAlgorithms.length; i++) {
                    if(this.chosenAlgorithms[i]===1){
                        algorithmsArray.push(this.algorithms[i])
                    }
                }
                for (j=0 ; j<algorithmsArray.length; j++){
                    algorithmsArray_string = algorithmsArray_string + algorithmsArray[j] + ","
                }
                return algorithmsArray_string;
            },
            checkInputNumber(number){
                if(isNaN(number)){
                    return false;
                }
                return number >= 1 && number <= 100;

            },
            setUploadFile(){
                if (this.file.name.split(".").pop() == 'csv'){
                   this.validFile = true;
                }
                else {
                    this.validFile = false
                }
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
    .background{
      background: url("../assets/network.png");
      background-size: cover;
      background-position: center;
      min-height: 100%;
      min-width: 1024px;

      /* Set up proportionate scaling */
      width: 100%;
      height: auto;

      /* Set up positioning */

    }

    .card{
      background-color: rgba(0, 0, 0, 0.4);
    }
    .header_class{
        font-family: 'Bradley Hand', cursive;
        font-size: 25px;
    }

</style>
