// fetch.js
import { type Ref } from 'vue'
import api from '@/axiosInstance'
import Cookies from 'js-cookie'
import Router from '../router'

export async function useSessionCreate(loading: Ref<boolean>) {
  try {
    loading.value = true
    const { data } = await api.post<{ token: string; ip: string; expiredMil: number }>('session')
    const { token, expiredMil } = data
    // # Mode 1
    const expires = new Date(Date.now() + expiredMil)

    Cookies.set('token', token, { expires })
    Router.push({ name: 'home' })

    // # Mode 2
    // localStorage.setItem('token', token)
    return true
  } catch (error) {
    // Alert
  } finally {
    loading.value = false
  }
}

export function useSessionClose() {
  // # Mode 1
  Cookies.remove('token')
  // # Mode 2
  // localStorage.removeItem('token')

  Router.push({ name: 'session' })
}
