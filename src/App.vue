<template>
  <div class="container column">
    <form class="card card-w30" @submit.prevent="onAddBtnClick">
      <Select
        label="Тип блока"
        id="type"
        :selectList="selectList"
        v-model="componentType"
      />
      <TextArea
        label="Значение"
        v-model.trim="componentValue"
      />
      <Button
        classNames="primary"
        :isDisabled="disabledAddBtn"
      >Добавить</Button>
    </form>

    <div class="card card-w70">
      <div v-if="componentsList.length">
        <component
          v-for="component in componentsList"
          :key="component.value"
          :is="component.type"
          :value="component.value"
        >
        </component>
      </div>
      <Text v-else
        value="Попробуйте создать свое резюме, это очень легко"
       />
    </div>
  </div>
  <div class="container">
    <UserNotification
      v-if="notification"
      :notification="notification"
      @close="notification = null"
    />
    <Loader
      v-if="loading"
    />
    <p
      v-else-if="!commentsList.length"
    >
      <Button
        classNames="primary"
        @action="loadComments"
      >Загрузить комментарии</Button>
    </p>
    <div
     v-else
     class="card">
      <Subtitle
        value="Комментарии"
      />
      <List>
        <Listitem
          v-for="comment in commentsList"
          :key="comment.id"
          :email="comment.email"
          :comment="comment.comment"
        />
      </List>
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select'
import TextArea from '@/components/TextArea'
import Button from '@/components/Button'
import Title from '@/components/Title'
import Avatar from '@/components/Avatar'
import Subtitle from '@/components/Subtitle'
import Text from '@/components/Text'
import Loader from '@/components/Loader'
import List from '@/components/List'
import Listitem from '@/components/Listitem'
import UserNotification from '@/components/UserNotification'
import { callREST } from '@/utils.js'

export default {
  components: {
    Select,
    TextArea,
    Button,
    Title,
    Avatar,
    Subtitle,
    Text,
    Loader,
    List,
    Listitem,
    UserNotification
  },
  data () {
    return {
      selectList: [
        { value: 'title', text: 'Заголовок' },
        { value: 'subtitle', text: 'Подзаголовок' },
        { value: 'avatar', text: 'Аватар' },
        { value: 'text', text: 'Текст' }
      ],
      componentTypeDefault: 'title',
      componentType: 'title',
      componentValue: '',
      componentsList: [],
      commentsList: [],
      loading: false,
      notification: false
    }
  },
  computed: {
    disabledAddBtn () {
      return this.componentValue.length <= 3
    }
  },
  methods: {
    createComponentDescrObj () {
      return {
        type: this.componentType,
        value: this.componentValue
      }
    },
    transformCommentObj (respComment) {
      return {
        comment: respComment.body,
        email: respComment.email,
        id: respComment.id
      }
    },
    onAddBtnClick () {
      this.componentsList.push(this.createComponentDescrObj())
      this.componentValue = ''
      this.componentType = this.componentTypeDefault
    },
    async loadComments () {
      try {
        this.loading = true

        const response = await callREST('https://jsonplaceholder.typicode.com/comments?_limit=5')

        this.commentsList = response.map(this.transformCommentObj)
      } catch (e) {
        this.notification = {
          type: 'danger',
          title: 'Упс, произошла не предвиденная ошибка :)',
          text: e.message
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
  .avatar {
    display: flex;
    justify-content: center;
  }

  .avatar img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }
</style>
