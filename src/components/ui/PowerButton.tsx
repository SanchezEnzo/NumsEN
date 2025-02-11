'use client'

import { useState } from 'react'
import { Power } from 'lucide-react'
import { motion, useAnimation, useMotionValue } from 'motion/react'

export enum POWER_STATES {
	ON,
	OFF,
	CHANGING,
}

export default function PowerButton({ text, isOn }: { text: string, isOn: boolean }) {
	const [powerState, setPowerState] = useState(POWER_STATES.OFF)
	const x = useMotionValue(0)
	const controls = useAnimation()

	const handleDrag = async ({
		newState,
		xStart,
		xFinish,
		xPreFinish,
	}: {
		newState: POWER_STATES
		xStart: number
		xFinish: number
		xPreFinish: number
	}) => {
		const dragDistance = x.get()
		const isTurningOn = newState === POWER_STATES.ON

		if (
			(isTurningOn && dragDistance > xPreFinish) ||
			(!isTurningOn && dragDistance < xPreFinish)
		) {
			await controls.start({ x: xFinish })
			setPowerState(POWER_STATES.CHANGING)

			setTimeout(() => {
				setPowerState(newState)
				controls.start({ x: xStart })
				x.set(xStart)
			}, 2000)
		} else {
			controls.start({ x: xStart })
		}
	}

	return (
		<div className='flex h-auto items-center justify-center'>
			<div className='w-56'>
				{powerState === POWER_STATES.CHANGING && (
					<div className='text-light-950 dark:text-dark-950 text-center bg-zinc-900 text-text h-14 rounded-full flex items-center justify-center border border-zinc-700'>
						{isOn ? <p>Shutting down...</p> : <p>Setting up...</p>}
					</div>
				)}
				{[POWER_STATES.OFF, POWER_STATES.ON].includes(powerState) && (
					<div className='bg-light-400 dark:bg-dark-400 relative h-14 overflow-hidden rounded-full bg-zinc-900 border border-zinc-700'>
						<div className='absolute inset-0 z-0 flex items-center justify-center overflow-hidden'>
							<div className='text-md loading-shimmer text-light-950 relative w-full text-center select-none bg-zinc-900 text-text'>
								{text}
							</div>
						</div>
						<motion.div
							drag='x'
							dragConstraints={
								powerState === POWER_STATES.OFF
									? { left: 0, right: 168 }
									: { left: -168, right: 0 }
							}
							dragElastic={0}
							dragMomentum={false}
							onDragEnd={() =>
								handleDrag({
									newState:
										powerState === POWER_STATES.OFF
											? POWER_STATES.ON
											: POWER_STATES.OFF,
									xStart: powerState === POWER_STATES.OFF ? 0 : 0,
									xFinish: powerState === POWER_STATES.OFF ? 168 : -168,
									xPreFinish: powerState === POWER_STATES.OFF ? 160 : -160,
								})
							}
							animate={controls}
							style={{ x }}
							className={`absolute top-1 z-10 flex h-12 w-12 cursor-grab items-center justify-center rounded-full shadow-md active:cursor-grabbing ${
								powerState === POWER_STATES.OFF
									? 'left-1 bg-red-500'
									: 'right-1 bg-lime-500'
							}`}
						>
							<Power
								size={32}
								className={
									powerState === POWER_STATES.OFF
										? 'text-red-800'
										: 'text-emerald-700'
								}
							/>
						</motion.div>
					</div>
				)}
			</div>
		</div>
	)
}
