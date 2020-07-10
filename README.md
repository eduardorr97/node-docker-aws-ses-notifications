# Agentpayment invoices to flectra

Connector for send invoice and payment to Flectra

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

```bash
https://gitlab.com/ereyes/agentpaymentinvoicestoflectra.git

```

### Prerequisites

Docker and docker-compose are required for use

#### Docker

- for windows https://docs.docker.com/docker-for-windows/install/
- for ubuntu https://docs.docker.com/install/linux/docker-ce/ubuntu/

#### docker-compose

- for all platform https://docs.docker.com/compose/install/

### Installing

#### Environment

```env
AGENTPAYMENT_APP_NAME=Agentpayment
AGENTPAYMENT_APP_INSTANCE=clubname
AGENTPAYMENT_COLLECTION_NAME=\_Club
AGENTPAYMENT_SUBSCRIPTION_NAME=Clubs
AGENTPAYMENT_DEPLOY_HOST=127.0.0.1
AGENTPAYMENT_DEPLOY_PORT=3000
AGENTPAYMENT_DEPLOY_SSL=false
AGENTPAYMENT_DEPLOY_USER=user
AGENTPAYMENT_DEPLOY_PASSWORD=password
FLECTRA_APP_NAME=Flectra
FLECTRA_APP_INSTANCE=flectra
FLECTRA_DEPLOY_URL=http://127.0.0.1/
FLECTRA_DEPLOY_PORT=7073
FLECTRA_DEPLOY_DB=flectra
FLECTRA_DEPLOY_USERNAME=admin
FLECTRA_DEPLOY_PASSWORD=admin
```

After having docker and docker-compose ready you only have to execute a command console in the folder where you clone the project and execute the following command

```bash
docker-compose up
```

See `docker-compose --help` to see other available commands. You can also install command completion for the bash and zsh shell, which also shows you available commands.

## Running the tests

In the command console run the following command

```bash
docker build -t agentpaymentinvoicestoflectra --target test .&& docker run agentpaymentinvoicestoflectra
```

### Break down into end to end tests

The tests are looking to check the connection with the rest of the microservices and exchange data using a false copy of the microservices with which the app interacts

## Built With

- [NodeJS](https://nodejs.org/es/) - JavaScript runtime environment.
- [npm](https://www.npmjs.com) - Dependency Management
- [flectra-lib](https://www.npmjs.com/package/flectra-lib) - It is used for connection with Flectra.
- [api-ddp](https://www.npmjs.com/package/api-ddp) - It is used for connection with Meteor
