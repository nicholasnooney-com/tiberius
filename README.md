# Tiberius

Tiberius: The second Hugo Theme for nicholasnooney.com.

## Features

- Full text search via `lunr.js`.
- Configurable generation of a table of contents for longer posts.

## Dependencies

Node v14+
Hugo v88+

## Usage

### Configure

#### `config.toml`

The following customization is available in your site's config file:

```toml
# Declare a dependency on the theme (required)
[module]
  [[module.imports]]
    path = "github.com/nicholasnooney-com/tiberius"

# Setup full-text search with lunr.js (optional)
# To enable search, configure Hugo to create a `SearchIndex` output format.
[outputFormats]
  [outputFormats.SearchIndex]
    baseName = "search"
    isPlainText = true
    mediaType = "application/json"
    notAlternative = true
[outputs]
  home = ["HTML", "RSS", "SearchIndex"]
# To disable search, configure Hugo to ignore `search.md`, a file provided by
# Tiberius to render search results.
ignoreFiles = ['search.md']
```

#### Page Front Matter

The following customization is available for each page:

```yaml
# Exclude a page from the search results (default = false)
hidesearch: true
# Include a table of contents for the page (default = false)
toc: true
```

#### Static Files

Use <https://realfavicongenerator.net/> to convert a favicon image into the
required formats and place them at the root of the `static` folder.

- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `apple-touch-icon.png`
- `browserconfig.xml`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon.ico`
- `mstile-150x150.png`
- `safari-pinned-tab.svg`
- `site.webmanifest`

### Develop

#### First-Time Setup

Run the following commands from your site's root folder:

```shell
hugo mod npm pack
npm install
```

#### Build for Development

```shell
hugo server
```

When using Hugo's server for development, the beginning of each layout file
contains an HTML comment describing its path relative to the `layouts` folder.
This is intended to help with debugging when something doesn't look quite right.

```go
{{ if site.IsServer }}
{{ `<!-- path/to/layout.html -->` | safeHTML }}
{{ end }}
```

### Build for Release

```shell
hugo --gc --minify --enableGitInfo
```
