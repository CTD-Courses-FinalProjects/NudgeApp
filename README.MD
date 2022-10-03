# <img  height="80" src="public\logo.png" alt="NUDGE App Logo"> Nudge App
* website: https://nudge-app-node-project.herokuapp.com/ 

Nudge is an app which tracks users events. Users can add, edit and delete any of their events.

## Getting Started
This is a [ejs](https://nextjs.org/) project bootstrapped with [`node.js and Express`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

* CSS: [`Bootstrap 5.2`](https://getbootstrap.com/), [`Bootswatch-layout`](https://bootswatch.com/united/)
* Authentication: [`passport`](https://www.passportjs.org/)

### Installation
* Clone repo => git clone https://github.com/CodergirlVS/NudgeApp.git
* cd NUDGE-APP
* Install dependencies => npm install (We are not using yarn)
* Now run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `views/pages/index.js`. The page auto-updates as you edit the file.

#### Environment Variables
By default all environment variables loaded through .env are only available in the Node.js environment, meaning they won't be exposed to the browser.
In order to expose a variable to the browser you have to prefix the variable with NEXT_PUBLIC_.
-We use a handful of environment variables to run the server. They are stored in the .env file. Please ask in slack for updated env file.
