import { LANGUAGES_TO_SHOW } from "@/constants/languages"

export function Select({
	changeLanguage,
}: {
	changeLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
	return (
		<select
			className='outline outline-[0.1px] outline-secondary bg-accent rounded-t-md text-text text-card-foreground focus:outline focus:outline-secondary'
			onChange={e => changeLanguage(e)}
		>
			{LANGUAGES_TO_SHOW.map((lang, index) => (
				<option
					className='outline outline-[0.1px] outline-secondary'
					value={lang}
					key={index}
				>
					{lang}
				</option>
			))}
		</select>
	)
}
