# [front-scss](https://front.mosquito.digital/)

Package containing shared scss functions, mixins and utility classes used across the internal [pattern-library](https://github.com/MosquitoDigitalLtd/pattern-library) and included with the [front](https://github.com/MosquitoDigitalLtd/front) boilerplate.

## Usage

Add the following imports to your main `scss` file:

* `@mosquitodigitalltd/front-scss/vars`
* `@mosquitodigitalltd/front-scss/functions`
* `@mosquitodigitalltd/front-scss/mixins`
* `@mosquitodigitalltd/front-scss/utilities`

To overwrite any of the default variables used to generate many of the classes you should edit the [_vars.scss](https://github.com/MosquitoDigitalLtd/front-scss/blob/master/_vars.scss) file located at `./src/static/styles/vars/_index/scss` as needed.

It needs to be imported directly *after* the `@mosquitodigitalltd/front-scss/vars` import e.g.

```scss
@import '@mosquitodigitalltd/front-scss/vars';
@import 'vars/index'; // override all shared default vars
@import '@mosquitodigitalltd/front-scss/functions';
@import '@mosquitodigitalltd/front-scss/mixins';
@import '@mosquitodigitalltd/front-scss/utilities';
```

If you are generating a Pattern Library using [front](https://github.com/MosquitoDigitalLtd/front) it will be located at `./src/static/styles/vars/_index/scss`

Alternatively install as standalone dependancy
`npm install @mosquitodigitalltd/front-scss`
