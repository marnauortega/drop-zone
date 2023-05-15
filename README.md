![DDROP App](/public/screenshot.webp)

<br/>

An app to upload files to google drive built with [Next.js](https://nextjs.org/).

## [Live site](https://drop-zone-fundacion-esplai.vercel.app/)

<br/><br/>

## 🛠 Tools

<br/>

I've used the new [App router](https://nextjs.org/docs/app/building-your-application/routing) from Next.js 13, as well as the new [route handlers](https://nextjs.org/docs/app/building-your-application/routing/router-handlers) to create API endpoints. Other tools I've used are [Next Auth](https://next-auth.js.org/) for google authentication, [Google Drive API](https://developers.google.com/drive/api/guides/about-sdk), and [Framer Motion](https://www.framer.com/motion/?utm_source=google&utm_medium=adwords&utm_campaign=TW-WW-All-GS-UA-Traffic-20190326-Brand.Bmm_&gad=1&gclid=Cj0KCQjwsIejBhDOARIsANYqkD2_HzOAPDZ4CSmgJ5CL82OktAHY3lZclR1sU3QhpFOXEWKNMLADlfMaAgUnEALw_wcB) for animations. The deployment was done with [Vercel](https://vercel.com).

<br/><br/>

## ⚡️ Features

<br/>

- Redesigned screens to give the app a unique look. Here's the [figma file](<https://www.figma.com/file/oCTf5jFz0F8DZ9zEZqnaBy/Drop-Zone-(Copy)?type=design&node-id=0%3A1&t=X6XI4bPXTW9AfAOZ-1>)

![Animations](/public/design.png)

<br/>

- Animations and effects. There's animations at page load and also a cool effect when dropping files, thanks to css animations and Framer Motion.

![Animations](/public/animations.webp)

<br/>

- Responsive app. Adapted to all kinds of devices.

![Responsive](/public/responsive.webp)

<br/>

- Authentication with Next Auth. Protected Routes.

<br/>

- Connecting to Google Drive API. Showing result messages.

<br/>

- Deployment to Vercel.

<br/><br/>

## ✅ Code quality

<br/>

The code has been checked with SonarCloud and it passed all tests:

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=marnauortega_drop-zone)](https://sonarcloud.io/summary/new_code?id=marnauortega_drop-zone)

<br/><br/>

## 🗂 Folder layout

<br/>

This is a regular Next 13 app, so you'll find:

- The `app` directory, holding all the routes as `page.js` files. This is folder-based routing, so `/upload/page.js` can be accessed at `https://mainurl.com/upload`.
- The `api` folder (inside `app`), which is used to generate API endpoints. Here I've employed it to handle authentication with Next Auth.
- The `components` folder, which collects all standalone components. In this case simply a Provider for authentication.
- The `public` folder, which contains all assets.

<br/><br/>

## 🏁 Start the app

<br/>

To start the app and run it on a local development server, you must simply run `npm run dev`.

If you want to test a production ready build, you'll have to run `npm run build` and, when that's done, `npm run start`.

<br/><br/>

## 🚀 Roadmap

- Allow multiple file upload
