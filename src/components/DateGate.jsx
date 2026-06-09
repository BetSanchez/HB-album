import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaKeyboard } from 'react-icons/fa'
import CalendarPicker from './CalendarPicker'

const TARGET_DAY = 12
const TARGET_MONTH = 12
const TARGET_YEAR = 2025

const INPUT_MODES = {
  CALENDAR: 'calendar',
  TEXT: 'text',
}

function matchesTargetDate(day, month, year) {
  return (
    day === TARGET_DAY &&
    month === TARGET_MONTH &&
    year === TARGET_YEAR
  )
}

function parseTextDate(input) {
  const normalized = input.trim().replace(/-/g, '/')
  const parts = normalized.split('/')

  if (parts.length !== 3) return null

  const [day, month, year] = parts.map((part) => parseInt(part, 10))

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return null
  }

  return { day, month, year }
}

export default function DateGate({ onUnlock }) {
  const [inputMode, setInputMode] = useState(INPUT_MODES.CALENDAR)
  const [dateInput, setDateInput] = useState('')
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(TARGET_MONTH - 1)
  const [selectedYear, setSelectedYear] = useState(TARGET_YEAR)
  const [viewMonth, setViewMonth] = useState(TARGET_MONTH - 1)
  const [viewYear, setViewYear] = useState(TARGET_YEAR)
  const [error, setError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    let date = null

    if (inputMode === INPUT_MODES.CALENDAR) {
      if (selectedDay === null) {
        setError(true)
        return
      }
      date = {
        day: selectedDay,
        month: selectedMonth + 1,
        year: selectedYear,
      }
    } else {
      date = parseTextDate(dateInput)
      if (!date) {
        setError(true)
        return
      }
    }

    if (matchesTargetDate(date.day, date.month, date.year)) {
      onUnlock()
      return
    }

    setError(true)
  }

  const handleTextChange = (event) => {
    setDateInput(event.target.value)
    if (error) setError(false)
  }

  const handleCalendarSelect = (day, month, year) => {
    setSelectedDay(day)
    setSelectedMonth(month)
    setSelectedYear(year)
    if (error) setError(false)
  }

  const switchMode = (mode) => {
    setInputMode(mode)
    setError(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 z-10"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="glass rounded-3xl p-8 sm:p-10 max-w-md w-full text-center"
      >
        <motion.div
          className="text-4xl mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔒
        </motion.div>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-gradient mb-2">
          Álbum Privado
        </h1>

        <p className="text-romantic-deep/70 text-sm sm:text-base mb-6">
          Ingresa la fecha especial para abrir este álbum
        </p>

        <div className="flex gap-2 mb-4 p-1 rounded-full bg-white/40">
          <button
            type="button"
            onClick={() => switchMode(INPUT_MODES.CALENDAR)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              inputMode === INPUT_MODES.CALENDAR
                ? 'bg-romantic-pink text-white shadow-sm'
                : 'text-romantic-deep/70 hover:bg-white/50'
            }`}
          >
            <FaCalendarAlt />
            Calendario
          </button>
          <button
            type="button"
            onClick={() => switchMode(INPUT_MODES.TEXT)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              inputMode === INPUT_MODES.TEXT
                ? 'bg-romantic-pink text-white shadow-sm'
                : 'text-romantic-deep/70 hover:bg-white/50'
            }`}
          >
            <FaKeyboard />
            Escribir
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {inputMode === INPUT_MODES.CALENDAR ? (
            <CalendarPicker
              selectedDay={selectedDay}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              viewMonth={viewMonth}
              viewYear={viewYear}
              onViewChange={(month, year) => {
                setViewMonth(month)
                setViewYear(year)
              }}
              onSelect={handleCalendarSelect}
              hasError={error}
            />
          ) : (
            <input
              type="text"
              value={dateInput}
              onChange={handleTextChange}
              placeholder="DD/MM/AAAA"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-white/60 text-romantic-deep text-center text-lg font-medium outline-none transition-colors ${
                error
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-romantic-light/50 focus:border-romantic-pink'
              }`}
              autoComplete="off"
            />
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm"
            >
              {inputMode === INPUT_MODES.CALENDAR && selectedDay === null
                ? 'Selecciona una fecha en el calendario.'
                : 'Fecha incorrecta. Intenta de nuevo.'}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-romantic w-full px-8 py-3 rounded-full font-semibold text-base cursor-pointer"
          >
            Desbloquear ✨
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}
