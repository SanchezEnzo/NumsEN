import { useLanguage } from './hooks/useLanguage'
import { Button } from './components/Button'
// import { NumberTicker } from './components/ui/number-ticker'
import NumberFlow, { continuous } from '@number-flow/react'
import getNewRandomNumber from './service/getRandomNumber'
import { useForm } from './hooks/useForm'
import Form from './components/Form'
import { useNumber } from './hooks/useNumber'
import { Select } from './components/Select'
import { RESPONSE_STATE } from './constants/responseState'
import { VolumeIcon } from './components/icons/VolumenIcon'
import { RefreshIcon } from './components/icons/RefreshIcon'
import Range from './components/Range'
import { useState } from 'react'
import SettingsIcon from './components/icons/SettingsIcon'
import Modal from './components/Modal'
import { useRange } from './hooks/useRange'

export default function App () {
	const {range} = useRange()
	const { number, changeNumber } = useNumber()
	const { response, inputRef, handleSubmit, reseatToInitialValues } = useForm({
		number,
		changeNumber,
	})
	const { changeLanguage, playAudio } = useLanguage({ number })
	const [showSettings, setShowSettings] = useState(false)

	return (
		<div className='h-screen w-full bg-background before:absolute before:inset-0 before:bg-black/30 before:shadow-[inset_0_0_50px_rgba(0,0,0,0.9)] relative'>
			<div className='relative h-screen w-full flex justify-center items-center flex-col gap-[10dvh]'>
				<div className=' max-h-56 relative inline-block'>
					<NumberFlow
						value={number}
						locales='ar-OM-u-nu-latn'
						className={`text-[10rem] transition-colors duration-700  ${
							response === RESPONSE_STATE.WRONG ||
							response === RESPONSE_STATE.INVALID
								? 'animate-shakeHorizontal text-red-500'
								: 'text-accent'
						} ${
							response === RESPONSE_STATE.RIGHT &&
							'animate-shakeVertical text-green-500 '
						}`}
						spinTiming={{ duration: 500, easing: 'ease-in-out' }}
						opacityTiming={{ duration: 350, easing: 'ease-out' }}
						plugins={[continuous]}
						willChange
					></NumberFlow>
				</div>
				<div className='flex gap-6'>
					<Form
						response={response}
						handleSubmit={handleSubmit}
						inputRef={inputRef}
					/>
					<div className='flex items-center gap-2'>
						<Select changeLanguage={changeLanguage} />
						<Button
							handleClick={playAudio}
							classButton='text-buttonText-secondary bg-secondary outline-outline-secondary flex items-center gap-1'
						>
							Listen
							<VolumeIcon />
						</Button>
					</div>
				</div>
				<div className='w-full flex justify-center'>
					<div className='w-56 flex relative'></div>
				</div>
				<Button
					handleClick={() => {
						changeNumber(getNewRandomNumber({ range }))
						reseatToInitialValues()
					}}
					classButton='text-buttonText-secondary bg-secondary outline-outline-secondary flex items-center gap-1'
				>
					Change Number
					<RefreshIcon />
				</Button>
				<button onClick={() => setShowSettings(!showSettings)}>
					<SettingsIcon />
				</button>
			</div>
			<Modal
				isOpenModal={showSettings}
				closeModal={() => setShowSettings(!showSettings)}
			>
				<Range
					changeNumber={changeNumber}
					reseatToInitialValues={reseatToInitialValues}
				/>
			</Modal>
		</div>
	)
}

//Todo: Agregar rango de numeros a elegir
//Todo: Assistant
//Todo: Botton sacar animaciones

//Todo: Boton mostrar el resultado correcto (capaz)
//Todo: Agregar Lista de lenuajes
//Todo: Elegir formato de número
//Todo: Hover en los botenes y cursor pointer en el select
