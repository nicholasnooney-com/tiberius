# tiberius

Tiberius: The second Hugo Theme for nicholasnooney.com.

## Usage

### Install

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

### Develop

```shell
hugo server
```

### Release

```shell
hugo --gc --minify --enableGitInfo
```
