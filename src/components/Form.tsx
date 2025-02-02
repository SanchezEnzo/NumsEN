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
		<form className='flex gap-2 relative' onSubmit={handleSubmit}>
			<label htmlFor='response' className='sr-only'>
				Write the number in text
			</label>
			<input
				id='response'
				type='text'
				className='outline outline-[0.1px] pl-1 bg-input text-foreground focus:outline focus:outline-ring'
				name='response'
				autoComplete='off'
				aria-invalid={response === RESPONSE_STATE.RIGHT}
				ref={inputRef}
			/>
			<Button>Check</Button>
		</form>
	)
}