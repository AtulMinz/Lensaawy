"use client"

import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";

export const ConnectWallet = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress }) => {
        return (
          <Button onClick={show}>
            {isConnected ? truncatedAddress : "Connect Wallet"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
