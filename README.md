
## Next Optimus Readme

A NextJS driven README website for project introduction use, simply display project related markdown files like: `README.md`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, etc.



>  blog pages comming soon...

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/lwz7512/next-optimus-readme&project-name=with-mdx-remote&repository-name=next-big-project)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/lwz7512/next-optimus-readme next-big-project
# or
yarn create next-app --example https://github.com/lwz7512/next-optimus-readme next-big-project
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Notes

### Conditional custom components

When using `next-mdx-remote`, you can pass custom components to the MDX renderer. However, some pages/MDX files might use components that are used infrequently, or only on a single page. To avoid loading those components on every MDX page, you can use `next/dynamic` to conditionally load them.

For example, here's how you can change `getStaticProps` to pass a list of component names, checking the names in the page render function to see which components need to be dynamically loaded.

```js
import dynamic from 'next/dynamic'
import Test from '../components/test'

const SomeHeavyComponent = dynamic(() => import('SomeHeavyComponent'))

const defaultComponents = { Test }

export function SomePage({ mdxSource, componentNames }) {
  const components = {
    ...defaultComponents,
    SomeHeavyComponent: componentNames.includes('SomeHeavyComponent')
      ? SomeHeavyComponent
      : null,
  }

  return <MDXRemote {...mdxSource} components={components} />
}

export async function getStaticProps() {
  const source = `---
  title: Conditional custom components
  ---

  Some **mdx** text, with a default component <Test name={title}/> and a Heavy component <SomeHeavyComponent />
  `

  const { content, data } = matter(source)

  const componentNames = [
    /<SomeHeavyComponent/.test(content) ? 'SomeHeavyComponent' : null,
  ].filter(Boolean)

  const mdxSource = await serialize(content)

  return {
    props: {
      mdxSource,
      componentNames,
    },
  }
}
```


## FAQ

<details>

<summary>How do I add more language highlighting support?</summary>

By default `prism-react-renderer` only includes an [arbitrary subset of the languages](https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js) that Prism supports. You can add support for more by including their definitions from the main `prismjs` package:

```js
import Prism from "prism-react-renderer/prism";

(typeof global !== "undefined" ? global : window).Prism = Prism;

require("prismjs/components/prism-kotlin");
require("prismjs/components/prism-csharp");
```
</details>

<details>

<summary>How do I use my old Prism css themes?</summary>

`prism-react-renderer` still returns you all proper `className`s via the prop getters,
when you use it. By default however it uses its new theming system, which output a
couple of `style` props as well.

If you don't pass `theme` to the `<Highlight />` component it will default to not
outputting any `style` props, while still returning you the `className` props, like
so:

```js
<Highlight
  {...defaultProps}
  code={exampleCode}
  language="jsx"
  theme={undefined}
>
  {highlight => null /* ... */}
</Highlight>
```

</details>


## Credits

- Banner Image Photo by [Benjamin Davies @unsplash](https://unsplash.com/photos/JrZ1yE1PjQ0)
- Logo and fav Icons made by [Freepik](https://www.flaticon.com/) from [flaticon](https://www.flaticon.com)
- [Favicon Generator. For real.](https://realfavicongenerator.net/)
