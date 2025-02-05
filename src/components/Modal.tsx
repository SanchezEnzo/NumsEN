import * as motion from 'motion/react-client'

interface ModalProps {
	className?: string
	closeModal: () => void
	children: React.ReactNode
}

export default function Modal({ className, closeModal, children }: ModalProps) {
	return (
				<section
					className={`${className} fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md transition duration-700`}
					onClick={closeModal}
				>
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.4,
					scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
				}}
			>
					<div className='w-52 h-52 bg-modalBg'>{children}</div>
			</motion.div>
				</section>
	)
}
