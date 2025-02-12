export function CloseIcon({
	className,
	size,
}: {
	className?: string
	size: number
}) {
	return (
		<svg
			className={`${className} cursor-pointer`}
			height={`${size}px`}
			width={`${size}px`}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 -960 960 960'
			fill='#0a0b14ee'
		>
			<path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
		</svg>
	)
}
