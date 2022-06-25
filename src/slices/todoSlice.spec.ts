import todoReducer, {
  TaskState,
  toggleEditMode,
  setEditedTask,
  resetEditedTask,
} from './todoSlice'

describe('slices/todoSlice', () => {
  const initialState: TaskState = {
    editedTask: {
      id: 0,
      title: '',
    },
    editMode: false,
  }
  test('should handle initial state', () => {
    expect(todoReducer(undefined, { type: 'unknown' })).toEqual({
      editedTask: {
        id: 0,
        title: '',
      },
      editMode: false,
    })
  })

  test('should toggle EditMode', () => {
    const actual = todoReducer(initialState, toggleEditMode())
    expect(actual.editMode).toEqual(true)
  })

  test('should set editTask', () => {
    const mockData = {
      id: 1,
      title: 'test',
    }

    const actual = todoReducer(initialState, setEditedTask(mockData))
    expect(actual.editedTask.id).toEqual(mockData.id)
    expect(actual.editedTask.title).toEqual(mockData.title)
  })

  test('should reset editTask', () => {
    const actual = todoReducer(initialState, resetEditedTask())
    expect(actual.editedTask).toEqual(initialState.editedTask)
  })
})
