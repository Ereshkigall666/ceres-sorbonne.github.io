cd ./src
if not exist data\ (git clone https://github.com/CERES-Sorbonne/ceres-www-content.git ./data)
cd ./data
git pull
@REM curl "https://opentheso.huma-num.fr/opentheso/api/all/theso?id=th265&format=jsonld" -o thesaurus.json 
cd ../..
@REM npm start