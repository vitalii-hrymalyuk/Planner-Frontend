import { IPomodoroRoundResponse } from '@/types/pomodoro.types'
import type { ITimerState } from '../timer.types'
import { useLoadSettings } from './useLoadSettings'
import { useUpdateRound } from './useUpdateRound'

type TypeUseTimerActions = ITimerState & {
	rounds: IPomodoroRoundResponse[] | undefined
}

export function useTimerActions({ activeRound, setIsRunning, secondsLeft, rounds, setActiveRound }: TypeUseTimerActions) {
	const { workInterval } = useLoadSettings()
	const { updateRound, isUpdateRoundPending } = useUpdateRound()

	const pauseHandler = () => {
		setIsRunning(false)

		if (!activeRound?.id) return

		updateRound({
			id: activeRound?.id,
			data: {
				totalSeconds: secondsLeft,
				isCompleted: Math.floor(secondsLeft / 60) >= workInterval
			}
		})
	}

	const playHandler = () => {
		setIsRunning(true)
	}

	const nextRoundHandler = () => {
		if (!activeRound?.id) return

		updateRound({
			id: activeRound?.id,
			data: {
				isCompleted: true,
				totalSeconds: workInterval * 60
			}
		})
	}

	const prevRoundHandler = () => {
		const leastCompletedRound = rounds?.findLast(round => round.isCompleted)

		if (!leastCompletedRound?.id) return

		updateRound({
			id: leastCompletedRound?.id,
			data: {
				isCompleted: false,
				totalSeconds: 0
			}
		})

		setActiveRound(leastCompletedRound)
	}

	return { isUpdateRoundPending, pauseHandler, playHandler, nextRoundHandler, prevRoundHandler }
}