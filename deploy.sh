#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка приложения
npm run build

# переход в каталог сборки
cd dist

# инициализация репозитория и загрузка код в GitHub
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:bibivan/moire.git master:gh-pages

cd -
