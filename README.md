<p align="center"><img width="200px" height="200px" alt="Hack Club icon" src="https://hackclub.com/icon/icon-masked.png"></a>
<h1 align="center"><a href="https://workshops.hackclub.com/">Hack Club Workshops</a></h1>
<p align="center"><i>A set of high-quality coding tutorials for Hack Club meetings.</i></p>

### Introduction

At [Hack Club](https://hackclub.com/) meetings, we [believe in](https://hackclub.com/philosophy/)
everyone learning what they’re interested in, at their own pace.
[Hack Club Workshops](https://workshops.hackclub.com/) is our repository of high-quality coding tutorials, intended for use at Hack Club meetings.

The content lives in [hackclub/hackclub](https://github.com/hackclub/hackclub)—this is just the website.

### Development environment setup

The stack: [Next.js](https://nextjs.org) & [Theme UI](https://theme-ui.com), with [Hack Club Theme](https://github.com/hackclub/theme) packages & [Hack Club Markdown](https://github.com/hackclub/markdown).

Stuff you need installed ahead of time:

- Git
- Yarn
- An operating system (we hope)
- A GitHub personal access token

Clone it!

    $ git clone https://github.com/hackclub/workshops

Go into the directory!

    $ cd workshops

Install dependencies!

    $ yarn

Create a `.env` file!

    $ touch .env

Create a [GitHub personal access token](https://github.com/settings/tokens)!

Add your token to `.env`!

    $ GITHUB=ghp_token

Run it!

    $ yarn run dev

Open it!
    $ open http://localhost:3000

### License

This project is licensed under the MIT license. Please see [`LICENSE.md`](LICENSE.md) for the full text.

MIT License
