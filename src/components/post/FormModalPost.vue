<script setup lang="ts">
import { usePostCreate, usePostUpdate } from '@/composables/post.api'
import type { PostT } from '@/types/post.type'
import { ref } from 'vue'

const props = defineProps<{ open: boolean }>()
const emits = defineEmits(['update:open', 'added', 'updated'])
const postForm = ref<PostT>({
  // id: null,
  title: '',
  content: ''
})
const loading = ref(false)
const onSubmit = () => {
  if (!postForm.value.id) {
    usePostCreate(postForm.value, loading).then((data) => {
      emits('added', data)
      postForm.value.title = ''
      postForm.value.content = ''
      emits('update:open', false)
    })
  } else {
    usePostUpdate(postForm.value, loading).then((data) => {
      emits('updated', data)
      postForm.value.title = ''
      postForm.value.content = ''
      emits('update:open', false)
    })
  }
}

const setEdit = (post: PostT) => {
  postForm.value = { ...post }
}

const setNew = () => {
  postForm.value.id = undefined
  postForm.value.title = ''
  postForm.value.content = ''
}

defineExpose({ setEdit, setNew })
</script>
<template>
  <div :class="['modal', { 'is-active': open }]">
    <div class="modal-background"></div>
    <div class="card">
      <form @submit.prevent="onSubmit" method="dialog" class="">
        <!-- <!== <span class="label-text-alt">Top Right label</span> ==> -->
        <div class="p-5">
          <div class="field">
            <label class="label">Titulo</label>
            <div class="control">
              <input v-model="postForm.title" class="input" type="text" placeholder="..." maxlength="10" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Contenido</label>
            <div class="control">
              <textarea v-model="postForm.content" class="textarea" placeholder="" minlength="5" maxlength="10" required></textarea>
            </div>
          </div>
        </div>
        <!-- Actions -->

        <footer class="card-footer">
          <a class="card-footer-item has-text-white" @click="emits('update:open', false)">Cancelar</a>
          <button type="submit" :class="['card-footer-item has-text-primary', { 'is-loading': loading }]" :disabled="loading">
            Guardar
          </button>
        </footer>
      </form>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="emits('update:open', false)"></button>
  </div>
</template>

<style scoped></style>
