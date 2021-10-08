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

### Switches

| Switch | Required | Default |
|---|---|---|
| `input`  | `true` | undefined |
| `output`  | `true` | undefined |
| `title`  | `false` | `"README"` |

## Contributing
Any PR requests are welcome!
