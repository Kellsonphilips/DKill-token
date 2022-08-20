import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token, createActor, canisterId } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {

  const [recipientId, setRecipientId] = useState("");
  const [recipientAmount, setRecipientAmount] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  
  async function handleClick() {
    setIsHidden(true);
    setIsDisabled(true);
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(recipientAmount);

    

    // getting our authentication to work with the getting the logged in user and
    // this only works with the deployed version of our code and not locally
    // if the codes below are uncommented the we have to comment out the token.transfer().

    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();

    // const authenticatedCanister = createActor(canisterId, {
    //   agentOption: {
    //     identity,
    //   },
    // });
    // const result = await authenticatedCanister.transfer(
    //   recipient,
    //   amountToTransfer
    // );

    const result = await token.transfer(recipient, amountToTransfer);
    setIsDisabled(false);
    setIsHidden(false);

    setFeedback(result);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(event) => setRecipientId(event.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={recipientAmount}
                onChange={(event) => setRecipientAmount(event.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
