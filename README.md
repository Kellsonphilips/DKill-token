# Getting to work or test this project
- fork or clone this repo `git clone repo URL`
- this project uses `motoko ICP language` so follow the steps provided in this `doc`
- ICP works around `canisters` and you will be working with `canister Ids`
- through the `CLI` use codes provided to fetch your `canister ids` and your `principal ids`
- each and everyone are assigned a different `canister id` and `principal ids`
- having multiple canisters , each canister has a different `canister id`

---

# Check your Balance

1. Find out your principal id:

```
dfx identity get-principal
```

2. Save it somewhere.

e.g. My principal id is: nb4v5-5uyib-pp6jr-conxo-o7dkd-56r3i-zq5td-judgr-gwpqs-mrzfz-uae


1. Format and store it in a command line variable:
```
OWNER_PUBLIC_KEY="principal \"$( \dfx identity get-principal )\""
```

4. Check that step 3 worked by printing it out:
```
echo $OWNER_PUBLIC_KEY
```

5. Check the owner's balance:
```
dfx canister call token balanceOf "( $OWNER_PUBLIC_KEY )"
```

---

# Charge the Canister


1. Check canister ID:
```
dfx canister id token
```

2. Save canister ID into a command line variable:
```
CANISTER_PUBLIC_KEY="principal \"$( \dfx canister id token )\""
```

3. Check canister ID has been successfully saved:
```
echo $CANISTER_PUBLIC_KEY
```

4. Transfer half a billion tokens to the canister Principal ID:
```
dfx canister call token transfer "($CANISTER_PUBLIC_KEY, 500_000_000)"
```

---

# Deploy the Project to the Live IC Network

1. Create and deploy canisters:

```
dfx deploy --network ic
```

2. Check the live canister ID:
```
dfx canister --network ic id token
```

3. Save the live canister ID to a command line variable:
```
LIVE_CANISTER_KEY="principal \"$( \dfx canister --network ic id token )\""
```

4. Check that it worked:
```
echo $LIVE_CANISTER_KEY
```

5. Transfer some tokens to the live canister:
```
dfx canister --network ic call token transfer "($LIVE_CANISTER_KEY, 50_000_000)"
```

6. Get live canister front-end id:
```
dfx canister --network ic id token_assets
```
7. Copy the id from step 6 and add .raw.ic0.app to the end to form a URL.
e.g. zdv65-7qaaa-aaaai-qibdq-cai.raw.ic0.app
