import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RangeProvider } from './contexts/range.tsx'
import { AssistanteProvider } from './contexts/assistant.tsx'

createRoot(document.getElementById('root')!).render(
	<AssistanteProvider>
		<RangeProvider>
			<App />
		</RangeProvider>
	</AssistanteProvider>
)
