// fetch.js
import api from '@/axiosInstance'
import type { PostT } from '@/types/post.type'
import { ref, type Ref } from 'vue'

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

export function usePostList() {
  const data = ref<PostT[]>([])
  const error = ref()
  const loading = ref(true)

  api
    .get<PostT[]>('post')
    .then((response) => (data.value = response ? response.data : []))
    .catch(() => {
      // Alert message errors
    })
    .finally(() => {
      loading.value = false
    })

  return {
    data,
    error,
    loading
  }
}
