// fetch.js
import api from '@/axiosInstance'
import type { PostT } from '@/types/post.type'
import { ref, toValue, watchEffect, type Ref } from 'vue'

export async function usePostCreate(post: Omit<PostT, 'id'>, loading: Ref<boolean>) {
  try {
    loading.value = true
    const res = await api.post('post', post)
    return res.data
  } catch (error) {
    // Alert message errors
  } finally {
    loading.value = false
  }
}

export async function usePostUpdate(post: PostT, loading: Ref<boolean>) {
  try {
    loading.value = true
    const res = await api.put(`post/${post.id}`, post)
    return res.data
  } catch (error) {
    // Alert message errors
  } finally {
    loading.value = false
  }
}

export async function usePostDelete(id: number, loading: Ref<boolean>) {
  try {
    loading.value = true
    await api.delete(`post/${id}`)
    return true
  } catch (error) {
    // Alert message errors
  } finally {
    loading.value = false
  }
}

export function usePostList(url: Ref<string>) {
  const data = ref<PostT[]>([])
  const loading = ref(true)
  const error = ref(null)

  const fetchData = () => {
    // reset state before fetching..
    data.value = []
    error.value = null

    api
      .get(toValue(url))
      .then((res) => (data.value = res ? res.data : []))
      .catch((err) => (error.value = err))
      .finally(() => (loading.value = false))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
