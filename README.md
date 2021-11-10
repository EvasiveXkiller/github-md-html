# github-md-html

A simple command line utility to convert markdown files to html files in GitHub styles

Example: https://evasivexkiller.github.io/github-md-html/

## How to use

### Using `npx`
```shell
npx github-md-html --input=.\path\to\your\readme.md --output=.\path\to\your\output.html --title=README.html
```

### Using `npm`
```shell
npm i -D github-md-html

npm run toHTML -- --input=.\path\to\your\readme.md --output=.\path\to\your\output.html

# Ex.
npm run toHTML -- --input=.\README.md --output=.\README.html --title=README.html
```

### Flags

| Flag | Required | Default |
|---|---|---|
| `input`  | `true` | undefined |
| `output`  | `true` | undefined |
| `title`  | `false` | `"README"` |
| `keywords`  | `false` | `""` |
| `description`  | `false` | `""` |
| `icon`  | `false` | `""` |

## Contributing
Any PR requests are welcome!
