'use client'

import { useState, useEffect, cloneElement } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronRight, LayoutDashboard, Users, Hotel, Plane, Bus } from 'lucide-react'

import useStore from '@/lib/store'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/dashboard'

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const [sidebarToggle, setSidebarToggle] = useState(false)

	const store = useStore()
	useEffect(() => {
		if (!store.admin) {
			const url = window.location.href
			store.setUrl(url.substring(url.indexOf('/dashboard'), url.length))
			return router.push('/')
		}
	}, [])

	const path = usePathname()
	const routes = [
		{
			name: 'Dashboard',
			path: '/dashboard',
			icon: <LayoutDashboard />,
		},
		{
			name: 'Users',
			path: '/dashboard/users',
			icon: <Users />,
		},
		{
			name: 'Hotels',
			path: '/dashboard/hotels',
			icon: <Hotel />,
		},
		{
			name: 'Umrahs',
			path: '/dashboard/umrahs',
			icon: <Plane />,
		},
		{
			name: 'Transportations',
			path: '/dashboard/transportations',
			icon: <Bus />,
		},
	]
	return (
		<main className='min-h-screen'>
			<header className='flex h-[100px] w-full items-center border-b border-gray-300'>
				<Navbar className='flex-1' />
			</header>
			<main className='flex min-h-[calc(100vh-100px)]'>
				<nav
					className={cn(
						{
							'w-[250px]': sidebarToggle,
							'w-[72px]': !sidebarToggle,
						},
						'overflow-hidden transition-all',
					)}>
					<ul className='space-y-2 p-3'>
						<li
							className='flex justify-end rounded-md bg-blue-500 p-3 text-white'
							key={0}>
							<ChevronRight
								className={cn('cursor-pointer transition-transform', { 'rotate-180': sidebarToggle })}
								onClick={() => setSidebarToggle((prev) => !prev)}
							/>
						</li>
						{routes.map((route, i) => (
							<li key={i + 1}>
								<Link
									className={cn(
										{ 'bg-gray-100': path === route.path },
										'flex cursor-pointer items-center justify-start gap-2 rounded-md p-3 transition-colors  hover:bg-gray-100',
									)}
									href={route.path}>
									{cloneElement(route.icon, {
										className: cn('max-w-[24px] min-w-[24px] flex-1'),
									})}
									<span
										className={cn('transition-all', {
											invisible: !sidebarToggle,
											visible: sidebarToggle,
										})}>
										{route.name}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<main className='flex flex-1 border-l border-gray-300 p-4'>{children}</main>
			</main>
		</main>
	)
}
