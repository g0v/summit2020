<template lang="pug">
  a.extlink.underline.dim(:href="to" target="_blank" rel="noopener noreferrer")
    slot {{to}}
</template>
<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>
