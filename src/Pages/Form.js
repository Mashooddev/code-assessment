import React, { useState } from "react";
import { Card, Input } from "@chakra-ui/react";
import { VStack, Text, Box, Button } from "@chakra-ui/react";
import "../Styles/Form.css";
import { Checkbox } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function Form() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: Math.random(),
    name: "",
    sector: "",
    agree: false,
  });

  function SaveSector() {
    let existingData = JSON.parse(localStorage.getItem("sector")) || [];

    existingData.push(data);

    localStorage.setItem("sector", JSON.stringify(existingData));

    navigate("/");
  }
  return (
    <div className="form-main">
      <Card className="form-main-card">
        <VStack>
          <Text fontSize={25}>Add Sector</Text>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
          >
            <Input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              mt={5}
              variant="outline"
              placeholder="Name"
            />
            <Input
              value={data.sector}
              onChange={(e) => setData({ ...data, sector: e.target.value })}
              mt={4}
              variant="outline"
              placeholder="Sectors"
            />
            <Checkbox
              checked={data.agree}
              onChange={(e) => setData({ ...data, agree: !data.agree })}
              mt={4}
              colorScheme="green"
            >
              Agree to terms
            </Checkbox>
          </Box>
          <Button onClick={SaveSector} mt={5}>
            Submit
          </Button>
        </VStack>
      </Card>
    </div>
  );
}
