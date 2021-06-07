## Get started

1. Run `npm install --global yarn`
2. Fork this repo to your Github account (top right of screen)
3. Navigate to a local directory, and run `git clone <url-of-fork>` to clone forked repo to your local machine
4. Run `git remote add upstream https://github.com/tommyshang/treasure-hunt.git` to add remote
5. Run `yarn` in the project directory
6. Run `yarn start`

---

## Workflow

1. _IMPORTANT DO THIS OFTEN_ Fetch updates from upstream repo
   1. Run `git fetch upstream`
   2. Run `git checkout main` (if you are not already on main)
   3. Run `git merge upstream/main`
      1. Resolve merge conflicts\*
2. Make some changes in your forked repository
3. Run `git status, git add <filename>, git commit` locally
4. Run `git push` to push changes on your local main branch to your forked repo main branch
5. Submit pull request on Github

---

## Please develop the website follow the style guide and prototype provided.
