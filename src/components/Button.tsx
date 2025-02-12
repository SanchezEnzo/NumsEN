import { ReactNode } from "react"

interface ButtonProps {
	handleClick?: () => void
	classButton?: string
	disabled?: boolean
	children: ReactNode
}

export function Button ({ handleClick, classButton, disabled, children }: ButtonProps) {
	return (
		<button
			onClick={handleClick}
			className={`outline outline-[0.1px] px-4 py-1 rounded-lg  text-lg h-10 ${classButton}`}
			disabled={disabled}
		>
			{children}
		</button>
	)
}
