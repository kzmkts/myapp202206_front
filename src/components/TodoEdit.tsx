import { memo, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setEditedTask, selectTask } from '../slices/todoSlice'
import { useMutateTask } from '../hooks/useMutateTask'

interface Props {
  closeModal: VoidFunction
}

export const TodoEdit = memo(({ closeModal }: Props) => {
  const editedTask = useAppSelector(selectTask)
  const dispatch = useAppDispatch()
  const { createTaskMutation, updateTaskMutation } = useMutateTask()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === 0) createTaskMutation.mutate(editedTask)
    else {
      updateTaskMutation.mutate(editedTask)
    }
    closeModal()
  }
  // console.log('render TodoEdit')

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col space-y-5 p-5">
        <input
          required
          type="text"
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
          className="rounded border border-gray-300 bg-gray-50 p-3 placeholder:text-slate-500 focus:border-primary/50 focus:ring-primary/50"
          value={editedTask.title}
          placeholder="タスクを入力"
        />
        <div className="flex items-center justify-between">
          <button
            onClick={closeModal}
            className="inline-flex items-center justify-center  rounded bg-slate-100 px-5 py-3 shadow hover:bg-slate-200 active:bg-slate-300"
            type="button"
          >
            キャンセル
          </button>

          <button
            className="inline-flex items-center justify-center rounded  bg-primary px-5  py-3 text-white shadow hover:bg-primary/90 active:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={
              !editedTask.title &&
              (updateTaskMutation.isLoading || createTaskMutation.isLoading)
            }
            type="submit"
          >
            {editedTask.id === 0 ? '追加' : '変更'}
          </button>
        </div>
      </div>
    </form>
  )
})
