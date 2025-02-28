import { useState, FormEvent, useRef } from 'react'
import getNewRandomNumber from '@/service/getRandomNumber'
import NumberInput from './ui/NumberInput'
import { useRange } from '@/hooks/useRange'
import { Button } from './Button'

interface RangeProps {
	changeNumber: (number: number) => void
	reseatFormValues: () => void
}

export default function Range({
	changeNumber,
	reseatFormValues,
}: RangeProps) {
	const { range, updateRange } = useRange()
	const [localRange, setLocalRange] = useState(range)
	const isRangeChanged = useRef({ min: range.min, max: range.max })

	const handleRangeForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Check if range changed
		if (
			isRangeChanged.current.min === localRange.min &&
			isRangeChanged.current.max === localRange.max
		)
			return
		isRangeChanged.current = { min: localRange.min, max: localRange.max }

		updateRange({ min: localRange.min, max: localRange.max })
		changeNumber(
			getNewRandomNumber({
				range: { min: localRange.min, max: localRange.max },
			})
		)
		reseatFormValues()
	}

	const isDisibledSaveRangeButton =
		(isRangeChanged.current.min === localRange.min &&
		isRangeChanged.current.max === localRange.max) || localRange.min > localRange.max || typeof localRange.min !== 'number' || typeof localRange.max !== 'number'

	return (
		<div>
			<form
				onSubmit={handleRangeForm}
				className='flex flex-col items-center gap-5'
			>
				<NumberInput
					label='Min'
					min={0}
					max={10000000}
					value={localRange.min}
					onChange={(value: number | string) =>
						 setLocalRange(prev => ({ ...prev, min: (value as number) }))
					}
				/>
				<NumberInput
					label='Max'
					min={0}
					max={10000000}
					value={localRange.max}
					onChange={(value: number | string) =>
						 setLocalRange(prev => ({ ...prev, max: (value as number) }))
					}
				/>
				<Button
					classButton={`max-w-[160px]  outline-gray-800 bg-zinc-900 transition-colors duration-300 ${
						isDisibledSaveRangeButton
							? 'text-gray-600'
							: 'hover:bg-[#14141477] text-text'
					}`}
					disabled={isDisibledSaveRangeButton}
				>
					Save range
				</Button>
			</form>
		</div>
	)
}
