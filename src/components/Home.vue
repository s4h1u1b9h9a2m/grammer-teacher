<template>
    <el-main>
      <el-row :gutter="20">
        Select Example from Navigation Menu
      </el-row>
    </el-main>
</template>

<script>
/* eslint-disable */
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = SpeechRecognition? new SpeechRecognition() : false

const writeGood = require('write-good');

export default {
  name: 'Main',
  data () {
    return {
      text: '',
      error: false,
      speaking: false,
      toggle: false,
      runtimeTranscription: '',
      sentences: [],
      timeline: []
    }
  },
  watch: {
    sentences (texts) {
      let text = texts[texts.length - 1]
      let suggestions = writeGood(text);
      if (suggestions && suggestions.length) {
        this.timeline.push({
          timestamp: new Date().toISOString(), //.substr(0, 10),
          text,
          suggestions
        })
      }
    }
  },
  computed: {
    listiningState () {
      if (this.toggle) {
        return "Listining"
      } else {
        return "Not Listining"
      }
    },
    speakingState () {
      if (this.speaking) {
        return "Speaking"
      } else {
        return "Not Speaking"
      }
    }
  },
  methods: {
    checkCompatibility () {
      if (!recognition) {
        this.error = 'Speech Recognition is not available on this browser. Please use Chrome or Firefox'
      }
    },
    endSpeechRecognition () {
      recognition.stop()
      this.toggle = false
      // this.$emit('speechend', {
      //   sentences: this.sentences,
      //   text: this.sentences.join('. ')
      // })
    },
    startSpeechRecognition () {
      if (!recognition) {
        this.error = 'Speech Recognition is not available on this browser. Please use Chrome or Firefox'
        return false
      }
      this.toggle = true
      recognition.lang = this.lang
      recognition.interimResults = true

      recognition.addEventListener('speechstart', event => {
        this.speaking = true
      })

      recognition.addEventListener('speechend', event => {
        this.speaking = false
      })

      recognition.addEventListener('result', event => {
        const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
        this.runtimeTranscription = text
      })

      recognition.addEventListener('end', () => {
        if (this.runtimeTranscription !== '') {
          this.sentences.push(this.capitalizeFirstLetter(this.runtimeTranscription))
          this.text = `${this.text}\n${this.sentences.slice(-1)[0]}. `
        }
        this.runtimeTranscription = ''
        recognition.stop()
        if (this.toggle) {
          // keep it going.
          recognition.start()
        }
      })
      recognition.start()
    },
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  },
  mounted () {
    this.checkCompatibility()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<style>
  .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
</style>

