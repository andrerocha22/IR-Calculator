import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import OperationsLogTable from "../../components/OperationsLogTable";
import AddNewOperation from "../../components/AddNewOperation";
import {
  addTransaction,
  addStock,
  removeTransaction,
} from "../../redux/actions/index";
import OperationsOverview from "../../components/OperationsOverview";

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
              `Quantidade para venda não disponivel! Quantidade atual: ${QM}`
            );
            removeItemHandler(operation.id);
            operation.authorized = false;
          } else {
            RA = (Number(price) - PM) * Number(quant) - Number(brockageFee);

            QM = QM - Number(quant);

            if (RA < 0) {
              PA = Math.abs(PA + RA);
              IR = 0;
            } else {
              IR = (RA - Math.min(RA, PA)) * 0.15;
              PA = PA - Math.min(RA, PA);
            }

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
        irArray.push({
          IR: operation.IR,
          RA: operation.RA,
          date: operation.date,
          stock: operation.stockCode,
          authorized: operation.authorized,
        });
      }
    });

    setActualPosition(irArray);
  };

  const removeItemHandler = (id) => {
    let objIndexToRemove = transactionsLog.findIndex((obj) => obj.id === id);
    if (objIndexToRemove !== -1) {
      dispatch(removeTransaction(objIndexToRemove));
    }
  };

  return (
    <PageContainer>
      <Container fluid={true}>
        <Row>
          <Col lg="4" sm={{ size: "auto" }} style={{ marginBottom: "30px" }}>
            <CalculatorInput>
              <AddNewOperation addNewTransaction={handleAddNewTransaction} />
            </CalculatorInput>
          </Col>
          <Col lg="8" sm={{ size: "auto" }} style={{ marginBottom: "30px" }}>
            <InfoContainer>
              <OperationsLogTable
                content={transactionsLog}
                removeHandler={removeItemHandler}
              />
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
              <OperationsOverview data={actualPosition} />
            </InfoContainer>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
}

export default TaxCalculator;
