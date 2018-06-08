# rendah-mag

## Requirements

* [node](https://nodejs.org/en/) >= 6.0
* [npm](https://www.npmjs.com/) >= 3.0


## Getting Started

You can start by cloning the repository on your local machine by running:**

**2. Install all of the dependencies:**

```bash
yarn install
```

**3. Start to run it:**

```bash
yarn start:prodlocal    # Building bundle and running production server
```

Now the app should be running at [http://localhost:8080/](http://localhost:8080/)


## NPM Script Commands

[better-npm-run](https://github.com/benoror/better-npm-run) manages the scripts in a better way, which also provides the compatibility of cross-platform. All of the scripts are listed as following:

`yarn <script>`|Description
------------------|-----------
`start`|Run your app on the development server at `localhost:3000`. HMR will be enabled.
`start:prodlocal`|Bundle files to `./public/assets` and run it on the production server at `localhost:8080`.
`build`|Remove the previous bundled files and bundle it to `./public/assets`.
`clean:all`|Remove the client/server bundled stuff and the coverage report.
