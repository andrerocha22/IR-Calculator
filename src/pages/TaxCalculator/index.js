import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import LogTransitionsTable from "../../components/LogTransitionsTable";
import AddNewTransaction from "../../components/AddNewTransaction";
import { addTransaction, addStock } from "../../redux/actions/index";
import TransactionChart from "../../components/TransactionChart";

const PageContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  margin-right: 30px;
  margin-left: 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
`;

const CalculatorInput = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
`;

function TaxCalculator() {
  const dispatch = useDispatch();

  const [newStock, setNewStock] = useState();

  const [actualPosition, setActualPosition] = useState([]);

  const [calculated, setCalculated] = useState(false);

  const transactionsLog = useSelector((state) => state.operation);
  const stocksList = useSelector((state) => state.stocks);

  const handleAddNewTransaction = (newTransaction) => {
    console.log(newTransaction);
    setNewStock(newTransaction);
    setCalculated(false);

    if (!stocksList.includes(newTransaction.stockCode)) {
      dispatch(addStock(newTransaction.stockCode));
    }
  };

  useEffect(() => {
    checkIfNewStock();
  }, [newStock]);

  useEffect(() => {
    calculateIR();
  }, [transactionsLog]);

  useEffect(() => {
    if (calculated) {
    }
  }, [calculated]);

  const checkIfNewStock = () => {
    if (newStock === undefined) {
      return;
    }

    const newMonthlyLog = {
      ...newStock,
      PM: 0,
      QM: 0,
      RA: 0,
      PA: 0,
      IR: 0,
      authorized: true,
    };

    dispatch(addTransaction(newMonthlyLog));

    if (!calculated) {
      setCalculated(true);
    }
  };

  const calculateIR = () => {
    let PM = 0;
    let QM = 0;
    let RA = 0;
    let PA = 0;
    let IR = 0;
    let IRTotal = 0;

    const irArray = [];

    transactionsLog.forEach((operation) => {
      if (!operation.authorized) {
        return;
      }

      if (operation.stockCode === newStock.stockCode) {
        const { price, brockageFee, quant, operationType } = operation;
        operation.authorized = false;

        if (operationType === "Compra") {
          RA = 0;
          PA = 0;
          IR = 0;
          PM =
            (PM * QM + Number(price) * Number(quant) + Number(brockageFee)) /
            (QM + Number(quant));
          QM = QM + Number(quant);
          operation.authorized = true;
        } else if (operationType === "Venda") {
          if (QM - quant < 0) {
            alert(
              `Quantidade para venda nao disponivel! Quantidade atual: ${QM}`
            );
            operation.authorized = false;
          } else {
            RA = (Number(price) - PM) * Number(quant) - Number(brockageFee);

            QM = QM - Number(quant);

            if (RA < 0) {
              PA = Math.abs(PA + RA);
            } else {
              IR = (RA - Math.min(RA, PA)) * 0.15;
              PA = PA - Math.min(RA, PA);
            }
            IRTotal += IR;

            operation.RA = RA;
            operation.PA = PA;
            operation.IR = IR;
            operation.authorized = true;
          }
        }

        operation.PM = PM;
        operation.QM = QM;
      }

      if (operation.IR !== 0) {
        console.log(irArray);
        irArray.push({
          IR: operation.IR,
          RA: operation.RA,
          date: operation.date,
          stock: operation.stockCode,
          authorized: operation.authorized,
        });
      }
    });

    console.log(irArray);
    setActualPosition(irArray);
  };

  return (
    <PageContainer>
      <Container fluid={true}>
        <Row>
          <Col lg="4" sm={{ size: "auto" }} style={{ marginBottom: "30px" }}>
            <CalculatorInput>
              <AddNewTransaction addNewTransaction={handleAddNewTransaction} />
            </CalculatorInput>
          </Col>
          <Col lg="8" sm={{ size: "auto" }} style={{ marginBottom: "30px" }}>
            <InfoContainer>
              <LogTransitionsTable content={transactionsLog} />
            </InfoContainer>
          </Col>
        </Row>
        <Row style={{ marginBottom: "30px" }}>
          <Col
            lg="4"
            sm={{ size: "auto" }}
            style={{ marginBottom: "30px" }}
          ></Col>
          <Col lg="8" sm={{ size: "auto" }} style={{ marginBottom: "30px" }}>
            <InfoContainer>
              <TransactionChart data={actualPosition} />
            </InfoContainer>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
}

export default TaxCalculator;
