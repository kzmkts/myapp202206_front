import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { resetEditedTask } from '../slices/todoSlice'
import { useQueryClient, useMutation } from 'react-query'

import type { Task, EditTask } from '../types/types'

export const useMutateTask = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation(
    (task: Omit<EditTask, 'id'>) =>
      axios.post(`${process.env.REACT_APP_API_URL}/tasks`, task),
    {
      onSuccess: (res) => {
        const oldTodos = queryClient.getQueryData<Task[]>('tasks')
        if (oldTodos?.length) {
          queryClient.setQueryData<Task[]>('tasks', [...oldTodos, res.data])
        } else {
          queryClient.invalidateQueries('tasks')
        }
        dispatch(resetEditedTask())
      },
    }
  )

  const updateTaskMutation = useMutation(
    (task: EditTask) =>
      axios.put(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, task),
    {
      onSuccess: (res, variables) => {
        const oldTodos = queryClient.getQueryData<Task[]>('tasks')
        if (oldTodos?.length) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            oldTodos.map((task) =>
              task.id === variables.id ? { ...res.data, done: task.done } : task
            )
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )

  const deleteTaskMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`),
    {
      onSuccess: (res, variables) => {
        const oldTodos = queryClient.getQueryData<Task[]>('tasks')
        if (oldTodos?.length) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            oldTodos.filter((task) => task.id !== variables)
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )

  const compleatTaskMutation = useMutation(
    (id: number) =>
      axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}/done`),
    {
      onSuccess: (res, variables) => {
        const oldTodos = queryClient.getQueryData<Task[]>('tasks')
        if (oldTodos?.length) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            oldTodos.map((task) =>
              task.id === variables ? { ...task, done: true } : task
            )
          )
        }
      },
    }
  )

  const incompleatTaskMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}/done`),
    {
      onSuccess: (res, variables) => {
        const oldTodos = queryClient.getQueryData<Task[]>('tasks')
        if (oldTodos?.length) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            oldTodos.map((task) =>
              task.id === variables ? { ...task, done: false } : task
            )
          )
        }
      },
    }
  )

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    compleatTaskMutation,
    incompleatTaskMutation,
  }
}
