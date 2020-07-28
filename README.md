# next-boilerplate

## Features

### Profile

- Sign-up
- Log-in
- Profile editing
- Password reset (With SendGrid)

### Sanity Querying

- Latest Blog/Product fetching
- Blog post page
- Product Page

### E-commerce

- Product page includes Snipcart configuration

### Mailchimp

- Newsletter sign-up form, hooked up to Mailchimp's API

### XML Feeds

- Sitemap
- Blog Post RSS

## Config/Setup

### - Website

#### Running Locally

`cd website`

`npm i`

`npm run dev`

#### Linting

`cd website`

`npm i`

`lint` or `lint-fix`

### - CMS

#### Running Sanity

`cd cms`

`sanity install`

`sanity start`

#### Deploying Sanity

`sanity deploy`

### - Heroku

#### Heroku Variables

- MAILCHIMP_LIST_ID=XXX
- MAILCHIMP_API_KEY=XXX
- SENDGRID_API_KEY=XXX
- SANITY_PREVIEW_SECRET=XXX
- SANITY_API_TOKEN=XXX
- SANITY_API_TOKEN_WRITE=XXX
- SANITY_PROJECT_ID=XXX
- SNIPCART_SECRET_KEY=XXX
- SNIPCART_API_KEY=XXX
- IRON_PASSWORD=some_not_random_password_that_is_at_least_32_characters
- NODE_MODULES_CACHE=false
- PROJECT_PATH=website

#### Heroku Buildpacks (In order)

- https://github.com/timanovsky/subdir-heroku-buildpack
- heroku/nodejs
