import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import LogTransitionsTable from "../../components/LogTransitionsTable";
import AddNewTransaction from "../../components/AddNewTransaction";
import { addTransaction, addStock } from "../../redux/actions/index";
import TransactionChart from "../../components/TransactionChart";

const PageContainer = styled.div`
  margin-top: 160px;
  margin-bottom: 60px;
  margin-right: 60px;
  margin-left: 60px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;
  height: calc(100vh - 220px);
  background-color: #ffffff;
  border-radius: 8px;
`;

function TaxCalculator() {
  const dispatch = useDispatch();

  const rulesObj = {
    PM: 0,
    QM: 0,
    RA: 0,
    PA: 0,
    IR: 0,
  };

  const [newStock, setNewStock] = useState();
  const [calculated, setCalculated] = useState(false);

  const [stocksWithRules, setStocksWithRules] = useState([]);

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
    if (calculated) {
      calculateIR();
    }
  }, [calculated]);

  const checkIfNewStock = () => {
    if (newStock === undefined) {
      return;
    }

    const newData = [...stocksWithRules];

    if (stocksWithRules.length === 0) {
      newData.push({
        stockCode: newStock.stockCode,
        rules: rulesObj,
        quant: 0,
      });
      if (!calculated) {
        setCalculated(true);
      }

      setStocksWithRules(newData);
    } else {
      let hasStockInList = false;
      stocksWithRules.forEach((stock) => {
        if (stock.stockCode === newStock.stockCode) {
          hasStockInList = true;
          return;
        }
      });
      if (!hasStockInList) {
        newData.push({
          stockCode: newStock.stockCode,
          rules: rulesObj,
          quant: 0,
        });
      }
    }
    if (!calculated) {
      setCalculated(true);
    }

    setStocksWithRules(newData);
  };

  const calculateIR = () => {
    console.log("calculate");
    let stockChoosed = null;
    const newData = [...stocksWithRules];

    stocksWithRules.forEach((stock) => {
      console.log("entrou for each");
      if (stock.stockCode === newStock.stockCode) {
        stockChoosed = stock;
        console.log(stockChoosed);
      }
    });

    if (stockChoosed) {
      console.log("entrou if stockchoosed");

      const { price, brockageFee, quant, operationType } = newStock;
      let { PM, QM, PA, RA, IR } = stockChoosed.rules;

      let objIndex = stocksWithRules.findIndex(
        (obj) => obj.stockCode === stockChoosed.stockCode
      );

      if (operationType === "Compra") {
        PM =
          (PM * QM + Number(price) * Number(quant) + Number(brockageFee)) /
          (QM + Number(quant));
        QM = QM + Number(quant);

        newData[objIndex].rules.PM = PM;
        newData[objIndex].rules.QM = QM;
        newData[objIndex].quant = QM;
      } else if (operationType === "Venda") {
        RA = (Number(price) - PM) * Number(quant) - Number(brockageFee);

        QM = QM - Number(quant);

        if (RA < 0) {
          PA = Math.abs(PA + RA);
        } else {
          IR = (RA - Math.min(RA, PA)) * 0.15;
          PA = PA - Math.min(RA, PA);
        }

        newData[objIndex].rules.RA = RA;
        newData[objIndex].rules.PA = PA;
        newData[objIndex].rules.QM = QM;
        newData[objIndex].quant = QM;
        newData[objIndex].rules.IR = IR;
      }

      if (!calculated) {
        setCalculated(true);
      }

      setStocksWithRules(newData);

      dispatch(addTransaction({ ...newStock, IRFee: IR }));

      console.log(stocksWithRules);
    }
  };

  return (
    <PageContainer>
      <Container fluid={true}>
        <Row>
          <Col xs="3">
            <InfoContainer>
              {/* <TransactionChart data={stocksWithRules} /> */}
            </InfoContainer>
          </Col>
          <Col xs="9">
            <InfoContainer>
              <LogTransitionsTable content={transactionsLog} />
              <AddNewTransaction addNewTransaction={handleAddNewTransaction} />
            </InfoContainer>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
}

export default TaxCalculator;
