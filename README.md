# npm-github-package-example

npm registry to GitHub Package Registry example.

This repository test for GitHub Workflow.

## Release Workflow

1. [Manual] Update Version: `npm vession {patch,minor,major}`
2. [Manual] Push: `git push`
3. [CI] Publish to npm and Push a tag to GitHub  

This Release flow is defined in [.github/workflows/publish.yml](./.github/workflows/publish.yml)

```yaml
name: publish
env:
  CI: true
on:
  push:
    branches:
      - master
    tags:
      - "!*"
jobs:
  release:
    name: Setup
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v1
      - name: setup Node
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
          registry-url: 'https://npm.pkg.github.com'
      - name: install
        run: npm install
      - name: test
        run: npm test
      # Publish to npm if this version is not published
      - name: Publish
        run: |
          npx can-npm-publish --verbose && npm publish || echo "Does not publish"
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      # Push tag to GitHub if the version's tag is not tagged
      - name: package-version-to-git-tag
        uses: azu/action-package-version-to-git-tag@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          github_repo: ${{ github.repository }}
          git_commit_sha: ${{ github.sha }}
```

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @azu/npm-github-package-example

## Usage

```js
import { hello } from "@azu/npm-github-package-example"
hello("john"); // => "Hello, john"
```

## Changelog

See [Releases page](https://github.com/azu/npm-github-package-example/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/npm-github-package-example/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
