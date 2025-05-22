import { createLogger } from 'redux-logger'

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: false,
  colors: {
    title: () => '#4ade80', // Tailwind green-400
    prevState: () => '#60a5fa', // Tailwind blue-400
    action: () => '#facc15', // Tailwind yellow-400
    nextState: () => '#f472b6', // Tailwind pink-400
    error: () => '#f87171', // Tailwind red-400
  },
})

export default logger
