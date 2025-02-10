import { POWER_STATES } from "@/components/ui/PowerButton";
import React, { createContext, useState } from "react";

interface AssistantProps {
	isAssistantOn: POWER_STATES
	splitResponse: [string, string]
	updateSplitResponse: (newResponse: [string, string]) => void
	handleAssistant: (state: POWER_STATES) => void
}

const assistantInitialContext: AssistantProps = {
	isAssistantOn: POWER_STATES.OFF,
	splitResponse: ['', ''],
	updateSplitResponse: (newResponse) => {},
	handleAssistant: (state: POWER_STATES) => state
}

export const AssistantContext = createContext(assistantInitialContext)

export function AssistanteProvider ({ children }: { children: React.ReactNode }) {
	const [isAssistantOn, setIsAssistantOn] = useState(POWER_STATES.OFF)
	const [splitResponse, setSplitResponse] = useState<[string, string]>(['',''])

	const handleAssistant = (state: POWER_STATES) => {
		setIsAssistantOn(state)
	}
	
	const updateSplitResponse = (newResponse: [string, string]) => {
		setSplitResponse(newResponse)
	}

	return <AssistantContext.Provider value={{isAssistantOn, splitResponse, updateSplitResponse, handleAssistant}}>
		{children}
	</AssistantContext.Provider>
}