import FacebookIcon from '@/public/assets/facebook-icon.svg'
import InstagramIcon from '@/public/assets/instagram-icon.svg'
import TwitterIcon from '@/public/assets/twitter-icon.svg'
import YoutubeIcon from '@/public/assets/youtube-icon.svg'
import Image from 'next/image'

const Footer = () => {
    return (
        <div className="flex flex-col gap-9 pt-40 pb-32 items-center">
            <ul className="flex gap-12">
                <li className='cursor-pointer'>
                    <Image src={FacebookIcon} alt='facebook' />
                </li>
                <li className='cursor-pointer'>
                    <Image src={InstagramIcon} alt='instagram' />
                </li>
                <li className='cursor-pointer'>
                    <Image src={TwitterIcon} alt='twitter' />
                </li>
                <li className='cursor-pointer'>
                    <Image src={YoutubeIcon} alt='youtube' />
                </li>
            </ul>
            <ul className="flex gap-12 text-lg font-bold ">
                <li className='cursor-pointer'>Conditions of Use</li>
                <li className='cursor-pointer'>Privacy & Policy</li>
                <li className='cursor-pointer'>Press Room</li>
            </ul>
            <p>&copy; MovieBox: Developed with 💖 by Gabriel Abubakar</p>
        </div>
    )
}

export default Footer