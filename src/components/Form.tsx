import { FormEventHandler, useId } from 'react'
import { Button } from './Button'
import { RESPONSE_STATE } from '@/constants/responseState'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function Form({
	response,
	handleSubmit,
	inputRef,
}: {
	response: RESPONSE_STATE
	handleSubmit: FormEventHandler<HTMLFormElement>
	inputRef: React.RefObject<HTMLInputElement>
	}) {
	const { isMobile } = useMediaQuery()
	const inputNumberId = useId()
	return (
		<form
			className='flex gap-2 relative max-h-10 h-10 items-center'
			onSubmit={handleSubmit}
		>
			<label htmlFor={inputNumberId} className='sr-only'>
				Write number in text
			</label>
			<input
				autoFocus={isMobile}
				id={inputNumberId}
				type='text'
				className='outline outline-[0.1px] pl-1 bg-primary text-background focus:outline focus:outline-background h-10 w-80 text-lg placeholder-placeholder placeholder-opacity-80 rounded-sm max-sm:w-56'
				name='response'
				autoComplete='off'
				aria-invalid={response === RESPONSE_STATE.RIGHT}
				ref={inputRef}
				placeholder='Type the number in words.'
			/>
			<Button classButton='bg-primary text-buttonText-primary outline-outline-primary'>
				Check
			</Button>
		</form>
	)
}
