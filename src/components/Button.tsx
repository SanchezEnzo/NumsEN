import { ReactNode } from "react"

interface ButtonProps {
	handleClick?: () => void
	classButton?: string
	disabled?: boolean
	applyTransform?: boolean
	children: ReactNode
}

export function Button ({ handleClick, classButton, disabled, children, applyTransform }: ButtonProps) {
	return (
		<button
			onClick={handleClick}
			className={`outline outline-[0.1px] px-6 py-3 rounded-lg text-lg h-10  duration-75  ${
				applyTransform && ''
			} ${classButton} transition-all duration-200 shadow-[0_4px_0_rgba(67,56,202,0.7),0_6px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_2px_0_rgba(67,56,202,0.7),0_4px_6px_rgba(0,0,0,0.15)] hover:translate-y-1 active:translate-y-2 active:shadow-[0_0px_0_rgba(67,56,202,0.7),0_2px_3px_rgba(0,0,0,0.15)]`}
			disabled={disabled}
		>
			{children}
		</button>
	)
}
// h-10 w-fit cursor-pointer rounded-full bg-white px-10 py-1.5 text-sm font-medium text-gray-900 capitalize ring-1 shadow-xs ring-gray-300/50 ring-inset hover:bg-gray-50 md:w-32 md:px-2.5 ${view === v ? "ring-2 ring-blue-500" : ""} `
