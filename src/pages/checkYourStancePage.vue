<template>
    <div class="centered_content">
        <div class="content_title">
            Let's play!
        </div>
        <br>
        <span class="content_span">Do you want to see something cool? Let us guess your stance!</span>
        <div>
            <b-dropdown id="dropdown-1" text="Choose A Topic" class="select_topic">
                <b-dropdown-item  v-for="option in options"
                                  :key="option.value"
                                  :value="option.value"> {{option.text}}
                </b-dropdown-item>
            </b-dropdown>
        </div>
        <div class="centered_element">
            <b-form-input v-model="text" placeholder="Enter your stance"></b-form-input>
        </div>
        <b-button pill variant="info" size="md" style="margin-top: 20px">Check My Stance!</b-button>
    </div>
</template>

<script>
    export default {
        name: "checkYourStancePage",
        data(){
            return{
                options: [
                    { value: null, text: 'Topic1' },
                    { value: 'a', text: 'Topic2' },
                    { value: 'b', text: 'Topic3' },
                    { value: { C: '3PO' }, text: 'Topic4' },
                    { value: 'd', text: 'Topic5', disabled: true }
                ],
                text:''
            }

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
        margin-left: 28%;
        text-align: center;
        width: 600px;
    }

</style>
