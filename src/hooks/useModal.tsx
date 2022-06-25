import { useRef, useCallback } from 'react'

interface Props {
  children: React.ReactNode
}

export const useModal = () => {
  const ref: React.MutableRefObject<HTMLDialogElement | null> = useRef(null)

  const showModal = useCallback(() => {
    ref.current?.showModal()
  }, [])
  const closeModal = useCallback(() => {
    ref.current?.close()
  }, [])

  const Dialog = ({ children }: Props) => (
    <dialog
      ref={ref}
      onClick={closeModal}
      className="backdrop:bg-slate-900/50 backdrop:backdrop-blur w-full rounded-xl shadow-xl md:max-w-xl"
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </dialog>
  )

  return { showModal, closeModal, Dialog }
}
