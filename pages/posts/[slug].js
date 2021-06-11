import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'


import Layout from '../../components/Layout'
import { components } from '../../components/MDX'
import Header from '../../components/Header'
import PostHeader from '../../components/PostHeader'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'


export default function PostPage({ source, frontMatter }) {
  return (
    <Layout>
      <Header />
      <PostHeader 
        title={frontMatter.title}
        description={frontMatter.description}
      />
      <main>
        <MDXRemote {...source} components={components} />
      </main>

    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
