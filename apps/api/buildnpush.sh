aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 528838157348.dkr.ecr.us-east-1.amazonaws.com
docker build -t prod/scrapester .
docker tag prod/scrapester:latest 528838157348.dkr.ecr.us-east-1.amazonaws.com/prod/scrapester:latest
docker push 528838157348.dkr.ecr.us-east-1.amazonaws.com/prod/scrapester:latest