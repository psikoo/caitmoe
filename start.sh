#!/bin/bash
homeRepo=$(pwd)
varRepo="/var/www/caitmoe"

echo "-- Pulling repo --"
cd $homeRepo
sudo git stash >/dev/null
sudo git pull >/dev/null
cd $varRepo
sudo git stash >/dev/null
sudo git pull >/dev/null

echo "-- Building backend --"
cd $homeRepo/nest-caitmoe
sudo docker build -t nest-caitmoe:1 . >/dev/null

cd $homeRepo/java-caitmoe
sudo mvn clean validate compile assembly:assembly -DdescriptorId=jar-with-dependencies
sudo cp ./target/autodownload-1-jar-with-dependencies.jar ./autodownload.jar
cd ./request
sudo chmod +x get.sh
sudo chmod +x post.sh
cd ..
sudo docker build -t java-caitmoe:1 . >/dev/null

echo "-- Building the frontend --"
echo "--         Astro         --"
cd $varRepo/frontend-caitmoe/site/astro/www
echo "> www"
sudo npm install >/dev/null
sudo npm run build >/dev/null

echo "--          Vue          --"
cd $varRepo/frontend-caitmoe/site/vue/y2k/vue
echo "> y2k"
sudo npm install >/dev/null
sudo npm run build >/dev/null

cd $varRepo/frontend-caitmoe/site/vue/cv/vue
echo "> cv"
sudo npm install >/dev/null
sudo npm run build >/dev/null

cd $varRepo/frontend-caitmoe/site/vue/dgt/vue
echo "> dgt"
sudo npm install >/dev/null
sudo npm run build >/dev/null

cd $varRepo/frontend-caitmoe/site/html/blog
echo "> blog"
fileNum=$(sudo ls ./entries | wc -l)
sudo touch ./entries/counter.txt
sudo chmod +666 ./entries/counter.txt
sudo echo $fileNum > ./entries/counter.txt

cd $homeRepo/docker-caitmoe
sudo docker compose down >/dev/null
sudo docker compose up -d >/dev/null

echo "-- Script End --"
