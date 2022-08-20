import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

    // testing out our canister
    Debug.print("Hello");

    let owner : Principal = Principal.fromText("nb4v5-5uyib-pp6jr-conxo-o7dkd-56r3i-zq5td-judgr-gwpqs-mrzfz-uae");
    let totalSupply : Nat = 1000000000;
    let symbol : Text = "DK";

    // making our balance entry and balances private so that it can't be modified except through the 
    // token actor or through pre and post upgrade. No class or canister will be able to modify our balances.
    private stable var balanceEntries : [(Principal, Nat)] = [];
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
     if (balances.size() < 1) {
        balances.put(owner, totalSupply);
    };
    

    public query func balanceOf(who: Principal) : async Nat {

        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        Debug.print(debug_show(msg.caller));

        if (balances.get(msg.caller) == null) {
            let amount = 10000;
            let result = await transfer(msg.caller, amount);
            return "Success!!!";
        } else {
            return "You've already Claimed before!"
        };
    };

    // Implementing transfer protocol, 
    // to: principal is to which ID are we transferring to.
    // amount in Natural numbers is how much tokens are we transferring 
    // who is trasferring is taken from the shared(msg), that is who triggered the transfer 
    // the id of who triggered the transfer will be taken and his balance checked if he have enough to what he wants to transfer
    // and the account is debited and credited to the Principal id he provided for the transfer
    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
       // Checking the balance of the transfer initiator
       let fromBalance = await balanceOf(msg.caller);

       // using control flow to check if the transfer initiator balance is greater than the amount they want to transfer
       if (fromBalance > amount) {
        // substract from the sender
        let newFromBalance : Nat = fromBalance - amount;
        //updating our ledger balances 
        balances.put(msg.caller, newFromBalance);

        // Crediting the user that the transfer is meant for... 
        // we know its annonymouse till the transfer is initiated then we get hold of the id 
        let toBalance = await balanceOf(to);
        // adding the amount to their initial balance
        let newToBalance = toBalance + amount;
        // updating our ledger for the reflection of the user new balance
        balances.put(to, newToBalance);

        return "Success!!!";
       } else {
        return "Insulficient Funds";
       }
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if (balances.size() < 1) {
            balances.put(owner, totalSupply);
        };
    };

 };