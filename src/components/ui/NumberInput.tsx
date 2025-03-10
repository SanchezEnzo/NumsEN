import { ArrowDropDownIcon, ArrowDropUpIcon } from "../Icons"

interface NumberInputProps {
	label?: string
	onChange: (value: number | string) => void // Permite string vacío
	value: number | string // Permite string vacío
	min: number
	max: number
	step?: number
}

export default function NumberInput({
	label = 'Cookies',
	onChange,
	value,
	min,
	max,
	step = 1,
}: NumberInputProps) {
	const increment = () => {
		if (typeof value === 'number') return onChange(value < max ? value + step : value)
	}

	const decrement = () => {
		if (typeof value === 'number') return onChange(value > min ? value - step : value)
	}

	return (
		<div className='w-[300px] max-sm:w-[220px]'>
			<label className='block text-base mb-2 text-white'>{label}</label>
			<div className='relative'>
				<input
					type='number'
					value={value}
					onChange={e => {
						const newValue = e.target.value
						onChange(newValue === '' ? '' : Number.parseFloat(newValue))
					}}
					min={min}
					max={max}
					step={step}
					className='w-full bg-zinc-900 border border-zinc-700 text-white text-lg rounded-lg px-3 py-2 
              outline-none  appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
				/>
				<div className='absolute right-0 top-0 h-full flex flex-col border-l border-gray-700'>
					<button
						type='button'
						className='h-1/2 px-2 rounded-none rounded-tr-md border-gray-800 '
						onClick={increment}
					>
						<ArrowDropUpIcon className='h-4 w-4 text-text opacity-40' />
					</button>
					<button
						type='button'
						className='h-1/2 px-2 rounded-none rounded-br-md border-t border-gray-800 border opacity-40 '
						onClick={decrement}
					>
						<ArrowDropDownIcon className='h-4 w-4 text-text' />
					</button>
				</div>
			</div>
		</div>
	)
}
