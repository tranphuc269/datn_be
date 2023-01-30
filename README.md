## Docker command

```bash
#run project
$ docker-compose up

#exec to project container
$ docker exec -it <container_name> sh

#migration command
$ docker exec -it <container_name> npm run migration:generate --name=<migration_file_name>

#migration run
$ docker exec -it <container_name> npm run migration:run

#migration revert
$ docker exec -it <container_name> npm run migration:revert

#after delete migration file
$ docker exec -it <container_name> npm run build

#add library
$ docker exec -it -u 0 <container-name> sh
```
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

