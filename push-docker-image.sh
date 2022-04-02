set -e
docker build -t nbittich/website .
docker tag nbittich/website nbittich/website
docker push nbittich/website