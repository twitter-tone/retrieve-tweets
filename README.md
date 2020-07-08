# retrieve-tweets

Node.js application that uses the  [twitter](https://www.npmjs.com/package/twitter) package to stream an accounts tweets to [Apache Kafka](https://kafka.apache.org/).

- `consumer.js` has a test consumer for development purposes.
- `docker-compose.yaml` allows you to start a single-node Kafka cluster locally by using `docker-compose up`. Doing this will start Kafka, Zookeeper and create a Docker network on your machine. To Shut it down use use `docker-compose down`.

## Getting Started

### Prerequisites

- Node.js
- Docker
- [Twitter authentication tokens](https://developer.twitter.com/en/docs/basics/authentication/oauth-1-0a/obtaining-user-access-tokens)

### Run locally

1. Run `npm install` to install dependencies.
1. Start local Kafka instance using `docker-compose up`.
1. Set environment variables in a `.env` file.
1. In separate shells run `npm start` and `npm run consume`.

### Environment variables

| Environment variable name | Description | Default |
| ------------------------- | ----------- | ------- |
| `TWITTER_ID` | The twitter account you want to stream the tweets of, ID can be found at http://gettwitterid.com | N/A |
| `KAFKA_BOOTSTRAP_SEVERS` (optional) | Address of the Kafka instance you are connecting to. | `localhost:9092` |
| `ACCESS_TOKEN` | Twitter Access token used to authenticate OAuth 1.0a | N/A|
| `ACCESS_TOKEN_SECRET` | Twitter Access secret used to authenticate OAuth 1.0a | N/A|
| `CONSUMER_KEY` | Twitter Consumer key used to authenticate OAuth 1.0a | N/A|
| `CONSUMER_SECRET` | Twitter Consumer secret used to authenticate OAuth 1.0a | N/A|

Twitter authentication docs: https://developer.twitter.com/en/docs/basics/authentication/oauth-1-0a
