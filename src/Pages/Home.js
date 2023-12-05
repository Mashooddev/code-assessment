import React, { useState, useEffect, useMemo } from "react";
import { Card } from "@chakra-ui/react";
import "../Styles/Home.css";
import { HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Components/CustomeButton";
import CustomTable from "../Components/CusomtTable";
import CustomText from "../Components/CustomText";

export default function Home() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const customStyles = {
    "--home-background-color": "#f7f9fa",
    "--home-padding": "7%",
  };
  function getSectorData() {
    let storedData = localStorage.getItem("sector");
    if (storedData) {
      let dataArray = JSON.parse(storedData);
      console.log(dataArray);
      setList(dataArray);
    } else {
      setList([]);
    }
  }

  function deleteSectorData(id) {
    let storedData = localStorage.getItem("sector");
    if (storedData) {
      let dataArray = JSON.parse(storedData);
      let filteredData = dataArray.filter((item) => item.id !== id);
      localStorage.setItem("sector", JSON.stringify(filteredData));
      setList(filteredData);
    }
  }

  useEffect(() => {
    getSectorData();
  }, []);

  const memoizedList = useMemo(() => list, [list]);

  return (
    <div className="home-main" style={customStyles}>
      <Card>
        <HStack justifyContent={"space-between"} p={3}>
          <CustomText fontSize={20}>Sectors</CustomText>
          <CustomButton onClick={() => navigate("/form")}>
            Add Sector
          </CustomButton>
        </HStack>
        <CustomTable
          data={memoizedList}
          editItem={(id) => navigate(`/form/${id}`)}
          deleteItem={deleteSectorData}
        />
      </Card>
    </div>
  );
}
