<template>
    <el-main>
        <el-row :gutter="20" v-if="error">
            Error Initializing Mic
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
            <el-button 
                :icon="(toggle?'el-icon-turn-off-microphone': 'el-icon-microphone')" circle 
                :loading="speaking"
                @click.stop="toggle ? stop() : initialize()"
            ></el-button>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
export default {
    name: 'MediaStreamAPI',
    data () {
        return {
            error: false,
            toggle: false,
            speaking: false,
            myStream: null,
            scriptProcessor: null,
            ConversionFactor: 2 ** (16 - 1) - 1,
            socket: null
        }
    },
    created () {
       this.initializeSocket()
    },
    methods: {
        initialize () {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.mediaDevices.getUserMedia(
                {	
                audio: {
                mandatory: {
                    googEchoCancellation: 'false',
                    googAutoGainControl: 'false',
                    googNoiseSuppression: 'false',
                    googHighpassFilter: 'false',
                    },
                },
            }).then(this.startRecording)
                .catch( e => {
                    this.error = true
                    console.log(e);
                }
            );
        },
        startRecording(stream, callback) {
            let audioContext = audioContext || new AudioContext();
            if (!audioContext) {
                return;
            }
            this.myStream = stream;

            // AudioNode used to control the overall gain (or volume) of the audio graph
            
            const inputPoint = audioContext.createGain();
            const microphone = audioContext.createMediaStreamSource(this.myStream);
            const analyser = audioContext.createAnalyser();
            this.scriptProcessor = inputPoint.context.createScriptProcessor(2048, 2, 2);

            microphone.connect(inputPoint);
            inputPoint.connect(analyser);
            inputPoint.connect(this.scriptProcessor);
            this.scriptProcessor.connect(inputPoint.context.destination);
            // This is for registering to the “data” event of audio stream, without overwriting the default scriptProcessor.onAudioProcess function if there is one.
            this.scriptProcessor.addEventListener('audioprocess', this.streamAudioData);
        },
        stop () {
            if (this.myStream) {
                // stop the browser microphone
                this.myStream.getTracks()[0].stop();
                this.myStream = null;
            }
            if (this.scriptProcessor) {
                // Stop listening the stream from the michrophone
                this.scriptProcessor.removeEventListener('audioprocess', this.streamAudioData);
            }
        },
        streamAudioData (stream) {
            const floatSamples = stream.inputBuffer.getChannelData(0);
             // HERE GOES THE CODE TO SEND THE CHUNKED DATA FROM STREAM
             this.streamAudioToBackend(floatSamples)
        },
        initializeSocket () {

        },
        streamAudioToBackend (samples) {
            this.socket.send(Int16Array.from(samples.map(n => n * MAX_INT)));
        },
        
    }
}
</script>

<style>

</style>
