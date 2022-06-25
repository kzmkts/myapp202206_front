import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { QueryClient, QueryClientProvider } from 'react-query'

import { useQueryTasks } from '../hooks/useQueryTasks'
import { Task } from '../types/types'

interface Props {
  children: React.ReactNode
}

const tasksUrl = `${process.env.REACT_APP_API_URL}/tasks`

const mockData: Task[] = [
  {
    id: 1,
    title: 'test1',
    created_at: '20220101',
    done: false,
  },
  {
    id: 2,
    title: 'test2',
    created_at: '20220101',
    done: true,
  },
  {
    id: 3,
    title: 'test3',
    created_at: '20220101',
    done: false,
  },
]

describe('useQueryTasks', () => {
  const consoleMock = jest.spyOn(console, 'error')
  const axiosMock = new MockAdapter(axios)

  beforeEach(() => {
    consoleMock.mockImplementation(() => null)
  })

  afterEach(() => {
    axiosMock.reset()
    consoleMock.mockRestore()
  })

  test('timeout', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    const wrapper = ({ children }: Props) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    axiosMock.onGet(tasksUrl).timeout()
    const { result, waitFor } = renderHook(() => useQueryTasks(), { wrapper })

    await waitFor(() => result.current.isFetched)
    expect(result.current.data).toEqual([])
    expect(consoleMock.mock.calls[0][0]).toMatch(
      `Error getting data from ${tasksUrl}`
    )
  })

  test('404', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    const wrapper = ({ children }: Props) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    axiosMock.onGet(tasksUrl).reply(404)
    const { result, waitFor } = renderHook(() => useQueryTasks(), { wrapper })

    await waitFor(() => result.current.isFetched)
    expect(result.current.data).toEqual([])
    expect(consoleMock.mock.calls[0][0]).toMatch(
      `Error getting data from ${tasksUrl}`
    )
  })

  test('200', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    const wrapper = ({ children }: Props) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    axiosMock.onGet(tasksUrl).reply(200, mockData)
    const { result, waitFor } = renderHook(() => useQueryTasks(), { wrapper })

    await waitFor(() => result.current.isFetched)
    expect(result.current.data).toEqual(mockData)
  })
})
