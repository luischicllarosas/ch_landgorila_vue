<script setup lang="ts">
import { ref } from 'vue'
import Index from '@/components/post/Index.vue'
import { useSessionCheck, useSessionCreate } from '@/composables/session.api'
import ButtonSession from '@/components/ButtonSession.vue'

const { isAuthenticated } = useSessionCheck()
const loading = ref(false)

const openSession = () => {
  useSessionCreate(loading).then(() => (isAuthenticated.value = true))
}
const onCloseSession = () => (isAuthenticated.value = false)
</script>
<template>
  <!--  -->
  <template v-if="isAuthenticated">
    <Index @close-session="onCloseSession" />
  </template>
  <!--  -->
  <template v-else>
    <div class="session-page">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="80" height="80" />
      <ButtonSession @click="openSession" :label="loading ? 'Cargando...' : 'Inicia sesion'" :disabled="loading" />
      <div class="has-text-centered">Se paciente porfavor, cuando el servidor esta en reposo y toma 10s aprox. en levantarse</div>
      <div class="has-text-centered">Sesion libre por 30 mins</div>
    </div>
  </template>
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
