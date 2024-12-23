<script setup lang="ts">
import { computed, ref } from 'vue'
import FormModalPost from '@/components/post/FormModalPost.vue'
import ItemPost from '@/components/post/ItemPost.vue'
import { usePostDelete, usePostList } from '@/composables/post.api'
import type { PostT } from '@/types/post.type'
import { templateRef } from '@vueuse/core'
import { useSessionClose } from '@/composables/session.api'

const emits = defineEmits(['close-session'])

const FormPost = templateRef<{
  setEdit: (location: PostT) => void
  setNew: () => void
}>('form_post', null)

const modal = ref(false)
const loadingCard = ref(false)
const filterText = ref('')

const { data: posts } = usePostList()

const onFormAdd = (post: PostT) => posts.value.push(post)
const onFormUpdated = (_post: PostT) => {
  const foundPost = posts.value.find((post) => post.id === _post.id)
  if (foundPost) {
    foundPost.title = _post.title
    foundPost.content = _post.content
  }
}

const filterTable = computed(() => {
  if (filterText.value.length) {
    const text = filterText.value.toLowerCase()
    const foundPost = posts.value.filter((el) => {
      return el.title.toLowerCase().indexOf(text) > -1 || (el.content?.length && el.content.toLowerCase().indexOf(text) > -1)
    })
    return foundPost
  } else {
    return posts.value
  }
})
//
const onClickCloseSession = () => {
  useSessionClose()
  emits('close-session')
}
//
const onClickUEdit = (post: PostT) => {
  modal.value = true
  FormPost.value.setEdit(post)
}

const onDelete = async (id: number) => {
  usePostDelete(id, loadingCard).then(() => {
    const index = posts.value.findIndex((post) => post.id == id)
    if (index > -1) posts.value.splice(index, 1)
  })
}
const onSetNew = () => {
  FormPost.value.setNew()
  modal.value = true
}
</script>

<template>
  <main>
    <div class="is-flex is-justify-content-space-between">
      <button @click="onSetNew" class="button is-link">+ Nuevo Post</button>
      <button @click="onClickCloseSession" class="button is-white">Cerrar sesion</button>
    </div>

    <div class="pt-5">
      <label for="">Buscar posts</label>
      <input
        :disabled="!posts.length"
        v-model="filterText"
        class="input is-primary"
        type="text"
        placeholder="Buscador simple por titulo o contenido"
      />
    </div>

    <FormModalPost ref="form_post" v-model:open="modal" @added="onFormAdd" @updated="onFormUpdated" />

    <div v-if="!posts.length">No hay items encontrados</div>
    <template v-else>
      <div class="is-flex py-5 my-5 is-gap-5">
        <ItemPost
          v-for="(post, index) in filterTable"
          :key="index"
          :post="post"
          @delete="onDelete"
          @update="onClickUEdit"
          v-model:loading="loadingCard"
        />
      </div>
    </template>
  </main>
</template>
<style></style>
