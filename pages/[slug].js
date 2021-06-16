/**
 * sub menu for other pages
 * @2021/06/09
 */
 import Head from 'next/head'

 import Layout from '../components/Layout'
 import Header from '../components/Header'
 import HeroBanner from '../components/HeroBanner'
 import { getMarkdownBy } from '../lib/api'
 import { markdownToHtml } from '../lib/markdownToHtml'
 import meta from '../meta.json'


const realMenu = process.env.NEXT_PUBLIC_MENU ? 
    JSON.parse(process.env.NEXT_PUBLIC_MENU) : meta.menu

  
export default function MDPage({pageName, content}) {

  return (
    <Layout>
      <Head>
        <title>{pageName} | { process.env.NEXT_PUBLIC_TITLE || meta.title} </title>
      </Head>
      <Header />
      <HeroBanner
        title={process.env.NEXT_PUBLIC_TITLE || meta.title}
        description={process.env.NEXT_PUBLIC_DESCRIPTION || meta.description}
        imageURL={process.env.NEXT_PUBLIC_BANNER || meta.image}
      />
      <main
        className="markdown-body"
        dangerouslySetInnerHTML={{__html: content}} 
      />
    </Layout>
  )
}

 
export async function getStaticProps({ params }) {
  const { slug } = params
  const { content } = getMarkdownBy(slug)
  const htmlContent = await markdownToHtml(content || '')
  const currentMenu = realMenu.filter(m => m.slug === `/${slug}`)

  return { 
    props: {
      content: htmlContent,
      pageName: currentMenu[0].name
    }
  }
}

/**
 * get all the first level page paths for build phase use
 */
 export async function getStaticPaths() {
  const paths = realMenu.map(m => m.slug)
  return {
    paths,
    fallback: false,
  }

}
 