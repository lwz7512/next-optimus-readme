import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'


export function getReadme() {
  const readme = join(process.cwd(), 'README.md')
  const _readme = join(process.cwd(), '.README.md')
  const _exit = fs.existsSync(_readme)
  const fileContents = fs.readFileSync(_exit?_readme:readme, 'utf8')
  return matter(fileContents)
}

export function getMarkdownBy(slug) {
  const fileName = slug == 'license' ? 
    slug.toUpperCase() : `${slug.toUpperCase()}.md`
  const page = join(process.cwd(), fileName)
  const fileContents = fs.readFileSync(page, 'utf8')
  return matter(fileContents)
}

// const postsDirectory = join(process.cwd(), 'posts')

// export function getPartial(fileName) {
//   const mdFile = join(partialDirectory, `${fileName}.md`)
//   const fileContents = fs.readFileSync(mdFile, 'utf8')
//   const { content } = matter(fileContents)
//   return content
// }


// export function getPostSlugs() {
//   return fs.readdirSync(postsDirectory)
// }

// export function getPostBySlug(slug) {
//   const realSlug = slug.replace(/\.md$/, '')
//   const fullPath = join(postsDirectory, `${realSlug}.md`)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')
//   const { data, content } = matter(fileContents)

//   return {...data, content, slug: realSlug}
// }

// export function getAllPosts() {
//   const slugs = getPostSlugs()
//   const posts = slugs
//     .map((slug) => getPostBySlug(slug))
//     // sort posts by date in descending order
//     .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
//   return posts
// }
