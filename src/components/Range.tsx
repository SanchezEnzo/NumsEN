import { useState, FormEvent, useRef } from 'react'
import getNewRandomNumber from '@/service/getRandomNumber'
import NumberInput from './ui/numberInput'

interface RangeProps {
	range: { min: number; max: number }
	setRange: (range: { min: number; max: number }) => void
	changeNumber: (number: number) => void
	reseatToInitialValues: () => void
}

export default function Range({
	range,
	setRange,
	changeNumber,
	reseatToInitialValues,
}: RangeProps) {
	const [localRange, setLocalRange] = useState(range)
	const isRangeChanged = useRef({ min: range.min, max: range.max })

	const handleRangeForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log("isRangeChanged: ", isRangeChanged.current.min, isRangeChanged.current.max)
		console.log("localRange: ", localRange.min, localRange.max)

		setRange({ min: localRange.min, max: localRange.max }) 
		// if (isRangeChanged.current.min === range.min && isRangeChanged.current.max === range.max) return
		changeNumber(
			getNewRandomNumber({ range: { min: localRange.min, max: localRange.max } })
		)
		setLocalRange({min: range.min, max:range.max})
		reseatToInitialValues()
		// isRangeChanged.current = range
	}

	return (
		<div>
			<form onSubmit={handleRangeForm}>
				<NumberInput
					value={localRange.min}
				/>
				<NumberInput
					value={localRange.max}
				/>
				<button>Save</button>
			</form>
		</div>
	)
}
