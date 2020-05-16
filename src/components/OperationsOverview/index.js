import React, { useState, useEffect } from "react";
import { Container, Col, Row, Label } from "reactstrap";
import styled from "styled-components";
import moment from "moment";
import Select from "react-select";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ChartContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 400px;
`;

const MoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  margin-top: 45px;
  h4 {
    margin-bottom: 15px;
    font-weight: 700;
    color: #2b2b2b;
  }

  h5 {
    font-size: 1.2em;
    color: #2b2b2b;
  }
`;

function OperationsOverview(props) {
  const [parsedData, setParsedData] = useState([]);
  const [stockOptions, setStockOptions] = useState([]);
  const [totalTax, setTotalTax] = useState(0);
  const [totalProfit, settTotalProfit] = useState(0);
  const [stockCode, setStockCode] = useState("");

  const handleChangeStockName = (selected) => {
    calculateTotal(selected.value);
  };

  const calculateTotal = (selectedStock) => {
    let totalTaxAux = 0;
    let totalProfitAux = 0;
    let selected = "";

    if (selectedStock === "") {
      selected = stockCode;
    } else {
      selected = selectedStock;
    }

    props.data.forEach((element) => {
      if (element.stock === selected) {
        totalTaxAux = totalTaxAux + Number(element.IR);
        totalProfitAux = totalProfitAux + Number(element.RA);
      }
    });
    setTotalTax(Number(totalTaxAux).toFixed(2));
    settTotalProfit(Number(totalProfitAux).toFixed(2));
    setStockCode(selected);
  };

  const parseData = () => {
    let aux = [];

    props.data.forEach((element) => {
      let objIndexDate = aux.findIndex(
        (obj) => obj.Data === moment(element.date).format("MM-YYYY")
      );
      if (objIndexDate === -1) {
        aux.push({
          Papel: element.stock,
          Imposto: Number(element.IR).toFixed(2),
          Ganho: Number(element.RA).toFixed(2),
          Data: moment(element.date).format("MM-YYYY"),
        });
      } else {
        aux[objIndexDate].Ganho = Number(
          Number(aux[objIndexDate].Ganho) + Number(element.RA)
        ).toFixed(2);
        aux[objIndexDate].Imposto = Number(
          Number(aux[objIndexDate].Imposto) + Number(element.IR)
        ).toFixed(2);
      }

      let objIndex = stockOptions.findIndex(
        (obj) => obj.value === element.stock
      );
      if (objIndex === -1) {
        let aux = [...stockOptions];
        aux.push({ value: element.stock, label: element.stock });
        setStockOptions(aux);
      }
    });
    setParsedData(aux);
  };

  useEffect(() => {
    parseData();
    calculateTotal("")
  }, [props]);

  const moreInfoHandler = () => {
    if (stockCode === "") {
      return (
        <h4 style={{ textAlign: "start" }}>
          <span style={{ color: "#9A43DE", lineHeight: "2em" }}>
            {" "}
            <strong>Selecione</strong> sua ação
          </span>{" "}
          <br />
          <span style={{ color: "#4E8DDC", lineHeight: "1.6em" }}>
            <strong>Cadastre</strong> suas operações
          </span>{" "}
          <br />{" "}
          <span
            style={{ color: "#9A43DE", lineHeight: "1em", fontSize: "0.7em" }}
          >
            {" "}
            E os cálculos pode deixar que <br /> cuidamos para{" "}
            <span style={{ color: "#4E8DDC", lineHeight: "2em" }}>
              você!
            </span>{" "}
          </span>
        </h4>
      );
    } else {
      return (
        <>
          <h4>Aqui estão algumas informações sobre {stockCode}</h4>
          <h5>Total de lucro com vendas = R${totalProfit}</h5>
          <h5>Total de Imposto de Renda = R${totalTax}</h5>
        </>
      );
    }
  };

  return (
    <ChartContainer>
      <Container fluid={true}>
        <Row style={{ height: "100%" }}>
          <Col lg="4" sm={{ size: "auto" }}>
            <Row>
              <Container>
                <Label>Selecione um papel para mais detalhes</Label>
                <Select
                  options={stockOptions}
                  onChange={handleChangeStockName}
                  placeholder="Selecione"
                  noOptionsMessage={() => "Nenhum resultado encontrado"}
                />
              </Container>
            </Row>
            <Row>
              <MoreInfoContainer>{moreInfoHandler()}</MoreInfoContainer>
            </Row>
          </Col>
          <Col lg="8" sm={{ size: "auto" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={parsedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <XAxis dataKey="Data" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Ganho" fill="#8671D9" />
                <Bar dataKey="Imposto" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Container>
    </ChartContainer>
  );
}

export default OperationsOverview;
