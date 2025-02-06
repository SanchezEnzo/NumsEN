import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RangeProvider } from './contexts/range.tsx'

createRoot(document.getElementById('root')!).render(
	<RangeProvider>
		<App />
	</RangeProvider>
)
