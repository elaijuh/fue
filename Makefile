start-client:
	cd fe; yarn serve

build:
	cd fe; yarn build

test:
	cd fe; yarn test

lint:
	cd fe; yarn lint

start-server:
	cd be; yarn dev

mock:
	docker run --rm  -v ~/docker/data/db:/data/db -p 27017:27017 -d mongo:4.0
