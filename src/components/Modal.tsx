
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
			<div className='w-52 h-52 bg-modalBg'>{children}</div>
		</section>
	)
}
