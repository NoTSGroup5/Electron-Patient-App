# EPD Patiënten Electron App

> Hyperledger Fabric Composer

## Hoe start ik deze waardeloze rotzooi?
Als eerste moet je pleuris veel kut npm modules aanpassen. Dit moet omdat Composer
heel graag ssl wilt gebruiken over een http verbinding. Nu zal je denken, he, dat kan toch helemaal niet?
En daar heb je helemaal gelijk in. De schijt module fabric-ca ofzo iets wat overigens een dependency is van 20 andere verschillene dependencies doet dit maar al te graag. Daarom moet je voor nu dit aanpassen.

### Stappenplan

1. Zoek een fles sterke drank
2. Drink ongeveer de helft op, totdat je net niet van je stoel af valt
3. Doe dit: https://github.com/NoTSGroup5/Notes/blob/master/fabric-composer.md, todo: dit moet vast wel ergens configureerbaar zijn.
4. Start de restful api
5. voeg een patient toe met onze master app of api
6. Stop de api
7. Start de restful api op: ```composer-rest-server -n epd -p defaultProfile -i admin -s adminpw -N never -P 3000 -S true```
8. Issue een identity: ```composer identity issue -n 'epd' -i admin -s adminpw -u JOUWBSNHIER -a "nl.epd.blockchain.Patient#JOUWBSNHIER"```
9. Open je bash profile: ```nano ~/.bash_profile```
10. Voeg dit toe:

```
export COMPOSER_PROVIDERS='{
"facebook": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": "418136505238517",
    "clientSecret": "647f96abfa817961ff6ae9fabf8dd6ea",
    "authPath": "/auth/facebook",
    "callbackURL": "/auth/facebook/callback",
    "successRedirect": "http://localhost:9080?done=true"
    }
}'
```

Hoop dat ik niks ben vergeten, anders roep maar.

## Medeleven

Ik wil graag mijn moeder, mijn vader en mijn overleden cavia bedanken
omdat het mij gelukt is. Na twee helse dagen om deze schijt app werkend te krijgen.

Mocht je iets willen doneren omdat je mij zo ontzettend geweldig vind of omdat je medeleven met mij hebt omdat ik zo ontzettend lelijk ben.

Doneer dan naar: Sanders moeder #rekt


