import { ReactNode } from "react"

interface ButtonProps {
	handleClick?: () => void
	classButton?: string
	children: ReactNode
}

export function Button ({ handleClick, classButton, children }: ButtonProps) {
	return (
		<button
			onClick={handleClick}
			className={`outline outline-[0.1px] px-4 py-1 rounded-lg  h-10 ${classButton}`}
		>
			{children}
		</button>
	)
}
