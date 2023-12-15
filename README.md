# Vanilla JS example

> ⚠️ Please, avoid using vanilla JavaScript if possible on Telegram Mini Apps
> platform. It is better to use ES modules at least. [Learn more](#about-iife).

Vanilla JavaScript SDK usage example.

## Trying it out

### Live

This example is already deployed and can be viewed right in Telegram, just follow
the [link](https://t.me/tmajsbot/vanilla_example).

### Locally

Install dependencies:

```bash
pnpm i
```

Serve `index.html`:

```bash
pnpm run serve
```

Run tunnel to locally launched HTTP server:

```bash
pnpm run tunnel
```

`tunnel` command will return a URL which has to be used by [@BotFather](https://t.me/botfather). Bind
it to your Mini App and open the application.

## About IIFE

### Dependencies

Some of the packages use other `@tma.js` packages as dependencies. In this case there are 2
ways of importing them:

1. **By inserting another `script` tag which loads the dependency**.
   This way makes usage of package with a lot of dependencies almost unreal.
2. **By inlining these packages**.
   This way leads to code duplication between several packages using the same package as dependency.

As you can see, there is no optimal solution between both of them. As the additional problem
developer gets here, is bundler is unable to
use [tree shaking](https://stackoverflow.com/questions/45884414/what-is-tree-shaking-and-why-would-i-need-it),
making browser to load the code not used in the application. Imagine using the only 1 function from
some library like `lodash`, but fully load it.

### Unknown target

The other problem developer can face is IIFE packages are built for the specific browser of specific
version. So, the package author does not know which target he should choose as long as he doesn't
know it when creating such package. That's why the the package target should be lowered to support 
most part of browsers, but this also make final bunlde bigger.

### Conclusion

Unfortunately, developer is unable to avoid these problems when using IIFE format. This is the
reason why it is recommended to use modern technologies along with ESM format.

### When there is no other choice

First of all, it is required to load the package. Developer could use [JSDelivr](https://www.jsdelivr.com/) 
to do it:

```html

<head>
  <script src="https://cdn.jsdelivr.net/npm/@tma.js/sdk"></script>
</head>
```

Loaded packages of `@tma.js` in IIFE format are accessible by path `window.tmajs.*`:

```html

<head>
  <script src="https://cdn.jsdelivr.net/npm/@tma.js/sdk"></script>
</head>
<body>
  <script>
    var sdk = window.tmajs.sdk;
    console.log(sdk.retrieveLaunchData());
  </script>
</body>
```

> ⚠️ In this example we did not specify the exact version of required package. In this case,
> JSDelivr CDN will return the latest version of the package which in some cases may lead to
> unexpected behavior. To prevent such case, specify the exact version.
