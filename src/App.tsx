import { useLanguage } from './hooks/useLanguage'
import { Result } from './components/Result'
import { RESPONSE_STATE } from './constants/responseState'
import { Button } from './components/Button'
// import { NumberTicker } from './components/ui/number-ticker'
import NumberFlow, { continuous } from '@number-flow/react'
import getNewRandomNumber from './service/getRandomNumber'
import { useForm } from './hooks/useForm'
import Form from './components/Form'
import { useNumber } from './hooks/useNumber'
import { Select } from './components/Select'

export default function App() {
	const { number, changeNumber } = useNumber()
	const { response, updateResponse, inputRef, handleSubmit } = useForm({number, changeNumber})
	const {changeLanguage, playAudio } = useLanguage({ number })

	function reseatToInitialValues() {
		updateResponse(RESPONSE_STATE.INIT)
		if (inputRef.current) inputRef.current.value = ''
	}

	return (
		<div className='h-screen w-full flex justify-center items-center flex-col gap-[10dvh] bg-background text-foreground'>
			<NumberFlow
				value={number}
				locales='ar-OM-u-nu-latn'
				className={`text-[10rem] text-accent ${
					(response === RESPONSE_STATE.INVALID || response === RESPONSE_STATE.WRONG) && 'animate-shake'}`}
				spinTiming={{ duration: 500, easing: 'ease-in-out' }}
				opacityTiming={{ duration: 350, easing: 'ease-out' }}
				plugins={[continuous]}
				willChange
			></NumberFlow>
			<div className='flex gap-6'>
				<Form
					response={response}
					handleSubmit={handleSubmit}
					inputRef={inputRef}
				/>
				<div className='flex gap-2'>
					<Select changeLanguage={changeLanguage} />
					<Button
						handleClick={playAudio}
						classButton='text-buttonText-secondary bg-secondary outline-outline-secondary'
					>
						Listen
					</Button>
				</div>
			</div>
			<div className='w-full flex justify-center'>
				<div className='w-56 flex relative'>
					<Result response={response} />
				</div>
			</div>
			<Button
				handleClick={() => {
					changeNumber(getNewRandomNumber())
					reseatToInitialValues()
				}}
				classButton='text-buttonText-secondary bg-secondary outline-outline-secondary'
			>
				Change Number
			</Button>
		</div>
	)
}

//Todo: Agregar rango de numeros a elegir
//Todo: Assistant
//Todo: Cambiar de numero en respuesta correcta
//Todo: Agregar Lista de lenuajes
//Todo: Botton sacar animaciones
//Todo: Elegir formato de número
