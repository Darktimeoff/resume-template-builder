<template>
    <button
        class="btn"
        :class="classNames"
        :disabled="isDisabled"
        @click="$emit('action', $event)"
    ><slot></slot></button>
</template>
<script>
export default {
  props: {
    classNames: {
      type: [String, Object, Array],
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['action']
}
</script>
