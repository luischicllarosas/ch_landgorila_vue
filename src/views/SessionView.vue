<script lang="ts" setup>
//! Deprecated
import api from '@/axiosInstance'
import ButtonSession from '@/components/ButtonSession.vue'
import { useSessionCreate } from '@/composables/session.api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const openSession = () => {
  useSessionCreate(loading)
}
</script>
<template>
  <div class="session-page">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
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
