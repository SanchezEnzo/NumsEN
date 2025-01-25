import { ReactNode } from "react"

interface ButtonProps {
	handleClick?: () => void
	children: ReactNode
}

export function Button({ handleClick, children }: ButtonProps) {
	return (
		<button
			onClick={handleClick}
			className='outline outline-[0.1px] px-2 rounded-lg'
		>
			{children}
		</button>
	)
}
