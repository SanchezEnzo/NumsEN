import { createContext, useState } from "react";

interface RangeContextProps {
	range: { min: number; max: number }
	updateRange: ({ min, max }: { min: number; max: number }) => void
}

const rangeInitialValue: RangeContextProps = {
	range: { min: 0, max: 1000 },
	updateRange: ({ min, max }) => ({ min, max }),
}

export const RangeContext = createContext(rangeInitialValue)

export function RangeProvider ({ children }: { children: React.ReactNode }) {
	const [range, setRange] = useState(rangeInitialValue.range)

	const updateRange = ({ min, max }: { min: number, max: number }) => setRange({ min, max })
	
	return (
		<RangeContext.Provider value={{range, updateRange}}>
			{children}
		</RangeContext.Provider>
	)
}