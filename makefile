
run-web: 
	cd web && \
	yarn dev

run-backend: 
	cd ./backend \
	&& air

docker-build:
	docker build -t emote-care .

docker-run:
	docker run  -p 8080:8080 emote-care