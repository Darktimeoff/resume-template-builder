<template>
    <li class="list-item">
        <div>
            <p><strong>{{email}}</strong></p>
            <small>{{comment}}</small>
        </div>
    </li>
</template>
<script>
export default {
  props: {
    email: String,
    comment: String
  }
}
</script>
