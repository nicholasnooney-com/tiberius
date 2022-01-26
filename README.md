# Tiberius

Tiberius: The second Hugo Theme for nicholasnooney.com.

## Usage

### Configure

#### Initial Setup (Required)

Add this section to your site's Hugo config file (`config.toml`):

```toml
[module]
  [[module.imports]]
    path = "github.com/nicholasnooney-com/tiberius"
```

Run the following commands:

```shell
hugo mod npm pack
npm install
```

#### Enable Site Search (Optional)

Add this section to your site's Hugo config file (`config.toml`):

```toml
[outputFormats]
  [outputFormats.SearchIndex]
    baseName = "search"
    isPlainText = true
    mediaType = "application/json"
    notAlternative = true

[outputs]
  home = ["HTML", "RSS", "SearchIndex"]
```

This will trigger Hugo to build a JSON index of the site at `/search.json`,
which is used to populate the results at the `/search` relative URL.

By default, all content in `.Site.RegularPages` is indexed. To exclude a
particular page from the index, add the following to the page's front matter:

```yaml
hideSearch: true
```

### Develop

```shell
hugo server
```

### Release

```shell
hugo --gc --minify --enableGitInfo
```
