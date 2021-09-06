import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
}

const prevTheme = window.localStorage.getItem('theme')

ReactDOM.render(
  <React.StrictMode>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme ? prevTheme : 'light'}>
      <App />
    </ThemeSwitcherProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

