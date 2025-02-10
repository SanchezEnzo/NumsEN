import { AssistantContext } from '@/contexts/assistant'
import { useContext } from 'react'

export function useAssistant() {
	const context = useContext(AssistantContext)

	if (!context)
		throw new Error('useAssistant have to be used within AsistantProvider')

	return context
}
