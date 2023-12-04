import { React, useState } from "react";
import { Container } from "@chakra-ui/react";
import { useAccount, useBalance } from "wagmi";
import { useLenderContractWrite } from "../../data/hooks/contract/write/useLenderContractWrite";
import { GenericForm } from "./../../components/form/genericForm";
import { useNavigate } from "react-router";
import { Loading } from "../../components/loading/loading";

export const CreateLending = () => {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const { data } = useBalance({ addressOrName: address });
  const { createLender } = useLenderContractWrite();
  const navigation = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values.amount)
    console.log(parseInt(values.duration))
    console.log("i reached");
    try {
      const result = await createLender(values.amount, parseInt(values.duration));
      // Assuming createLender returns an object with a 'message' property.
      console.log(result.message);
    } catch (error) {
      console.error("Error in createLender:", error);
      // Handle the error as needed.
    }
    console.log("even here");
    setLoading(false);
    navigation(`/history`);
  };

  return loading ? (
    <Loading />
  ) : (
    <Container m={3} mt={10}>
      <GenericForm
        handleSubmit={handleSubmit}
        maxAmount={parseFloat(data?.formatted)}
        formType={"Lending"}
      />
    </Container>
  );
};
