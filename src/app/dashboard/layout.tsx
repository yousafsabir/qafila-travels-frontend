'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Navbar } from '@/components/dashboard'

export default function Layout({ children }: { children: React.ReactNode }) {
	const path = usePathname()
	const routes = [
		{
			name: 'Users',
			path: '/dashboard',
		},
		{
			name: 'Hotels',
			path: '/dashboard/hotels',
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
							<li
								key={i}
								className={cn(
									{ 'bg-gray-100': path.includes(route.path) },
									'cursor-pointer rounded-md p-3 transition-colors  hover:bg-gray-100',
								)}>
								<Link href={route.path}>{route.name}</Link>
							</li>
						))}
					</ul>
				</nav>
				<main className='flex-1 border-l flex border-gray-300 p-4'>{children}</main>
			</main>
		</main>
	)
}
