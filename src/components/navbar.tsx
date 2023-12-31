import Image from "next/image"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import MovieBoxLogo from '@/public/assets/movie-box-logo.svg'
import HamburgerIcon from '@/public/assets/hamburger-icon.svg'
import Link from "next/link"

const Navbar = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        router.push({
            pathname: '/search',
            query: {
                searchTerm
            }
        })

        setSearchTerm('')
    }

    return (
        <nav className="max-w-container-lg mx-auto px-6 lg:px-0 gap-8 md:gap-0 flex justify-between items-center py-5">
            <div className="flex items-center gap-5 flex-1">
                <Image src={MovieBoxLogo} alt="movie box" />
                <Link href='/'>
                    <p className="font-bold text-lg md:text-2xl">MovieBox</p>
                </Link>
            </div>
            <form
                className="flex-1 flex justify-stretch"
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    type="text"
                    className="border-2 border-white p-2 rounded-lg bg-transparent text-white placeholder:text-white w-full"
                    value={searchTerm}
                    placeholder="What do you want to watch?"
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </form>
            <div
                className="hidden sm:flex gap-4 items-center flex-1 justify-end"
            >
                <p>Sign In</p>
                <Image src={HamburgerIcon} alt="hamburger" />
            </div>
        </nav>
    )
}

export default Navbar