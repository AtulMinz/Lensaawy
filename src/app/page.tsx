import { ConnectWallet } from "@/app/components/ConnectWallet";
import Publication from "./components/Publication/Publications";
import { Suspense } from "react";
import Profiles from "./components/Profile/Profiles";

export default function Home() {
  return (
    <div>
      <Suspense fallback={"Loading"}>
        <ConnectWallet />
      </Suspense>
      {/* <Publication /> */}
      <Profiles localname="stani" />
    </div>
  );
}
