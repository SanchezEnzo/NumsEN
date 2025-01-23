import { ChangeEvent, useState } from "react"
import { numberToText } from "../service/numberToString"
import { LANGUAGES_TO_VOICE } from "../constants/languages"

type Language = typeof LANGUAGES_TO_VOICE[keyof typeof LANGUAGES_TO_VOICE]

export function useLanguage({ number }: { number: number }) {
	const [language, setLanguage] = useState<Language>(LANGUAGES_TO_VOICE.UK)
	console.log(language)
	function playAudio() {
		window.speechSynthesis.cancel()
		const utterance = new SpeechSynthesisUtterance(numberToText(number))
		utterance.lang = language
		window.speechSynthesis.speak(utterance)
	}

	const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
		setLanguage(LANGUAGES_TO_VOICE[e.target.value as keyof typeof LANGUAGES_TO_VOICE])
	}

	return { language, changeLanguage, playAudio }
}