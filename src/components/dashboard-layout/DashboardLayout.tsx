import { PropsWithChildren } from 'react'

import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<div className='grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr]'>
			<Sidebar />
			<main
				style={{ padding: '2.3rem 2.3rem 0.23rem' }}
				className='overflow-x-hidden max-h-screen relative'
			>
				<Header />
				{children}
			</main>
		</div>
	)
}
