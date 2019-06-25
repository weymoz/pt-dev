tar czf peopletalk.tar.gz peopletalk/index.html \
  peopletalk/index.js \
  peopletalk/main.css \
  peopletalk/package.json \
  peopletalk/img

scp peopletalk.tar.gz hetz:~
rm -rf peopletalk.tar.gz

ssh hetz << 'ENDSSH'
PATH="/home/alul/.nvm/versions/node/v10.16.0/bin:$PATH"
pm2 stop peopletalk
rm -rf peopletalk-server

mkdir peopletalk-server
tar xf peopletalk.tar.gz -C peopletalk-server
rm peopletalk.tar.gz

cd peopletalk-server/peopletalk
npm install
cd ..

pm2 start peopletalk
ENDSSH



 
