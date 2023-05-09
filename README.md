# Gamma Online Judge Admin 

## Dependencies

### Node

The node version used is 16. I'd suggest to install nvm using this [link](https://heynode.com/tutorial/install-nodejs-locally-nvm/) to manage node versions. After nvm installed, install Node 16 with this command:

```shell
nvm install 16
```

### Yarn

With node installed, we need to install yarn. Run the command:
```shell
npm install -g yarn
```

### Environment Variables

To ser env variables, copy and rename file `env-reference` to `.env` and fill with right environment variables.

## Running

First of all install all dependencies with:
```shell
yarn
```

Then start the application with:
```shell
yarn start
```

## Running with docker

Run: 
```shell
docker compose up --build
```