cd src/
if [ ! -d "./data" ];
then
    git clone https://github.com/CERES-Sorbonne/contenu-du-site.git ./data
fi
cd ./data
git pull origin main
# curl "https://opentheso.huma-num.fr/opentheso/api/all/theso?id=th358&format=jsonld" -o thesaurus.json 
cd ../..

# npx gatsby clean
# npm start
