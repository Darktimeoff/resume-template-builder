<template>
    <div class="alert" :class="notification.type">
        <Subtitle :value="notification.title"/>
        <Text :value="notification.text"/>
        <Button
            :classNames="notification.type"
            @click="$emit('close')"
        >Закрыть</Button>
    </div>
</template>
<script>
import Subtitle from '@/components/Subtitle'
import Text from '@/components/Text'
import Button from '@/components/Button'

export default {
  components: {
    Subtitle,
    Text,
    Button
  },
  props: ['notification'],
  emits: ['close']
}
</script>
