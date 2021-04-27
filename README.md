### Node-Vue-Docker-DEMO

1. Node.js - http as server side
2. Vue.js - vue-cli as ui view
3. Docker - docker-compose deploy

Use in local:  
1. ```in /server``` run ```node server.js```, see```http://localhost:3000```
2. ```in /vue-ui``` run ```npm run serve```, see```http://localhost:8080```

Use for docker:  
1. ```in /``` run ```docker-compose build --no-cache``` to build image by ```Dockerfile```.
2. ```docker-compose up``` to run container. see```http://localhost:8080```

keys:  
```
# server Dockerfile
FROM node:15

WORKDIR /usr/src/app/server

# COPY package*.json ./

# RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
```

```
# vue-ui Dockerfile
FROM node:15

WORKDIR /usr/src/app/vue-ui

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]
```

```
# docker-compose.yml
version: '3'
services:
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    container_name: node-vue-docker-demo-api
    volumes:
       - ./server:/usr/src/app/server
    #    - /usr/src/app/api/node_modules
  vue-ui:
    build:
      context: ./vue-ui
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    container_name: node-vue-docker-demo-vue-ui
    volumes:
       - ./vue-ui:/usr/src/app/vue-ui
       - /usr/src/app/vue-ui/node_modules
```

tips:  

1. 我们希望，在镜像build的过程中，`npm install` 安装好依赖，下次跑container的时候，就不需要`npm install` 了，加快速度。但是在本地开发的时候，需要将本地的project挂载到容器里面，这样会导致容器的node_modules被覆盖，导致依赖失效。所以需要将node_modules挂载到一个匿名卷上，防止被覆盖。
    1. docker-compose方式：
        1. docker-compose.yml 

        ```jsx
        version: '3'
        services:
          vue-ui:
            build:
              context: ./my-app
              dockerfile: Dockerfile-dev
            ports:
              - "8080:8080"
            container_name: vue-ui
            volumes:
               - ./my-app:/usr/src/app/my-app
               - /usr/src/app/my-app/node_modules
        ```

        2. Dockerfile 

        ```jsx
        FROM node:10

        WORKDIR /usr/src/app/my-app

        COPY package*.json ./

        RUN npm install

        EXPOSE 8080

        CMD ["npm", "run", "serve"]
        ```

    2. 普通方式
        1. 命令行 

        ```jsx
        // 创建vue-ui-image的镜像
        docker build -t vue-ui-image -f Dockerfile-dev .
        // 创建并启动vue-ui-container的容器，-v挂载，-P随机端口映射
        docker run --name vue-ui-container -v /Users/lugeek/NodeProjects/vuejs-nodejs-docker-compose/my-app:/usr/src/app/my-app -v /usr/src/app/my-app/node_modules -P vue-ui-image
        // 下次直接启动
        docker start vue-ui-container
        // 停止
        docker stop vue-ui-container
        ```
    3. .dockerignore 文件

        在 Dockerfile 的同一个文件夹中创建一个 .dockerignore 文件，带有以下内容：
        ```
        node_modules
        npm-debug.log
        ```
        这将避免你的本地模块以及调试日志被拷贝进入到你的 Docker 镜像中，以至于把你镜像原有安装的模块给覆盖了。