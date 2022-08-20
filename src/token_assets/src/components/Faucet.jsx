import React, { useState } from "react";
import { token, createActor, canisterId } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  
  const [buttonText, setButtonText] = useState("Gimme gimme");
 
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleClick(event) {

    setIsDisabled(true);

    // getting our authentication to work with the getting the logged in user and 
    // this only works with the deployed version of our code and not locally
    // if the codes below are uncommented the we have to comment out the token.payOut().

    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();

    // const authenticatedCanister = createActor(canisterId, {
    //   agentOption: {
    //     identity,
    //   },
    // });
    // const result = await authenticatedCanister.payOut();

    const result = await token.payOut();
    setButtonText(result);
    
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free DKills tokens here! Claim 10,000 DK tokens to your Principal
        ID {props.userPrincipal}.
      </label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
