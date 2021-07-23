<template>
  <div class="home">
    <Content msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Content from '@/components/Content.vue'

export default {
  name: 'Home',
  components: {
    Content
  }
}
</script>
