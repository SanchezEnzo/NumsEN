import { POWER_BUTTON_STATES } from '@/components/ui/PowerToggleButton'
import React, { createContext, useState } from 'react'

interface AssistantProps {
	assistant: POWER_BUTTON_STATES
	splitResponse: (string | boolean)[][]
	updateSplitResponse: (newResponse: (string | boolean)[][]) => void
	handleAssistant: (state: POWER_BUTTON_STATES) => void
}

const assistantInitialContext: AssistantProps = {
	assistant: POWER_BUTTON_STATES.OFF,
	splitResponse: [],
	updateSplitResponse: (newResponse: (string | boolean)[][]) => newResponse,
	handleAssistant: (state: POWER_BUTTON_STATES) => state,
}

export const AssistantContext = createContext(assistantInitialContext)

export function AssistanteProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [assistant, setAssistant] = useState(POWER_BUTTON_STATES.OFF)
	const [splitResponse, setSplitResponse] = useState<(string | boolean)[][]>([])

	const handleAssistant = (state: POWER_BUTTON_STATES) => setAssistant(state)

	const updateSplitResponse = (newResponse: (string | boolean)[][]) =>
		setSplitResponse(newResponse)

	return (
		<AssistantContext.Provider
			value={{ assistant, splitResponse, updateSplitResponse, handleAssistant }}
		>
			{children}
		</AssistantContext.Provider>
	)
}
