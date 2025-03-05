import { useLanguage } from './hooks/useLanguage'
import { Button } from './components/Button'
// import { NumberTicker } from './components/ui/number-ticker'
import NumberFlow, { continuous } from '@number-flow/react'
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
import FormAssistant from './components/AssistantForm'
import { CloseIcon } from './components/icons/CloseIcon'
import PowerToggleButton, {
	POWER_BUTTON_STATES,
} from './components/ui/PowerToggleButton'
import { useAssistant } from './hooks/useAssistant'
import getRandomNumber from './service/getRandomNumber'
import useMediaQuery from './hooks/useMediaQuery'
import { setNumberFontSize } from './service/setNumberFontSize'

export default function App() {
	const { range } = useRange()
	const { number, changeNumber } = useNumber()
	const { response, inputRef, handleSubmit, reseatFormValues } = useForm({
		number,
		changeNumber,
	})
	const { changeLanguage, playAudio } = useLanguage({ number })
	const [showSettings, setShowSettings] = useState(false)
	const { assistant, handleAssistant } = useAssistant()
	const { isMobile } = useMediaQuery()

	return (
		<div className='h-[100dvh] w-full bg-background before:absolute before:inset-0 before:bg-black/30 before:shadow-[inset_0_0_50px_rgba(0,0,0,0.9)] relative overflow-x-hidden overflow-y-hidden font-mono'>
			<main className='relative h-screen w-full flex justify-center items-center flex-col max-sm:gap-[5dvh] gap-[15dvh]'>
				<section className=' h-56 relative  flex items-center'>
					<NumberFlow
						value={number}
						locales='ar-OM-u-nu-latn'
						className={`text-[10rem] ${setNumberFontSize(
							number
						)} transition-colors duration-700  ${
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
				</section>
				<section className='flex flex-col items-center gap-[10dvh]'>
					<div className='flex gap-6 max-sm:flex-col max-sm:items-center max-sm:gap-[5dvh]'>
						{assistant === POWER_BUTTON_STATES.OFF ? (
							<Form
								response={response}
								handleSubmit={handleSubmit}
								inputRef={inputRef}
							/>
						) : (
							<FormAssistant
								response={response}
								handleSubmit={handleSubmit}
								inputRef={inputRef}
							/>
						)}
						<div className='flex items-center gap-2'>
							<Select changeLanguage={changeLanguage} />
							<Button
								handleClick={playAudio}
								classButton='text-buttonText-secondary bg-secondary outline-outline-secondary flex items-center gap-1 '
							>
								<span className=''>Listen</span>
								<VolumeIcon />
							</Button>
						</div>
					</div>
					<div className='w-full flex justify-center'>
						<div className='w-56 flex relative'></div>
					</div>
					<Button
						handleClick={() => {
							changeNumber(getRandomNumber({ range }))
							reseatFormValues()
						}}
						classButton='text-buttonText-secondary bg-secondary outline-outline-secondary flex items-center gap-1'
						applyTransform={!isMobile}
					>
						Change Number
						<RefreshIcon />
					</Button>
				</section>
				<section>
					<button onClick={() => setShowSettings(!showSettings)}>
						<SettingsIcon
							className='fixed top-5 right-5 max-sm:top-2 max-sm:right-2'
							width={isMobile ? 48 : 64}
							height={isMobile ? 48 : 64}
						/>
					</button>
				</section>
			</main>
			<Modal
				isOpenModal={showSettings}
				closeModal={() => setShowSettings(!showSettings)}
			>
				<div className='p-10 gap-5 flex flex-col relative'>
					<CloseIcon
						className='absolute top-1 left-1 -translate-x-2 -translate-y-2'
						size={36}
						onClick={() => setShowSettings(!showSettings)}
					/>
					<Range
						changeNumber={changeNumber}
						reseatFormValues={reseatFormValues}
					/>
					<PowerToggleButton
						text='Assistant'
						handleState={handleAssistant}
						state={assistant}
						delay={1200}
					/>
				</div>
			</Modal>
		</div>
	)
}

//Todo: Mejorar UI de rango
//Todo: Assistant
//Todo: Botton sacar animaciones
//Todo: Boton mostrar el resultado correcto (capaz)
//Todo: Agregar Lista de lenguajes
//Todo: Elegir formato de número
