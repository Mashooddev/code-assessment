import React, { useEffect, useState, useMemo } from "react";
import { Card, HStack, useLatestRef } from "@chakra-ui/react";
import { VStack, Box } from "@chakra-ui/react";
import "../Styles/Form.css";
import { useNavigate } from "react-router-dom";
import CustomCheckbox from "../Components/CustomCheckbox";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomeButton";
import CustomText from "../Components/CustomText";

export default function Form() {
  const navigate = useNavigate();

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
    let secotorID = window.location.pathname.split("/")[2];
    if (secotorID) {
      fillData();
    }
  }, []);

  const memoizedData = useMemo(() => data.current, [formData]);

  return (
    <div className="form-main">
      <Card className="form-main-card">
        <VStack>
          <CustomText fontSize={25}>
            {window.location.pathname.split("/")[2]
              ? "Update Sector"
              : "Add Sector"}
          </CustomText>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
          >
            <CustomInput
              value={memoizedData.name}
              onChange={(e) =>
                setFormData({ ...data.current, name: e.target.value })
              }
              mt={5}
              variant="outline"
              errorBorderColor="red.300"
              placeholder="Name"
            />
            <CustomInput
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
              <CustomCheckbox
                onChange={(e) =>
                  setFormData({ ...data.current, agree: !data.current.agree })
                }
                checked={memoizedData.agree}
              />
            </HStack>
          </Box>
          <CustomButton
            onClick={() => {
              let secotorID = window.location.pathname.split("/")[2];
              if (secotorID) {
                updateSector(secotorID);
              } else {
                saveSector();
              }
            }}
            mt={5}
          >
            Submit
          </CustomButton>
        </VStack>
      </Card>
    </div>
  );
}
