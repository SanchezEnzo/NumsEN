import { POWER_STATES } from '@/components/ui/PowerButton'
import React, { createContext, useState } from 'react'

interface AssistantProps {
	assistant: POWER_STATES
	splitResponse: (string | boolean)[][]
	updateSplitResponse: (newResponse: (string | boolean)[][]) => void
	handleAssistant: (state: POWER_STATES) => void
}

const assistantInitialContext: AssistantProps = {
	assistant: POWER_STATES.OFF,
	splitResponse: [],
	updateSplitResponse: (newResponse: (string | boolean)[][]) => newResponse,
	handleAssistant: (state: POWER_STATES) => state,
}

export const AssistantContext = createContext(assistantInitialContext)

export function AssistanteProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [assistant, setAssistant] = useState(POWER_STATES.OFF)
	const [splitResponse, setSplitResponse] = useState<(string | boolean)[][]>([])

	const handleAssistant = (state: POWER_STATES) => setAssistant(state)

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
