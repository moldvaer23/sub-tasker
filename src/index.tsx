import React from 'react'

import { Provider } from 'react-redux'

import App from '00-App/App'
import { store } from '00-App/store'
import { createRoot } from 'react-dom/client'

import reportWebVitals from './reportWebVitals'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)

reportWebVitals()
