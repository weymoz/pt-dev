[Демо страница лендинга](https://weymoz.github.io/pt-dev)

В папке **dist** лежат все необходимые файлы.

- имена файлов картинок переделаны латиницей
- в css-js-includes.html подключены минифицированные версии файлов

```
dist/
|
├── img - фото для лендинга
|
├── js
│   ├── read-more-toggle.js - js для кнопки
│   └── read-more-toggle.min.js - минифицированный js для кнопки
|
├── css-js-includes.html - подключенине css и js 
|
├── landing.html - html лендинга без шапки и футера
|
├── main.css - css лендинга
|
├── main.min.css - css лендинга минифицированный
|
└── site - весь лендинг целиком для просмотра

```


Если надо запустить проект для разработки:
```bash
git clone https://github.com/weymoz/pt-dev.git
cd pt-dev
npm install
gulp dev
```

поднимется сервер для разработки, 
в папке /src все исходники
