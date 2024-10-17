import { Dispatch, SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'

import styles from './ListView.module.scss'

interface IListAddArrowInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListAddArrowInput({
	filterDate,
	setItems
}: IListAddArrowInput) {
	const addRow = () => {
		setItems(prev => {
			if (!prev) return

			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		})
	}

	return (
		<div className={styles.addRow}>
			<button
				onClick={addRow}
				className='italic opacity-40 text-sm'
			>
				Add task...
			</button>
		</div>
	)
}
