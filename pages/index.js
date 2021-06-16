/**
 * Homepage
 * @2021/06/09
 */
import Head from 'next/head'
import Layout from '../components/Layout'
import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
import { getReadme } from '../lib/api'
import { markdownToHtml } from '../lib/markdownToHtml'
import meta from '../meta.json'
 
export default function Index({content}) {

  return (
    <Layout>
      <Head>
        <title>Home page | { process.env.NEXT_PUBLIC_TITLE || meta.title} </title>
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
 

export async function getStaticProps() {
  const { content } = getReadme()
  const htmlContent = await markdownToHtml(content || '')

  return { 
    props: {
      content: htmlContent
    }
  }
}
