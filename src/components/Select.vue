<template>
    <div class="form-control">
        <label :for="id">{{label}}</label>
        <select :id="id" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
            <option
                v-for="option in selectList"
                :value="option.value"
                :key="option.value"
            >{{option.text}}</option>
        </select>
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
      default: uuid('select')
    },
    selectList: {
      type: Array,
      required: true,
      validators (value) {
        return Boolean(value.length)
      }
    }
  }
}
</script>
