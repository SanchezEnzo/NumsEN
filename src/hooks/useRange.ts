import { RangeContext } from "@/contexts/range";
import { useContext } from "react";

export function useRange() {
	const context = useContext(RangeContext)

	if (!context) {
		throw new Error("useRange must be used within a RangeProvider")
	}

	return context
}

