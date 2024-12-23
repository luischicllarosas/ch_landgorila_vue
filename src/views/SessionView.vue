<script lang="ts" setup>
import api from '@/axiosInstance'
import ButtonSession from '@/components/ButtonSession.vue'
import { useSessionCreate } from '@/composables/session.api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const openSession = () => {
  useSessionCreate(loading).then(() => router.push({ name: 'home' }))
}
</script>
<template>
  <div class="session-page">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <ButtonSession @click="openSession" />
  </div>
</template>

<style>
.session-page {
  display: grid;
  align-content: center;
  height: 80vh;
  gap: 2rem;
}
.logo {
  margin: auto;
}
</style>
