import { Suspense } from 'react'
import { useModal } from '../../hooks/useModal'

import { TodoEdit } from '../TodoEdit'
import { TodoList } from '../TodoList'

export const Todo = () => {
  const { showModal, closeModal, Dialog } = useModal()

  return (
    <>
      <Suspense
        fallback={
          <p className="text-center">
            読み込んでいます…
            <br />
            sleepモードの場合は読み込みに時間がかかります。
          </p>
        }
      >
        <TodoList showModal={showModal} />
      </Suspense>

      <Dialog>
        <TodoEdit closeModal={closeModal} />
      </Dialog>
    </>
  )
}
