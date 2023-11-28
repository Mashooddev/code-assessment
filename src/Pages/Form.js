import React, { useEffect, useState } from "react";
import { Card, HStack, Input, useLatestRef } from "@chakra-ui/react";
import { VStack, Text, Box, Button } from "@chakra-ui/react";
import "../Styles/Form.css";
import { Checkbox } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function Form() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: Math.floor(Math.random() * 1000000),
    name: "",
    sector: "",
    agree: false,
  });

  function ValidateData() {
    if (data.name && data.sector && data.agree) {
      return true;
    }
    if (data.name.length === 0 && data.sector.length === 0 && !data.agree) {
      alert("Please fill all the fields");
    } else if (data.name.length === 0) {
      alert("Please enter name");
    } else if (data.sector.length === 0) {
      alert("Please enter sector");
    } else if (data.agree === false) {
      alert("Please agree to terms");
    }
    return false;
  }

  function SaveSector() {
    if (ValidateData()) {
      let existingData = JSON.parse(localStorage.getItem("sector")) || [];
      existingData.push(data);
      localStorage.setItem("sector", JSON.stringify(existingData));
      navigate("/");
    } else {
    }
  }

  function FillData() {
    let storedData = localStorage.getItem("sector");
    if (storedData) {
      let dataArray = JSON.parse(storedData);
      let id = window.location.pathname.split("/")[2];
      let data = dataArray.find((item) => item.id == id);
      console.log(data);
      if (data) {
        setData(data);
      }
    }
  }

  function UpdateSector(id) {
    if (ValidateData()) {
      let storedData = localStorage.getItem("sector");
      if (storedData) {
        let dataArray = JSON.parse(storedData);
        let index = dataArray.findIndex((item) => item.id == id);
        dataArray[index] = data;
        localStorage.setItem("sector", JSON.stringify(dataArray));
        navigate("/");
      }
    }
  }

  useEffect(() => {
    console.log(window.location.pathname.split("/")[2]);
    if (window.location.pathname.split("/")[2]) {
      FillData();
    }
  }, []);
  return (
    <div className="form-main">
      <Card className="form-main-card">
        <VStack>
          <Text fontSize={25}>
            {window.location.pathname.split("/")[2]
              ? "Update Sector"
              : "Add Sector"}
          </Text>
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
              errorBorderColor="red.300"
              placeholder="Name"
            />
            <Input
              value={data.sector}
              onChange={(e) => setData({ ...data, sector: e.target.value })}
              mt={4}
              errorBorderColor="red.300"
              variant="outline"
              placeholder="Sector"
            />
            <HStack mt={4}>
              <input
                onChange={(e) => setData({ ...data, agree: !data.agree })}
                type="checkbox"
                id="agree"
                checked={data.agree}
              />
              <Text>Agree to terms</Text>
            </HStack>{" "}
          </Box>
          <Button
            onClick={() => {
              if (window.location.pathname.split("/")[2]) {
                UpdateSector(window.location.pathname.split("/")[2]);
              } else {
                SaveSector();
              }
            }}
            mt={5}
          >
            Submit
          </Button>
        </VStack>
      </Card>
    </div>
  );
}
