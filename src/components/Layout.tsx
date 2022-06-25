import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { toggleEditMode } from '../slices/todoSlice'
import { useLocation } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <nav className="fixed inset-x-0 top-0  z-10 flex h-20 items-center bg-white p-3 shadow">
        <div className="mx-auto  flex w-full max-w-xl items-center justify-between">
          <div className="inline-flex items-center">
            <Link to={'/'}>
              <span
                className={`p-2 font-bold ${
                  location.pathname === '/' ? 'text-slate-400' : ''
                }`}
              >
                Home
              </span>
            </Link>
            <Link to={'/todo/'}>
              <span
                className={`p-2 font-bold ${
                  location.pathname === '/todo/' ? 'text-slate-400' : ''
                }`}
              >
                Todo
              </span>
            </Link>
          </div>

          {location.pathname === '/todo/' && (
            <button
              className="hover:bg-primary/90 active:bg-primary/80 rounded bg-primary px-6 py-3 font-medium text-white shadow"
              onClick={() => dispatch(toggleEditMode())}
            >
              編集
            </button>
          )}
        </div>
      </nav>
      <main className="relative mt-20 w-full max-w-xl flex-1 items-center justify-center px-2 pt-10 pb-24 md:pb-32">
        {children}
      </main>
    </div>
  )
}

export default Layout
