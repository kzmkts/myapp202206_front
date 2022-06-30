import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { toggleEditMode } from '../slices/todoSlice'
import { useLocation } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <nav className="fixed inset-x-0 top-0  z-10 flex h-20 items-center bg-white shadow">
        <div className="mx-auto  flex w-full max-w-xl items-center justify-between">
          <div className="inline-flex h-full items-center">
            <Link to={'/'}>
              <span
                className={`block p-2 font-bold ${
                  location.pathname === '/' ? '' : 'text-slate-400'
                }`}
              >
                Home
              </span>
            </Link>
            <Link to={'/todo/'}>
              <span
                className={`p-2 font-bold ${
                  location.pathname === '/todo/' ? '' : 'text-slate-400'
                }`}
              >
                Todo
              </span>
            </Link>
          </div>

          {location.pathname === '/todo/' ? (
            <button
              className="rounded bg-primary px-6 py-3 font-medium text-white shadow hover:bg-primary/90 active:bg-primary/80"
              onClick={() => dispatch(toggleEditMode())}
            >
              編集
            </button>
          ) : (
            <a
              className="hover:opacity-80 active:opacity-50"
              href="https://github.com/kzmkts/myapp202206_root"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-8 w-8" />
            </a>
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
