<template>
  <div class="shake_info">
    <audio :src="shakeSrc"  ref="shakeaudioDom"></audio>
  </div>
</template>

<script>
import shakeAudio from '../shakeInfo/source/weather_shake.wav'
export default {
  data () {
    return {
      shakeSrc: shakeAudio
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
