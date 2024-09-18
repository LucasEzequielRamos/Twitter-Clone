import Link from "next/link"

const Footer = () => {
    return (
        <ul className="flex flex-wrap justify-center px-4 py-3 text-slate-500 text-xs">
            <li className="my-1 pr-4 hover:underline"><Link href='/'>About</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Download the X app</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Help Center</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Terms of Service</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Privacy Police</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Cookie Policy</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Accessibility</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Ads info</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Blog</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Careers</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Brand Resources</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Advertising</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Marketing</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>X for Business</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Developers</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Directory</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>Settings</Link></li>
            <li className="my-1 pr-4 hover:underline"><Link href='/'>© 2024 Fake Corp.</Link></li>
        </ul>
    )
}

export default Footer