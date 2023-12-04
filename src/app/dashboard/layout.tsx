'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LuLayoutDashboard } from 'react-icons/lu'
import { LayoutDashboard, Users, Hotel, Plane, Bus } from 'lucide-react'

import useStore from '@/lib/store'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/dashboard'

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter()

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
				<nav className='min-w-[250px]'>
					<ul className='space-y-2 p-3'>
						{routes.map((route, i) => (
							<li key={i}>
								<Link
									className={cn(
										{ 'bg-gray-100': path === route.path },
										'flex gap-2 cursor-pointer items-center rounded-md p-3 transition-colors  hover:bg-gray-100',
									)}
									href={route.path}>
									{route.icon}
									<span>{route.name}</span>
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
