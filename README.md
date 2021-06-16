
## Next Optimus Readme

A NextJS driven README website for project introduction use, simply display project related markdown files like: `README.md`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, etc.

>  blog pages comming soon...

## Features

- Standalone Next.js application which can be cusomized for your case
- A project doc generator using README.md and other .md files
- Builtin support for .mdx content generation


## How to use

There is a starter prject [using-optimus-readme](https://github.com/lwz7512/using-optimus-readme) which demonstrated the usage.

please check it out!


## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/lwz7512/next-optimus-readme&project-name=with-mdx-remote&repository-name=next-big-project)



## FAKE-FAQ

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
