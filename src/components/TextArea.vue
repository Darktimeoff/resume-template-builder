<template>
    <div class="form-control">
        <label :for="id">{{ label }}</label>
        <textarea
            :id="id"
            rows="3"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>
<script>
import { uuid } from '@/utils.js'

export default {
  props: {
    label: String,
    modelValue: String,
    id: {
      type: String,
      default: uuid('textarea')
    }
  }
}
</script>
