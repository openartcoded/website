
git checkout main
git pull

npm version v$1
npm i
git add .

echo "push tag v$1..."
git push origin v$1

echo "push docker image v$1..."

docker build -t nbittich/website:v$1 .
docker tag nbittich/website:v$1 nbittich/website:v$1
docker push nbittich/website:v$1

git push

echo "done."