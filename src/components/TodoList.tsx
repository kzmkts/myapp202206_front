import { memo } from 'react'
import moment from 'moment'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { useMutateTask } from '../hooks/useMutateTask'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  resetEditedTask,
  selectEditMode,
  setEditedTask,
} from '../slices/todoSlice'

import { FaRegCheckCircle } from 'react-icons/fa'
import { GoPencil, GoTrashcan } from 'react-icons/go'
import { TiPlus } from 'react-icons/ti'
import { Task } from '../types/types'

interface Props {
  showModal: VoidFunction
}

export const TodoList = memo(({ showModal }: Props) => {
  const dispatch = useAppDispatch()
  const editMode = useAppSelector(selectEditMode)
  const { compleatTaskMutation, incompleatTaskMutation, deleteTaskMutation } =
    useMutateTask()
  const { data } = useQueryTasks()

  const handlwDeleteTask = (task: Task) => {
    const confirm = window.confirm('本当に削除してもいいですか？')
    if (confirm) deleteTaskMutation.mutate(task.id)
  }

  return (
    <>
      <div className="mb-3">
        <p className="mb-1 text-sm">取得制限:10件</p>
        <p className="mb-1 text-sm">
          サンプルアプリのためタスクは定期的に削除されます
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        {data?.length === 0 && (
          <p className="text-center">タスクがありません</p>
        )}
        {data?.map((task) => (
          <div
            key={task.id}
            className="flex  items-stretch justify-center space-x-2"
          >
            <button
              aria-label="完了"
              disabled={
                compleatTaskMutation.isLoading ||
                incompleatTaskMutation.isLoading
              }
              onClick={() =>
                task.done
                  ? incompleatTaskMutation.mutate(task.id)
                  : compleatTaskMutation.mutate(task.id)
              }
              className="disabled:cursor-not-allowedp peer flex flex-1 items-center rounded bg-slate-100 py-3 px-3 shadow hover:bg-slate-200 active:bg-slate-300 md:px-6"
            >
              <span>
                <FaRegCheckCircle
                  className={`h-6 w-6 transition-all md:h-8 md:w-8 ${
                    task.done ? 'text-primary' : 'text-slate-400'
                  }`}
                />
              </span>
              <div
                className={`tex-sm ml-2 flex flex-col text-left md:text-xl ${
                  task.done ? 'line-through decoration-primary' : ''
                }`}
              >
                <span className="text-xs text-slate-400 md:text-sm">
                  {moment(task.created_at).format('YYYY-MM-DD HH:mm')}
                </span>
                <span className="break-all">{task.title}</span>
              </div>
            </button>

            {editMode && (
              <>
                <button
                  aria-label="編集"
                  onClick={() => {
                    dispatch(setEditedTask({ id: task.id, title: task.title }))
                    showModal()
                  }}
                  className="inline-flex w-12 items-center justify-center rounded bg-slate-100 p-3 shadow hover:bg-slate-200 active:bg-slate-300 md:w-16"
                >
                  <span>
                    <GoPencil className="h-4 w-4 md:h-5 md:w-5" />
                  </span>
                </button>
                <button
                  aria-label="削除"
                  onClick={() => handlwDeleteTask(task)}
                  disabled={deleteTaskMutation.isLoading}
                  className="inline-flex w-12 items-center justify-center rounded bg-slate-100 p-3 shadow hover:bg-slate-200 active:bg-slate-300 md:w-16"
                >
                  <span>
                    <GoTrashcan className="h-4 w-4 md:h-5 md:w-5" />
                  </span>
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <button
        aria-label="タスク作成"
        className="fixed right-5 bottom-5 rounded-full bg-primary p-3 hover:bg-primary/90 active:bg-primary/80 md:p-5"
        onClick={() => {
          dispatch(resetEditedTask())
          showModal()
        }}
      >
        <TiPlus className="h-6 w-6 text-white" />
      </button>
    </>
  )
})
