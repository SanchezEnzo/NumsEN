import * as motion from 'motion/react-client'
import { AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

interface ModalProps {
	className?: string
	isOpenModal?: boolean
	closeModal: () => void
	children: React.ReactNode
}

export default function Modal({
	className,
	isOpenModal,
	closeModal,
	children,
}: ModalProps) {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		if (isOpenModal) {
			setIsVisible(true) 
		} else {
			setTimeout(() => setIsVisible(false), 100) 
		}
	}, [isOpenModal])


	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
					animate={{ backdropFilter: 'blur(10px)', opacity: 1 }}
					exit={{ backdropFilter: 'blur(0px)', opacity: 0 }}
					transition={{ duration: 0.4 }}
					className={`${className} fixed inset-0 flex items-center justify-center bg-black/50`}
					onClick={closeModal}
				>
					<AnimatePresence>
						{isOpenModal && (
							<motion.div
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0 }}
								transition={{
									duration: 0.4,
									scale: { type: 'spring', bounce: 0.5 },
								}}
								onClick={e => e.stopPropagation()}
							>
								<div className='w-52 h-52 bg-modalBg'>{children}</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
