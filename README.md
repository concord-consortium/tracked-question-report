![build-status](https://travis-ci.org/concord-consortium/tracked-question-report.svg?branch=master)

# Tracked Questions Report

[Portal](https://github.com/concord-consortium/rigse) and [Lara](https://github.com/concord-consortium/lara) report showing student progress for tracked questions.

This is a simple passive react view, without any interactivity. `api.js` fetches all the data required to generate the report. There is some awkwardness in `api.js` as it has to query LARA about all the tracked questions in an offering.  `api.js` could use some love and attention.

It expects two URL params: `offering` and `token`. If they are not provided, it will be using fake data, so it's easy to work on some features without connecting to the real Portal or Lara instances.



### Development

First, you need to make sure that webpack is installed and all the NPM packages required by this project are available:

```
npm install -g webpack
npm install
```
Then you can build the project files using:
```
webpack
```
or start webpack dev server:
```
npm install -g webpack-dev-server 
webpack-dev-server
```
and open http://localhost:8080/ or http://localhost:8080/webpack-dev-server/ (auto-reload after each code change).

### Deployment

#### Github Pages:
You can build a simple github page deployment by following these steps:
1. prepare the destination directory: `rm -rf ./dist`
1. clone the gh-pages branch to dist: `git clone -b gh-pages git@github.com:concord-consortium/longitude-report.git dist`
1. build: `webpack`
1. add the files and commit: `cd dist; git add .; git commit -m "gh-pages build"`
1. push the changes to github: `git push`

#### Travis S3 Deployment:
NOT Configured for this project.  See [Portal Report](https://github.com/concord-consortium/portal-report) project.

#### Manual S3 Deployment
NOT Configured for this project.  See [Portal Report](https://github.com/concord-consortium/portal-report) project.

### Testing
This project does not have adequate testing.  The package.json includes deps to test with Mocha and Chai, and under `./test/components` there is one solitary simple starting test.

### Frameworks, conventions

This app is built using [React](https://facebook.github.io/react/) Take a look at [this great tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html). It also uses lots of ES6 syntax, so it might be good to review it first. Semicolons are discussable, but I've decided to follow Redux examples style.

### CSS styles

* Browser specific prefixes are not necessary, as this project uses [autoprefixer](https://github.com/postcss/autoprefixer), which will add them automatically.
* Webpack parses URLs in CSS too, so it will either copy resources automatically to `/dist` or inline them in CSS file. That applies to images and fonts (take a look at webpack config).
* All the styles are included by related components in JS files. Please make sure that those styles are scoped to the top-level component class, so we don't pollute the whole page. It's not very important right now, but might become important if this page becomes part of the larger UI. And I believe it's a good practice anyway. 
* I would try to make sure that each component specifies all its necessary styles to look reasonably good and it doesn't depend on styles defined somewhere else (e.g. in parent components). Parent components or global styles could be used to theme components, but they should work just fine without them too.
* When you modify the component style, please check how it looks while printed.



## License

[MIT](https://github.com/concord-consortium/grasp-seasons/blob/master/LICENSE)
