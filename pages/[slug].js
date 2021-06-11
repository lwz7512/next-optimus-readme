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
  
 export default function Index({pageName, content}) {
 
   return (
     <Layout>
       <Head>
         <title>{pageName} | {meta.title} </title>
       </Head>
       <Header />
       <HeroBanner
         title={meta.title}
         description={meta.description}
         imageURL={meta.image}
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
  const currentMenu = meta.menu.filter(m => m.slug === `/${slug}`)


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
  const paths = meta.menu.map(m => m.slug)
  return {
    paths,
    fallback: false,
  }

}
 