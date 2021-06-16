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
  const _page = join(process.cwd(), `.${fileName}`)
  const _exit = fs.existsSync(_page)
  const fileContents = fs.readFileSync(_exit?_page:page, 'utf8')
  return matter(fileContents)
}
