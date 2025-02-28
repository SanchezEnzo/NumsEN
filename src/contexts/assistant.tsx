import { POWER_BUTTON_STATES } from '@/components/ui/PowerToggleButton'
import React, { createContext, useState } from 'react'

interface AssistantProps {
	assistant: POWER_BUTTON_STATES
	assistantResponse: (string | boolean)[][]
	updateAssistantResponse: (newResponse: (string | boolean)[][]) => void
	handleAssistant: (state: POWER_BUTTON_STATES) => void
}

const assistantInitialContext: AssistantProps = {
	assistant: POWER_BUTTON_STATES.OFF,
	assistantResponse: [],
	updateAssistantResponse: (newResponse: (string | boolean)[][]) => newResponse,
	handleAssistant: (state: POWER_BUTTON_STATES) => state,
}

export const AssistantContext = createContext(assistantInitialContext)

export function AssistanteProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [assistant, setAssistant] = useState(POWER_BUTTON_STATES.OFF)
	const [assistantResponse, setAssistantResponse] = useState<(string | boolean)[][]>([])

	const handleAssistant = (state: POWER_BUTTON_STATES) => setAssistant(state)

	const updateAssistantResponse = (newResponse: (string | boolean)[][]) =>
		setAssistantResponse(newResponse)

	return (
		<AssistantContext.Provider
			value={{ assistant, assistantResponse, updateAssistantResponse, handleAssistant }}
		>
			{children}
		</AssistantContext.Provider>
	)
}
