rm -rf dist &&
npm run build &&
cd dist &&
git init &&
git add . &&
git commit -m "deploy" &&
git remote add origin git@github.com:DuckZZZzzz/healthcare-admin-page.git &&
git push origin master -f -u && 
cd ..
echo https://duckzzzzzz.github.io/healthcare-admin-page/