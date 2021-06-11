import Link from 'next/link'
import meta from '../meta.json'
import { RiGithubFill, RiTwitterFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="d-flex flex-justify-center border-top">
      <p className="p-2 mr-4 mb-0">@RainbowCodingStudio</p>
      <Link href={meta.github}>
        <a className="p-2 mr-2 mb-0">
          <RiGithubFill style={{ width: 24, height: 24 }}/>
        </a>
      </Link>
      <Link href={meta.twitter}>
        <a className="p-2 mb-0">
          <RiTwitterFill style={{ width: 24, height: 24 }}/>
        </a>
      </Link>
    </footer>
  )
}