echo "----------------- [GIT PUBLISH - INIT] ----------------";

if [ -z "$PUBLISH_VERSION" ]; then 
  echo "Cosa vuoi rilasciare ( major | minor | patch | none | X.y.Z) "
  read PUBLISH_VERSION;
fi


if [ $PUBLISH_VERSION = "none" ]; then
   version=`sed 's/.*"version": "\(.*\)".*/\1/;t;d' ./package.json`;   
   versionNPM=v$version;
   echo "current version is $versionNPM"
else
    versionNPM=`npm --no-git-tag-version  --allow-same-version version $PUBLISH_VERSION`;
    echo "new version is $versionNPM"
    echo "enter to continue"
    read xxx;
    sed -i -e  "s/Version \S*\+/Version ${versionNPM//v/}/" README.md ;    
fi

if [ -z "$FLAG_PUBLISH_RELEASE" ]; then 
  echo "Vuoi pubblicare una release sia per test che per prod ( S | any ) ?"
  read FLAG_PUBLISH_RELEASE; 
fi

if [ "$FLAG_PUBLISH_RELEASE" == "S" ]; then 
  FLAG_MERGE_DEVELOP_MASTER="N";
  FLAG_PUBLISH_DEVELOP="S";
  FLAG_PUBLISH_MASTER="S";
  echo "Stai eseguendo una release per la versione $versionNPM";
  read xxx;   
  # push  
  git checkout develop;
  git add .;
  git commit -m "publish version $versionNPM" --no-verify
  git flow release start "$versionNPM";
  echo "release inziata. La chiudo?"
  read xxx;
  git flow release finish -m "Versione $versionNPM" "$versionNPM";
  echo "Controlla che il merge da develop a master non abbia creato conflitti";
  read xxx;
  git checkout develop;
  git push;
  git checkout master;
  git push --tags;
  git push;
  git checkout develop;    
fi

if [ -z "$FLAG_PUBLISH_DEVELOP" ]; then 
  echo "Vuoi pubblicare develop ( S | any ) ?"
  read FLAG_PUBLISH_DEVELOP; 
fi

if [ "$FLAG_PUBLISH_DEVELOP" == "S" ]; then  
  echo "Stai pubblicando la versione $versionNPM su test";
  read xxx;  
  # push
  git checkout develop;  
  git add .;
  git commit -m "update into version $versionNPM" --no-verify
  git push; 
  # tag
  if [ -z "$FLAG_PUBLISH_TAG_TEST" ]; then 
    echo "Vuoi creare un tag per la release di test ( S | any ) ?"
    read FLAG_PUBLISH_TAG_TEST; 
  fi

  if [ "$FLAG_PUBLISH_TAG_TEST" == "S" ]; then 
    git tag -a "test-$versionNPM" -m "update test into version $versionNPM"; 
    git push origin "test-$versionNPM";  
  else 
    echo "Lanciare la pipeline di deploy a mano su test";
    read xxx;
  fi  
fi

if [ -z "$FLAG_PUBLISH_MASTER" ]; then 
  echo "Vuoi pubblicare master ( S | any ) ?"
  read FLAG_PUBLISH_MASTER; 
fi

if [ "$FLAG_PUBLISH_MASTER" == "S" ]; then  
  echo "Stai pubblicando la versione $versionNPM su production";
  read xxx;  
  # push
  git checkout master;

  if [ -z "$FLAG_MERGE_DEVELOP_MASTER" ]; then 
    echo "Vuoi mergiare develop su master ( S | any ) ?"
    read FLAG_MERGE_DEVELOP_MASTER; 
  fi

  if [ "$FLAG_MERGE_DEVELOP_MASTER" == "S" ]; then 
    git merge develop;
    echo "Controlla che il merge da develop a master non abbia creato conflitti";
    read xxx;
  fi

  git add .;
  git commit -m "update into version $versionNPM" --no-verify
  git push; 
  # tag
  if [ -z "$FLAG_PUBLISH_TAG_PROD" ]; then 
    echo "Vuoi creare un tag per la release di prod ( S | any ) ?"
    read FLAG_PUBLISH_TAG_PROD; 
  fi

  if [ "$FLAG_PUBLISH_TAG_PROD" == "S" ]; then 
    git tag -a "prod-$versionNPM" -m "update prod into version $versionNPM"; 
    git push origin "prod-$versionNPM";  
  else 
    echo "Lanciare la pipeline di deploy a mano su prod";
    read xxx;
  fi

fi

echo "----------------- [GIT PUBLISH - END] ----------------";