import FacebookIcon from '@/public/assets/facebook-icon.svg'
import InstagramIcon from '@/public/assets/instagram-icon.svg'
import TwitterIcon from '@/public/assets/twitter-icon.svg'
import YoutubeIcon from '@/public/assets/youtube-icon.svg'
import Image from 'next/image'

const Footer = () => {
    return (
        <div className="flex flex-col gap-9 pt-40 pb-32 items-center">
            <ul className="flex gap-12">
                <li>
                    <a href="https://www.facebook.com/" target='_blank'>
                        <Image src={FacebookIcon} alt='facebook' />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/">
                        <Image src={InstagramIcon} alt='instagram' />
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/">
                        <Image src={TwitterIcon} alt='twitter' />
                    </a>
                </li>
                <li>
                    <a href="https://youtube.com/">
                        <Image className=' hover:fill-rose-800' src={YoutubeIcon} alt='youtube' />
                    </a>
                </li>
            </ul>
            <ul className="flex flex-col lg:flex-row text-center lg:text-left gap-12 text-lg font-bold text-gray-900">
                <li className='cursor-pointer hover:text-rose-700 duration-300'>Conditions of Use</li>
                <li className='cursor-pointer hover:text-rose-700 duration-300'>Privacy & Policy</li>
                <li className='cursor-pointer hover:text-rose-700 duration-300'>Press Room</li>
            </ul>
            <p className='text-center lg:text-left font-bold text-lg leading-normal text-gray-500'>&copy; 2023 MovieBox: Developed with 💖 by Gabriel Abubakar</p>
        </div>
    )
}

export default Footer