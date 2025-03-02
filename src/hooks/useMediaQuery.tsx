import { useRef, useSyncExternalStore } from 'react'

function useMediaQueryInternal(query: string) {
	const mediaQuery = useRef(window.matchMedia(query))

	return useSyncExternalStore(
		callback => {
			mediaQuery.current.addEventListener('change', callback)
			return () => {
				mediaQuery.current.removeEventListener('change', callback)
			}
		},
		() => mediaQuery.current.matches
	)
}

export default function useMediaQuery () {
	const isMobile = useMediaQueryInternal('(max-width: 640px)')
	
	return {isMobile}
}

