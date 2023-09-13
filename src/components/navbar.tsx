import Image from "next/image"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import MovieBoxLogo from '@/public/assets/movie-box-logo.svg'
import HamburgerIcon from '@/public/assets/hamburger-icon.svg'

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
        <nav>
            <div>
                <Image src={MovieBoxLogo} alt="movie box" />
                <p>MovieBox</p>
            </div>
            <form
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </form>
            <div>
                <p>Sign In</p>
                <Image src={HamburgerIcon} alt="hamburger" />
            </div>
        </nav>
    )
}

export default Navbar