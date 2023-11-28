'use client'

import { useRouter } from 'next/navigation'
import { LogOut, Settings, UserCircle2 } from 'lucide-react'
import { useEffect } from 'react'

import useStore from '@/lib/store'
import { useLogout } from '@/lib/mutations/users'
import { cn } from '@/lib/utils'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu'
import Link from 'next/link'

export function Navbar({ className }: { className?: string }) {
	const router = useRouter()
	const admin = useStore().admin

	const logout = useLogout()

	const onLogout = async () => {
		await logout.mutateAsync()
	}

	useEffect(() => {
		if (logout.isSuccess) {
			router.push('/login')
		}
	}, [logout.isSuccess])
	return (
		<main className={cn(className)}>
			<div className='mx-auto flex items-center justify-between px-10'>
				<h1 className='flex'>
					<img src='/images/logo-full.png' alt='' className='max-w-[120px] flex-1' />
				</h1>
				<nav>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className='flex cursor-pointer items-center'>
								<UserCircle2 className='mr-2 h-10 w-10' />
								<span>{admin?.user_name ? admin?.user_name : 'no_username'}</span>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56'>
							<DropdownMenuGroup>
								<DropdownMenuItem
									className='cursor-pointer'>
									<Link href={'/dashboard/profile'} className='flex'>
										<Settings className='mr-2 h-4 w-4' />
										<span>Profile</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem
									className='cursor-pointer'
									onClick={() => logout.mutate()}>
									<LogOut className='mr-2 h-4 w-4' />
									<span>Logout</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</nav>
			</div>
		</main>
	)
}
