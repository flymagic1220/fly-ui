<template>
  <div id="app">
    <!-- <FTable /> -->
    <!-- <FForm /> -->
    <test-file />
  </div>
</template>

<script>
// import FTable from './table/FTableValidate.vue'
// import FForm from './form/FFormValidate.vue'
import testFile from './bigFile/testFile.vue'
export default {
  name: 'App',
  components: { testFile },
  data() {
    return {}
  }
}
</script>
