import dayjs from 'dayjs'
import type { FormatOptions } from 'react-day-picker'

const seasonEmoji: Record<string, string> = {
	winter: '⛄️',
	spring: '🌸',
	summer: '🌻',
	autumn: '🍂'
}

const getSeason = (month: Date): keyof typeof seasonEmoji => {
	const monthNumber = month.getMonth() + 1

	if (monthNumber > 2 && monthNumber < 6) return 'spring'
	if (monthNumber > 5 && monthNumber < 9) return 'summer'
	if (monthNumber > 8 && monthNumber < 12) return 'autumn'
	else return 'winter'
}

export const formatCaption = (month: Date, options?: FormatOptions): string => {
	const season = getSeason(month)
	const monthName = dayjs(month).format('MMMM')

	return `${seasonEmoji[season]} ${monthName}`
}
