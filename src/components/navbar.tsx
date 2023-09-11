import Image from "next/image"
import MovieBoxLogo from '@/public/assets/movie-box-logo.svg'
import HamburgerIcon from '@/public/assets/hamburger-icon.svg'

const Navbar = () => {
    return (
        <nav>
            <div>
                <Image src={MovieBoxLogo} alt="movie box" />
                <p>MovieBox</p>
            </div>
            <div>
                <input type="text" />
            </div>
            <div>
                <p>Sign In</p>
                <Image src={HamburgerIcon} alt="hamburger" />
            </div>
        </nav>
    )
}

export default Navbar