import getNewRandomNumber from "@/service/getRandomNumber"
import { ChangeEvent, FormEvent } from "react"

interface RangeProps {
	range: { min: number, max: number }
	setRange: (range: { min: number, max: number }) => void
	changeNumber: (number: number) => void
	reseatToInitialValues: () => void
}

export default function Range({
	range,
	setRange,
	changeNumber,
	reseatToInitialValues,
}: RangeProps) {
	const handleRangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		if (e.target.name === 'min') {
			setRange({ ...range, min: Number(newValue) })
			return
		}
		setRange({ ...range, max: Number(newValue) })
	}

	const handleRangeForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		changeNumber(getNewRandomNumber({ range }))
		reseatToInitialValues()
	}

	return (
		<div className=''>
			<form onSubmit={handleRangeForm}>
				<label className='flex'>
					Min:
					<input
						type='number'
						className='w-24'
						name='min'
						onChange={handleRangeInput}
						value={range.min}
					/>
				</label>

				<label className='flex'>
					Max:
					<input
						type='number'
						className='w-24'
						name='max'
						onChange={handleRangeInput}
						value={range.max}
					/>
				</label>
				<button>Save</button>
			</form>
		</div>
	)
}