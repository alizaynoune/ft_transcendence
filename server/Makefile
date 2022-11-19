FILE= ./docker-compose.yml
NAMES = server
DB_FOLDER = ./database/data
VLM = `docker volume ls -q`
all:
	mkdir -p $(DB_FOLDER)
	docker-compose -f  $(FILE) up -d --build
	docker ps
	# yarn && yarn start:dev

clean:
	docker-compose -f $(FILE) down
rmimg:
	docker rmi -f $(NAMES)

rmvol:
	docker volume rm $(VLM)

rmdb:
	rm -rf $(DB_FOLDER)

fclean: clean  rmimg rmvol rmdb

re: fclean all