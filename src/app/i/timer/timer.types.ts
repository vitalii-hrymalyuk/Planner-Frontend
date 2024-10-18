import { IPomodoroRoundResponse } from '@/types/pomodoro.types'
import { Dispatch, SetStateAction } from 'react'

export interface ITimerState {
	secondsLeft: number
	activeRound: IPomodoroRoundResponse
	setIsRunning: Dispatch<SetStateAction<boolean>>
	setSecondsLeft: Dispatch<SetStateAction<number>>
	setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse>>
}