import { useState } from "react"
import { numberToText } from "../service/numberToString"
import { LANGUAGES } from "../constants/languages"

type Language = typeof LANGUAGES[keyof typeof LANGUAGES]

export function useLanguage({ number }: { number: number }) {
	const [language, setLanguage] = useState <Language>(LANGUAGES.BRITISH)

	function playAudio() {
		window.speechSynthesis.cancel()
		const utterance = new SpeechSynthesisUtterance(numberToText(number))
		utterance.lang = language
		window.speechSynthesis.speak(utterance)
	}

	const changeLanguage = (lang: Language) => {
		setLanguage(lang)
	}

	return { language, changeLanguage, playAudio }
}