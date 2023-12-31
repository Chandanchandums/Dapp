import { useNavigate } from "react-router";
import { useAccount } from "wagmi";
import { useWallet } from "./../../data/context/walletContext";
import { useEffect } from "react";
import { useContractWalletType } from "./../../data/hooks/contract/useContractWalletType";

export const HeaderContainer = () => {
  const navigation = useNavigate();
  const { address } = useAccount();
  const { setWalletType } = useWallet();
  const { contractWalletType } = useContractWalletType(); //problem point

  useEffect(() => {
    if (!contractWalletType) {
      return;
    }

    setWalletType(contractWalletType);

    if (contractWalletType === "InActive") {
      navigation("/signup");
      return;
    }

  }, [contractWalletType, address, setWalletType, navigation]);

  return <div></div>;
};
