import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { EditTask } from '../types/types'

export interface TaskState {
  editedTask: EditTask
  editMode: boolean
}

const initialState: TaskState = {
  editedTask: {
    id: 0,
    title: '',
  },
  editMode: false,
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setEditedTask: (state, action: PayloadAction<EditTask>) => {
      state.editedTask = action.payload
    },
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask
    },
    toggleEditMode: (state) => {
      state.editMode = !state.editMode
    },
  },
})

export const { setEditedTask, resetEditedTask, toggleEditMode } =
  taskSlice.actions

export const selectTask = (state: RootState) => state.task.editedTask
export const selectEditMode = (state: RootState) => state.task.editMode

export default taskSlice.reducer
