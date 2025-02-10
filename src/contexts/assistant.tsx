import { POWER_STATES } from "@/components/ui/PowerButton";
import React, { createContext, useState } from "react";

interface AssistantProps {
	isAssistantOn: POWER_STATES
	handleAssistant: (state: POWER_STATES) => void
}

const assistantInitialContext: AssistantProps = {
	isAssistantOn: POWER_STATES.OFF,
	handleAssistant: (state: POWER_STATES) => state
}

export const AssistantContext = createContext(assistantInitialContext)

export function AssistanteProvider ({ children }: { children: React.ReactNode }) {
	const [isAssistantOn, setIsAssistantOn] = useState(POWER_STATES.OFF)

	const handleAssistant = (state: POWER_STATES) => {
		setIsAssistantOn(state)
	}

	return <AssistantContext.Provider value={{isAssistantOn, handleAssistant}}>
		{children}
	</AssistantContext.Provider>
}