import { RiGithubFill, RiTwitterFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="d-flex flex-justify-center border-top" style={{fontSize: 16}}>
      <p className="p-2 mr-4 mb-0">@RainbowCodingStudio</p>
      <a href="#" className="p-2 mr-2 mb-0">
        <RiGithubFill style={{ width: 24, height: 24 }}/>
      </a>
      <a href="#" className="p-2 mb-0">
        <RiTwitterFill style={{ width: 24, height: 24 }}/>
      </a>
    </footer>
  )
}