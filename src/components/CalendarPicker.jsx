import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

export default function CalendarPicker({
  selectedDay,
  selectedMonth,
  selectedYear,
  viewMonth,
  viewYear,
  onViewChange,
  onSelect,
  hasError,
}) {
  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const blanks = Array.from({ length: firstDay }, (_, i) => i)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      onViewChange(11, viewYear - 1)
      return
    }
    onViewChange(viewMonth - 1, viewYear)
  }

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      onViewChange(0, viewYear + 1)
      return
    }
    onViewChange(viewMonth + 1, viewYear)
  }

  const isSelected = (day) =>
    selectedDay === day &&
    selectedMonth === viewMonth &&
    selectedYear === viewYear

  return (
    <div
      className={`rounded-2xl border-2 bg-white/60 p-4 transition-colors ${
        hasError
          ? 'border-red-400'
          : 'border-romantic-light/50'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToPrevMonth}
          className="p-2 rounded-full text-romantic-deep/70 hover:bg-romantic-light/30 cursor-pointer"
          aria-label="Mes anterior"
        >
          <FaChevronLeft />
        </motion.button>

        <p className="font-display font-semibold text-romantic-deep text-base sm:text-lg">
          {MONTHS[viewMonth]} {viewYear}
        </p>

        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToNextMonth}
          className="p-2 rounded-full text-romantic-deep/70 hover:bg-romantic-light/30 cursor-pointer"
          aria-label="Mes siguiente"
        >
          <FaChevronRight />
        </motion.button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-romantic-deep/50 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {blanks.map((blank) => (
          <div key={`blank-${blank}`} />
        ))}

        {days.map((day) => {
          const selected = isSelected(day)

          return (
            <motion.button
              key={day}
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => onSelect(day, viewMonth, viewYear)}
              className={`aspect-square rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                selected
                  ? 'bg-romantic-pink text-white shadow-md'
                  : 'text-romantic-deep hover:bg-romantic-light/40'
              }`}
            >
              {day}
            </motion.button>
          )
        })}
      </div>

      {selectedDay !== null && (
        <p className="mt-4 text-sm text-romantic-deep/70 text-center">
          Fecha seleccionada:{' '}
          <span className="font-semibold text-romantic-deep">
            {String(selectedDay).padStart(2, '0')}/
            {String(selectedMonth + 1).padStart(2, '0')}/
            {selectedYear}
          </span>
        </p>
      )}
    </div>
  )
}
