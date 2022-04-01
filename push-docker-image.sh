set -e
docker build -t artcoded/website .
docker tag artcoded/website artcoded:5000/artcoded/website
docker push artcoded:5000/artcoded/website