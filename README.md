
### Comandos do prisma 
````

npm run prisma:local:push

npm run prisma:local:pull

npm run prisma:local:generate

npm run prisma:local:migrate


````

### exemplo de env:
`````

DATABASE_URL="mysql://root:aluno@localhost:3306/jooby_db"
PORT=5000
ENVIRONMENT=local
HOST=http://localhost
NODE_ENV=development
SECRET_KEY=myChavesecreta12345!@#
CLIENT_ORIGIN_URL="*"
TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhlNWExMjBhMTM1ZGYxMGMxNzczODlhODQ4MTczNiIsIm5iZiI6MTczMTQzMjY1OS4wMjk4ODI3LCJzdWIiOiI2NzJkMGViMmViZTIxZGVmMDhjOGRjNTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mChbJJ8m8CrsNzRXymoUoy83IdhEpjc9mPVa6WI1loQ


### Para puxar os códigos da branch master para a sua branch atual, siga os seguintes passos:
``````

git checkout sua-branch

git pull origin master

git checkout sua-branch

git merge master

