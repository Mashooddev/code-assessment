import React, { useEffect, useState, useMemo } from "react";
import { Card, HStack, Input, useLatestRef } from "@chakra-ui/react";
import { VStack, Text, Box, Button } from "@chakra-ui/react";
import "../Styles/Form.css";
import { Checkbox } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const [secotorID, setSectorID] = useState(
    window.location.pathname.split("/")[2]
  );
  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 1000000),
    name: "",
    sector: "",
    agree: false,
  });

  const data = useLatestRef(formData);

  function validateData() {
    if (data.current.name && data.current.sector && data.current.agree) {
      return true;
    }
    if (
      data.current.name.length === 0 &&
      data.current.sector.length === 0 &&
      !data.current.agree
    ) {
      alert("Please fill all the fields");
    } else if (data.current.name.length === 0) {
      alert("Please enter name");
    } else if (data.current.sector.length === 0) {
      alert("Please enter sector");
    } else if (data.current.agree === false) {
      alert("Please agree to terms");
    }
    return false;
  }

  function saveSector() {
    if (validateData()) {
      let existingData = JSON.parse(localStorage.getItem("sector")) || [];
      existingData.push(data.current);
      localStorage.setItem("sector", JSON.stringify(existingData));
      navigate("/");
    }
  }

  function fillData() {
    let storedData = localStorage.getItem("sector");
    if (storedData) {
      let dataArray = JSON.parse(storedData);
      let id = window.location.pathname.split("/")[2];
      let data = dataArray.find((item) => item.id == id);
      if (data) {
        setFormData(data);
      }
    }
  }

  function updateSector(id) {
    if (validateData()) {
      let storedData = localStorage.getItem("sector");
      if (storedData) {
        let dataArray = JSON.parse(storedData);
        let index = dataArray.findIndex((item) => item.id == id);
        dataArray[index] = data.current;
        localStorage.setItem("sector", JSON.stringify(dataArray));
        navigate("/");
      }
    }
  }

  useEffect(() => {
    if (secotorID) {
      fillData();
    }
  }, []);

  const memoizedData = useMemo(() => data.current, [formData]);

  return (
    <div className="form-main">
      <Card className="form-main-card">
        <VStack>
          <Text fontSize={25}>
            {secotorID ? "Update Sector" : "Add Sector"}
          </Text>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
          >
            <Input
              value={memoizedData.name}
              onChange={(e) =>
                setFormData({ ...data.current, name: e.target.value })
              }
              mt={5}
              variant="outline"
              errorBorderColor="red.300"
              placeholder="Name"
            />
            <Input
              value={memoizedData.sector}
              onChange={(e) =>
                setFormData({ ...data.current, sector: e.target.value })
              }
              mt={4}
              errorBorderColor="red.300"
              variant="outline"
              placeholder="Sector"
            />
            <HStack mt={4}>
              <input
                onChange={(e) =>
                  setFormData({ ...data.current, agree: !data.current.agree })
                }
                type="checkbox"
                id="agree"
                checked={memoizedData.agree}
              />
              <Text>Agree to terms</Text>
            </HStack>{" "}
          </Box>
          <Button
            onClick={() => {
              if (secotorID) {
                updateSector(secotorID);
              } else {
                saveSector();
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
