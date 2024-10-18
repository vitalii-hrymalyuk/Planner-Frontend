import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, act, useEffect } from 'react'

import { IPomodoroRoundResponse } from '@/types/pomodoro.types'

import { pomodoroService } from '@/services/pomodoro.service'

interface IUseTodaySession {
	setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>
	setSecondsLeft: Dispatch<SetStateAction<number>>
	workInterval: number
}

export function useTodaySession({
	setActiveRound,
	setSecondsLeft,
	workInterval
}: IUseTodaySession) {
	const {
		data: sessionsResponse,
		isLoading,
		refetch,
		isSuccess
	} = useQuery({
		queryKey: ['get today session'],
		queryFn: () => pomodoroService.getTodaySession()
	})

	const rounds = sessionsResponse?.data.rounds

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(round => !round.isCompleted)
			setActiveRound(activeRound)

			if (activeRound && activeRound?.totalSeconds !== 0) {
				setSecondsLeft(workInterval - activeRound.totalSeconds)
			}
		}
	}, [isSuccess, rounds])

	return { sessionsResponse, isLoading, refetch, isSuccess }
}
