import { FormEventHandler } from "react"
import { Button } from "./Button"
import { RESPONSE_STATE } from "@/constants/responseState"

export default function Form({
	response,
	handleSubmit,
	inputRef,
}: {
	response: RESPONSE_STATE
	handleSubmit: FormEventHandler<HTMLFormElement>
	inputRef: React.RefObject<HTMLInputElement>
}) {
	return (
		<form
			className='flex gap-2 relative max-h-10 h-10 items-center'
			onSubmit={handleSubmit}
		>
			<label htmlFor='response' className='sr-only'>
				Write the number in text
			</label>
			<input
				id='response'
				type='text'
				className='outline outline-[0.1px] pl-1 bg-primary text-background focus:outline focus:outline-background h-9 w-72 text-lg placeholder-gray-400'
				name='response'
				autoComplete='off'
				aria-invalid={response === RESPONSE_STATE.RIGHT}
				ref={inputRef}
				placeholder='Write the number in text'
			/>
			<Button classButton='bg-primary text-buttonText-primary outline-outline-primary'>
				Check
			</Button>
		</form>
	)
}