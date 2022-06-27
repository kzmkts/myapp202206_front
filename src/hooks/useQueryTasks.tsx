import { useQuery } from 'react-query'
import axios from 'axios'
import type { Task } from '../types/types'

const getTasks = async () => {
  const url = `${process.env.REACT_APP_API_URL}/tasks`
  try {
    const { data } = await axios.get<Task[]>(url)
    return data
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Error getting data from ${url}:`, error)
    }
    return []
  }
}
export const useQueryTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: getTasks,
    staleTime: Infinity,
  })
}
