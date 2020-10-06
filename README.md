<!-- TABLE OF CONTENTS -->
## Table of Contents 

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->
## About The Project

A small Discord bot aimed to make it easier to record attendance at Powerbits Gameteam (PBS) Hell Let Loose trainings. See https://pbsgameteam.com for more info about joining in.

### Built With
* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](http://nodejs.org/)
* [Discord.js](https://discord.js.org)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Currently known prerequisites:
- [Node.js v12](https://nodejs.org/dist/latest-v12.x/)

### Installation

1. Clone the repo
```sh
git clone https://github.com/isaac-jordan/squad-bot-discord.git
cd squad-bot-discord
```
1. Create a new Discord application at https://discord.com/developers/applications
1. Head to the "Bot" tab, grab the token, and paste it into credentials.json as `discord_bot_token` like so
```json
{
    "discord_bot_token": "<your_token>"
}
```
1. Head to the "OAuth2" tab:
  1. Select "bot" as the scope
  1. Select these permissions:
    1. `View Channels`
    1. `Send Messages`
    1. `Attach Files`
  1. Copy the URL (starting `https://discord.com/api/oauth2/authorize?`), and use it to add the bot to your test server (it can be useful to write this down inside credentials.json)
1. Install NPM packages
```sh
npm install
```
1. Run locally using `npm run start:dev`

<!-- USAGE EXAMPLES -->
## Usage

1. Add [the bot](https://discord.com/api/oauth2/authorize?client_id=744661621141536808&permissions=101376&scope=bot) to your Discord server
1. Type `!squadbot <gamename>` in a text channel in your Discord server
  1. The bot will respond with a text file containing the users in each voice channel under a channel category containing "<gamename>"

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/isaac-jordan/squad-bot-discord/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Create an issue!

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [README Template](https://github.com/othneildrew/Best-README-Template)
