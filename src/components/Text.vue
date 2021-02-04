<template>
    <p><slot>{{ value }}</slot></p>
</template>
<script>
export default {
  props: ['value']
}
</script>
