import { useState, FormEvent, useRef } from 'react'
import getNewRandomNumber from '@/service/getRandomNumber'
import NumberInput from './ui/NumberInput'
import { useRange } from '@/hooks/useRange'

interface RangeProps {
	changeNumber: (number: number) => void
	reseatToInitialValues: () => void
}

export default function Range({
	changeNumber,
	reseatToInitialValues,
}: RangeProps) {
	const {range, updateRange} = useRange()
	const [localRange, setLocalRange] = useState(range)
	const isRangeChanged = useRef({ min: range.min, max: range.max })

	const handleRangeForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Check if range changed
		if (isRangeChanged.current.min === localRange.min && isRangeChanged.current.max === localRange.max) return
		isRangeChanged.current = { min: localRange.min, max: localRange.max }
		
		updateRange({ min: localRange.min, max: localRange.max }) 
		changeNumber(
			getNewRandomNumber({ range: { min: localRange.min, max: localRange.max } })
		)
		
		reseatToInitialValues()
	}

	return (
		<div>
			<form onSubmit={handleRangeForm}>
				<NumberInput value={localRange.min} onChange={(value: number) => setLocalRange(prev => ({ ...prev, min: value }))} />
				<NumberInput value={localRange.max} onChange={(value: number) => setLocalRange(prev => ({ ...prev, max: value }))} />
				<button>Save</button>
			</form>
		</div>
	)
}
