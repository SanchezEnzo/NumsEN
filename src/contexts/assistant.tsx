import { POWER_STATES } from '@/components/ui/PowerButton'
import React, { createContext, useState } from 'react'

interface AssistantProps {
	assistant: POWER_STATES
	splitResponse: [string, string]
	updateSplitResponse: (newResponse: [string, string]) => void
	handleAssistant: (state: POWER_STATES) => void
}

const assistantInitialContext: AssistantProps = {
	assistant: POWER_STATES.OFF,
	splitResponse: ['', ''],
	updateSplitResponse: (newResponse: [string, string]) => newResponse,
	handleAssistant: (state: POWER_STATES) => state,
}

export const AssistantContext = createContext(assistantInitialContext)

export function AssistanteProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [assistant, setAssistant] = useState(POWER_STATES.OFF)
	const [splitResponse, setSplitResponse] = useState<[string, string]>(['', ''])

	const handleAssistant = (state: POWER_STATES) => setAssistant(state)

	const updateSplitResponse = (newResponse: [string, string]) =>
		setSplitResponse(newResponse)

	return (
		<AssistantContext.Provider
			value={{ assistant, splitResponse, updateSplitResponse, handleAssistant }}
		>
			{children}
		</AssistantContext.Provider>
	)
}
