import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'

import { TypeTaskFormState } from '@/types/task.types'
import { UseFormWatch } from 'react-hook-form'
import { useCreateTask } from './useCreateTask'
import { useUpdateTask } from './useUpdateTask'

interface IUseTaskDebounce {
	watch: UseFormWatch<TypeTaskFormState>
	itemId: string
}

export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {

	const { updateTask } = useUpdateTask()
	const { createTask } = useCreateTask()

	const debounceCreateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			createTask(formData)
		}, 1000),
		[]
	)

	const debounceUpdateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			updateTask({ id: itemId, data: formData })
		}, 1000),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debounceUpdateTask({
					...formData,
					priority: formData.priority || undefined
				})
			} else {
				debounceCreateTask(formData)
			}
		})
		return () => {
			unsubscribe()
		}
	}, [watch(), debounceUpdateTask, debounceCreateTask])
}
