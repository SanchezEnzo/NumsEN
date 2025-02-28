import { RESPONSE_STATE } from "@/constants/responseState";
import { useState } from "react";

export function useResponse () {
	const [response, setResponse] = useState(RESPONSE_STATE.INIT)
	
	const updateResponse = (newResponse: RESPONSE_STATE) => {
		setResponse(newResponse)
	}

	return {response, updateResponse}
	
}