<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <pieChart :data="data"/>
  </div>
</template>
<script>
import pieChart from "../components/pieChart.vue"

export default {
  name: "About",
  components: {
    pieChart
  },
   data() {
    return {
      data: []
    }
  },
};
</script>
