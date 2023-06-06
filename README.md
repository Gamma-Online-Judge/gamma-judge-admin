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

## Imports using JSON:

### Problems

The fields statement, input, output, tutorial and notes supports both html and latex language. For support Latex, you need to put the latex code inside 2 '$' charactere. Some text formats needs of HTML tags like line break (< br >) and images (< img >).

If you want to import a problem using a json file, follow the format below. :
text encoding iso-8859-1

```json
{
    "customId": "Custom ID for the problem",
    "timeLimit": 1, // Time limit for the problem
    "memoryLimit": 256, // Memory limit for the problem
    "tags": [ // List of the tags for the problem in string format
        "Teste"
    ],
    "sampleInputs": [ // List of sample inputs of the problem with the given parameters for each object
        {
            "input": "1 2\n",
            "output": "3\n"
        }
    ],
    "pt_BR": { // Data in portuguese.
        "title": "Divisores de Fatoriais", // Title of the problem
        "statement": "", // Statement of the problem in base64 format
        "input": "", // Description of input of the problem in base64 format
        "output": "", // Description of output of the problem in base64 format
        "tutorial": "", // Tutorial to solve the problem in base64 format
        "notes": "" // Notes in the end of problem page usingbase64 format
    }
}
```

### Contest

```json
{
    "name": "", // Name of the contest
    "date": "2023-05-23T21:51:59.391Z", // Datetime that occured the contest 
    "customId": "1", // Custom Identifier to contest
    "problems": [ // list of problems in the contest
      {
        "identifier": "A", // Identifier of each problem inside contest
        "customId": "1A" // Identifier of the problem
      },
      {
        "identifier": "B",
        "customId": "1B"
      }
    ]
  }
```

## Adding images

It is possible to add images in problems importing by JSON or editing in Gamma Judge Admin interface. To do it add the tag HTML `<img>`
and use it to add your image. With it is possible to add images from url or using it base64 encoding. If you're importing by JSON, you need to encoding this tag along the rest of the text.

