<template>
  <div :style="{ opacity: number / 300 }">
    <IviewPage/>
  </div>
</template>

<script>
import IviewPage from '../IviewPage.vue'
export default {
  props: ['number'],
  components:{
    IviewPage
  }
}
</script>
