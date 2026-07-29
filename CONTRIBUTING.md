# Contributing to Fingerprint Svelte SDK

## Working with code

We prefer using [pnpm](https://pnpm.io/) for installing dependencies and running scripts.

The main branch is locked for the push action. For proposing changes, use the standard [pull request approach](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). It's recommended to discuss fixes or new functionality in the Issues, first.

### Development playground

This project was generated with [svelte-kit](https://kit.svelte.dev/). Library code can be found in the [src/lib](./src/lib) directory.

Run `pnpm package:watch` to rebuild the library on each update.

In the [examples](./examples) directory you can find example apps, to run them, navigate to the given directory and execute `pnpm dev`. The app will run on [localhost:3000](http://localhost:3000) and reload automatically on changes.

### Running unit tests

Run `pnpm test` to execute the unit tests via [Vitest](https://vitest.dev/).

### Committing changes

We follow [Conventional Commits](https://conventionalcommits.org/) for committing changes. We use git hooks to check that the commit message is correct.

### How to publish

Releases are managed with [changesets](https://github.com/changesets/changesets). When you make a change that should be released, add a changeset to your pull request with `pnpm changeset` and commit the generated file in `.changeset/` along with your changes.

When pull requests with changesets are merged to the main branch, the release workflow opens (or updates) a "Version Packages" pull request that bumps the version and updates the changelog. Merging that pull request builds the package and publishes it to NPM.

### Generating docs

We use [typedoc](https://typedoc.org/) to generate docs. To generate docs run:

```shell
pnpm docs
```

The docs will be generated into [./docs](./docs) directory.

The docs are automatically deployed to Github Pages on every push to the main branch.

### Further help

To get more help on the svelte-kit check out the [documentation](https://kit.svelte.dev/docs/introduction) page.
