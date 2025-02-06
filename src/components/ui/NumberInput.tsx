import { ChevronUp, ChevronDown } from 'lucide-react'

interface NumberInputProps {
	label?: string
	onChange: (value: number) => void
	value: number
	min?: number
	max?: number
	step?: number
}

export default function NumberInput({
	label = 'Cookies',
	onChange,
	value,
	min = 0,
	max = 10000000,
	step = 1,
}: NumberInputProps) {

	const increment = () => {
		onChange(value < max ? value + step : value)
	}

	const decrement = () => {
		onChange(value > min ? value - step : value)
	}

	return (
		<div className='w-full max-w-[300px]'>
			<label className='block text-base mb-2 text-white'>{label}</label>
			<div className='relative'>
				<input
					type='number'
					value={value}
					onChange={e => {
						const newValue = Number.parseFloat(e.target.value)
						if (!isNaN(newValue)) {
							onChange(newValue)
						}
					}}
					min={min}
					max={max}
					step={step}
					className='w-full bg-[#141414] text-white rounded-md border border-gray-800 py-2 px-3 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
				/>
				<div className='absolute right-0 top-0 h-full flex flex-col border-l border-gray-800'>
					<button
						type='button'
						className='h-1/2 px-2 rounded-none rounded-tr-md hover:bg-gray-800'
						onClick={increment}
					>
						<ChevronUp className='h-4 w-4' />
					</button>
					<button
						type='button'
						className='h-1/2 px-2 rounded-none rounded-br-md hover:bg-gray-800 border-t border-gray-800'
						onClick={decrement}
					>
						<ChevronDown className='h-4 w-4' />
					</button>
				</div>
			</div>
		</div>
	)
}
