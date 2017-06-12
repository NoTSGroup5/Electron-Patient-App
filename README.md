# EPD Patiënten Electron App

> Hyperledger Fabric Composer

### Setup
This project assumes the following steps have been taken:

- Government added the patient
- Government provided the secret key for the patient

1. Open your bash profile
```nano ~/.bash_profile```

2. Add the following information to your bash profile (replace ID and SECRET with your info)

```
export COMPOSER_PROVIDERS='{
"facebook": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": "ID",
    "clientSecret": "SECRET",
    "authPath": "/auth/facebook",
    "callbackURL": "/auth/facebook/callback",
    "successRedirect": "http://localhost:9080?done=true"
    }
}'

```

3. Start the authentication API
```
npm run restAuthentication
```

4. Run the appication
```
npm run dev
```

5. Provide your BSN and Secret key

You should now be able to perform operations within the network.
