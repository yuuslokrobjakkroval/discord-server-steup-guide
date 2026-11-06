# Releases and Vercel deployments

These workflows run from the root of the `discord-guide` Git repository. They are prepared locally; no remote settings, secrets, commits, or deployments have been created.

## Branches and behavior

| Event | Version workflow | Deployment workflow |
| --- | --- | --- |
| Push to `develop` | None | TypeScript check, Vercel build, preview deployment |
| Pull request into `main` or `develop` | None | TypeScript check and production build; no deployment secrets |
| Push/merge to `main` | Create/update release PR, or publish the merged release | TypeScript check, Vercel build, production deployment |
| Run workflow manually | Release workflow accepts `main` only | Deploy workflow accepts `main` or `develop` |

Production deploys every push to `main`, including normal feature merges; it does not wait for a release tag. Release PRs are merged by a maintainer. The workflow does not auto-merge them. Workflow dispatch buttons appear once workflows are on the repository's default branch.

## One-time GitHub setup

1. Push the project and workflow files to GitHub. Your current local branch is `develop`; create `main` when you are ready for a production branch, and use `main` as the GitHub default branch. No branch changes were made automatically.
2. In **Settings > Actions > General > Workflow permissions**, enable **Allow GitHub Actions to create and approve pull requests**. Repository/organization policy must allow the workflow's `contents: write` and `pull-requests: write` permissions.
3. For automatic checks on release-please's bot-created PRs, add an optional `RELEASE_PLEASE_TOKEN` Actions secret: a fine-grained personal access token with this repository's **Contents: read/write** and **Pull requests: read/write** permissions. Without this secret the release workflow uses `GITHUB_TOKEN`, which can create releases and release PRs, but its bot-created PR events do not start other Actions workflows. If required PR checks are enabled, use the optional token so those checks run.
4. Optionally protect `main` with the `validate` check. Create GitHub environments named `preview` and `production` if you want environment-specific secrets or production reviewers; reviewers are optional.

## Automatic versions

Use Conventional Commit messages for changes merged to `main`. If you squash merge, use the conventional message as the PR/squash title.

- `fix: correct channel copy formatting` increments the patch version, for example `1.0.0` to `1.0.1`.
- `feat: add new banner styles` increments the minor version, for example `1.0.0` to `1.1.0`.
- `feat!: replace the blueprint format` increments the major version, for example `1.0.0` to `2.0.0`.
- `docs:`, `chore:`, and similar non-user-facing changes do not normally trigger a release on their own.

Release Please creates or updates one release PR containing the new `package.json` version, matching `package-lock.json`, `.release-please-manifest.json`, and `CHANGELOG.md`. Merge that PR to create a `vX.Y.Z` tag and GitHub Release with release notes. This app remains private and is not published to npm. The baseline is the existing `1.0.0`; no historical release is fabricated.

## One-time Vercel setup

1. Create/link a Vercel project for this repository with framework **Next.js**, root directory **./**, Node.js **22.x**, install command `npm ci`, and build command `npm run build`. There is no custom output directory. These files live in the Git repository root, even though the local repository folder is called `discord-guide`.
2. Create a Vercel access token in your Vercel account settings. In GitHub **Settings > Secrets and variables > Actions**, add these repository secrets (or add them to both GitHub deployment environments):

   | Secret | Value |
   | --- | --- |
   | `VERCEL_TOKEN` | Your Vercel access token with access to the project/team |
   | `VERCEL_ORG_ID` | The Vercel account/team ID |
   | `VERCEL_PROJECT_ID` | The Vercel project ID |

   IDs can be read from `.vercel/project.json` after running `npx vercel link` locally. Do not commit this file or tokens; `.vercel` and `.env*` are ignored.
3. In the Vercel project's Git settings use `main` as the production branch. `vercel.json` disables Vercel's automatic Git deployments so GitHub Actions owns the deployment path and does not deploy twice. The CLI commands can still deploy.
4. Push to `develop` for a preview or merge to `main` for production. The deployed URL appears in the workflow summary and GitHub environment. You can also choose **Actions > Deploy to Vercel > Run workflow** on one of these branches.

The deployment uses `vercel pull`, `vercel build`, and `vercel deploy --prebuilt`. Preview pulls use the `develop` branch's preview settings. Set application environment variables in Vercel; do not add their values to YAML. The CLI follows `vercel@latest`; update that workflow line to an exact CLI version if you want fixed tooling.

The asset pack's existing redistribution restriction still applies to hosted copies. Obtain permission from Ethical Studio before publishing the bundled assets.

## Verification and troubleshooting

Locally: `npm ci`, `npx next typegen`, `npm run typecheck`, then `npm run build`. The type-generation step makes checks work in a clean checkout where `.next` does not exist yet.

- Missing Vercel secrets: the deploy job reports the missing secret name before installing or deploying.
- No release PR: check conventional commit messages and GitHub PR permissions.
- Bot release PR has no checks: configure `RELEASE_PLEASE_TOKEN` as described above.
- Manual release skipped: select the `main` branch.
- Production from the wrong directory: ensure Vercel root is `./` for this repository.

References: [Release Please Action](https://github.com/googleapis/release-please-action), [Vercel with GitHub Actions](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel), [Vercel Git configuration](https://vercel.com/docs/project-configuration/git-configuration).
