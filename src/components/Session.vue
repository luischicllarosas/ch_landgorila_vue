<script lang="ts" setup>
import { ref } from 'vue'
import ButtonSession from '@/components/ButtonSession.vue'
import { useSessionCreate } from '@/composables/session.api'
// import { useRouter } from 'vue-router'

// const router = useRouter()
const loading = ref(false)

const openSession = () => useSessionCreate(loading)
</script>
<template>
  <div class="session-page">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="80" height="80" />
    <ButtonSession @click="openSession" :label="loading ? 'Cargando...' : 'Inicia sesion'" :disabled="loading" />
    <div class="has-text-centered">Se paciente porfavor, cuando el servidor esta en reposo y toma 10s aprox. en levantarse</div>
    <div class="has-text-centered">Sesion libre por 30 mins</div>
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
