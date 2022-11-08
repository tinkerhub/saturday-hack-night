[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://tinkerhub.org/">
    <img src="https://avatars.githubusercontent.com/u/45253922?s=400&u=bb1a9f5aa6706a6af63b653652a13d0f8a0f36fc&v=4" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Saturday Hacknight</h3>

  <p align="center">
    Where Hacking Happens
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Saturday Hacknight is a community built saturday-hack-night for Tinkers to conduct Hacking activities.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

-   [Firebase](https://firebase.com/)
-   [Next.js](https://nextjs.org/)
-   [Typescript](https://typescript.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

You need to install

1. [Node v16](https://nodejs.org/en/)
2. [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/tinkerhub/saturday-hack-night.git
    ```

2. Install all the NPM packages all the applications.

    > We are using Yarn workspace and turborepo to manage the applications in monorepo.

    ```sh
    yarn install
    ```

3. Copy the `.env.example` for each applications to `.env` in the same directory and fill the values required

4. Start the web application dev server and open `http://localhost:3000`

    ```sh
    yarn workspace web dev
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/tinkerhub/saturday-hack-night.svg?style=for-the-badge
[contributors-url]: https://github.com/tinkerhub/saturday-hack-night/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tinkerhub/saturday-hack-night.svg?style=for-the-badge
[forks-url]: https://github.com/tinkerhub/saturday-hack-night/network/members
[stars-shield]: https://img.shields.io/github/stars/tinkerhub/saturday-hack-night.svg?style=for-the-badge
[stars-url]: https://github.com/tinkerhub/saturday-hack-night/stargazers
[issues-shield]: https://img.shields.io/github/issues/tinkerhub/saturday-hack-night.svg?style=for-the-badge
[issues-url]: https://github.com/tinkerhub/saturday-hack-night/issues
[license-shield]: https://img.shields.io/github/license/tinkerhub/saturday-hack-night.svg?style=for-the-badge
[license-url]: https://github.com/tinkerhub/saturday-hack-night/blob/main/LICENCE
