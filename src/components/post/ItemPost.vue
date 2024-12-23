<script setup lang="ts">
import type { PostT } from '@/types/post.type'

const props = defineProps<{ post: PostT; loading: boolean }>()
const emits = defineEmits(['update', 'delete'])
</script>
<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ post.title }}
        <!-- <small class="ml-auto">{{ post.id }}</small> -->
      </p>
      <span class="card-header-icon" aria-label="more options">
        <span class="icon">
          <!-- <i class="fas fa-angle-down" aria-hidden="true"></i> -->
          <small class="ml-auto">{{ post.id }}</small>
        </span>
      </span>
    </header>
    <div class="card-content">
      <div class="content">
        {{ post.content }}
      </div>
    </div>
    <footer class="card-footer">
      <!-- <a class="card-footer-item">Save</a> -->
      <a @click="emits('update', post)" :disabled="loading" class="card-footer-item">Edit</a>
      <a @click="emits('delete', post.id)" :disabled="loading" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<style scoped>
.card {
  width: 200px;
  /* min-width: 200px; */
  margin: 0;

  height: 100% !important;
  /* width: 100%; */
}
</style>
