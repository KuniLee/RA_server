# Temperature and humidity monitoring project

---
[racloud.ru](http://racloud.ru/)
---
[Frontend Source code](https://github.com/KuniLee/RA_Cloud)
## Technologies:
* node.js
* express.js
* graphql
* mqtt
* sequelize
* socket.io

## Working principle

**Temperature and humidity sensor** \
||\
_(4-20mA)_\
||\
v\
**Analog Input module (ET-7017)**\
||\
_(Modbus-TCP)_\
||\
v\
**Raspberry pi / node-red**\
||\
_(MQTT)_\
||\
v\
**RA-cloud** <=_(MySQL)_=> **dataBase**\
^\
||\
_(webSocket, GraphQl)_\
||\
v\
**[RA-Cloud](https://github.com/KuniLee/RA_Cloud)**

## Project start
```
npm run start
```

### Compiles and hot-reloads for development
```
npm run dev
```
