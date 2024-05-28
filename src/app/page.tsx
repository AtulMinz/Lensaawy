import { ConnectWallet } from "@/app/components/ConnectWallet";
import Publication from "./components/Publication/Publications";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={"Loading"}>
        <ConnectWallet />
      </Suspense>
      <Publication />
    </div>
  );
}
