#!/bin/bash

docker build -t datakaveri/adaptor-framework-ui -f setup/container/Dockerfile .

docker push datakaveri/adaptor-framework-ui

