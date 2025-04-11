#!/bin/bash

CONTAINER_NAME="sinan-jupyter"
IMAGE_NAME="sinan-notebook"
PORT=8888

# Verifica se o contêiner já existe
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "O contêiner '$CONTAINER_NAME' já existe."

    # Verifica se o contêiner está em execução
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        echo "O contêiner já está em execução. Reiniciando-o..."
        docker restart $CONTAINER_NAME
    else
        echo "O contêiner não está em execução. Iniciando-o..."
        docker start $CONTAINER_NAME
    fi
else
    echo "Compilando imagem '$IMAGE_NAME'..."
    docker build -t $IMAGE_NAME .
    echo "Iniciando o contêiner '$CONTAINER_NAME'..."
    docker run -d --name $CONTAINER_NAME -p $PORT:8888 $IMAGE_NAME
fi

echo "Acesse o notebook Jupyter em: http://localhost:$PORT"