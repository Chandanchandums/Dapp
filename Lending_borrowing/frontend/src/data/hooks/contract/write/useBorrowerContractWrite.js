import { useLenderBorrowerContract } from "./../../../context/lenderBorrowerContractContext";
import { useNft } from "./../../../context/nftContext";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import {useEffect,useState} from 'react';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export const useBorrowerContractWrite = () => {
  const { lenderBorrowerContract } = useLenderBorrowerContract();
  const { selectedNft } = useNft();
  const toast = useToast();

  useEffect(() => {
    // Fetch existing token IDs from local storage
    const storedTokenIds = localStorage.getItem('tokenIds');
    setExistingTokenIds(storedTokenIds ? storedTokenIds.split('\n').map(id => id.trim()) : []);
  }, []);
  const [existingTokenIds, setExistingTokenIds] = useState([]);
  const newTokenId = ''; // Replace with your actual token ID


  const createLoan = async (amount, duration) => {
    try {
      console.log("3rd reach")
      console.log(amount);
      console.log(duration);
      console.log(selectedNft.contractAddress);
      console.log(selectedNft.tokenId);
      console.log(selectedNft.floorPrice);
      const value=ethers.utils.parseEther(amount.toString());
      console.log(value)
      console.log(ethers.utils.parseEther(amount.toString()))
      // const loanId = await lenderBorrowerContract.createLoan(
      //   {
      //     value: ethers.utils.parseEther(amount.toString()),
      //   },
      //   duration,
      //   selectedNft.contractAddress,
      //   selectedNft.tokenId,
      //   selectedNft.floorPrice
      // );

      
    
      const writeTokenIdToFile = () => {
        // Check if the token ID already exists
        const newTokenId=selectedNft.tokenId;
        if (!existingTokenIds.includes(newTokenId)) {
          // If not, update local storage with the new token ID
          const updatedTokenIds = [...existingTokenIds, newTokenId];
          localStorage.setItem('tokenIds', updatedTokenIds.join('\n'));
          console.log('Token ID written to local storage:', newTokenId);
          // Update the existing token IDs state if needed
          setExistingTokenIds(updatedTokenIds);
          
          toast({
            title: "Transaction succeded",
            position: "bottom-right",
            status: "success",
            isClosable: true,
          });

        } else {
          console.log('Token ID already exists. Stop!');
          toast({
            title: `${newTokenId} already used as the collateral`,
            position: "bottom-right",
            status: "error",
            isClosable: true,
          });
        }
      };
      await delay(10000);
      writeTokenIdToFile();








      return duration;
    } catch (exception) {
      toast({
        title: `${exception.error.message}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  const payLoanMonthlyDeposit = async (loanId) => {
    try {
      await lenderBorrowerContract.payLoanMonthlyDeposit(loanId);

      toast({
        title: "Transaction succeded",
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    } catch (exception) {
      toast({
        title: `${exception.error.message}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  const payCompleteLoan = async (loanId) => {
    try {
      await lenderBorrowerContract.payCompleteLoan(loanId);

      toast({
        title: "Transaction succeded",
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    } catch (exception) {
      toast({
        title: `${exception.error.message}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  return { createLoan, payLoanMonthlyDeposit, payCompleteLoan };
};
