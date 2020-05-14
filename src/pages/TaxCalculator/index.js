import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import LogTransitionsTable from "../../components/LogTransitionsTable";
import AddNewTransaction from "../../components/AddNewTransaction";
import { addTransaction, addStock } from "../../redux/actions/index";
import TransactionChart from "../../components/TransactionChart";
import OverviewChart from "../../components/OverviewChart";
import moment from "moment";

const PageContainer = styled.div`
  margin-top: 160px;
  margin-bottom: 30px;
  margin-right: 30px;
  margin-left: 30px;
`;

const InfoContainer = styled.div`
  position: relative;
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

    const newMonthlyLog = [...stocksWithRules];

    if (stocksWithRules.length === 0) {
      newMonthlyLog.push({
        stockCode: newStock.stockCode,
        rules: rulesObj,
        quant: 0,
        date: newStock.date,
        prevPM: 0,
        prevQM: 0,
        prevMonth: moment(newStock.date)
          .subtract(1, "months")
          .endOf("month")
          .format("YYYY-MM"),
      });
      if (!calculated) {
        setCalculated(true);
      }

      setStocksWithRules(newMonthlyLog);
    } else {
      let hasStockInList = false;
      stocksWithRules.forEach((stock) => {
        if (
          stock.stockCode === newStock.stockCode &&
          stock.date === newStock.date
        ) {
          hasStockInList = true;
          return;
        }
      });
      if (!hasStockInList) {
        newMonthlyLog.push({
          stockCode: newStock.stockCode,
          rules: rulesObj,
          quant: 0,
          date: newStock.date,
          prevPM: 0,
          prevQM: 0,
          prevMonth: moment(newStock.date)
            .subtract(1, "months")
            .endOf("month")
            .format("YYYY-MM"),
        });
      }
    }
    if (!calculated) {
      setCalculated(true);
    }

    setStocksWithRules(newMonthlyLog);
  };

  const calculateIR = () => {
    let stockChoosed = null;

    const newMonthlyLog = [...stocksWithRules];

    stocksWithRules.forEach((stock) => {
      console.log(stock);
      console.log("entrou for each");
      if (
        stock.stockCode === newStock.stockCode &&
        stock.date === newStock.date
      ) {
        stockChoosed = stock;
        console.log(stockChoosed);
      }
    });

    if (stockChoosed) {
      console.log("entrou if stockchoosed");

      const { price, brockageFee, quant, operationType, date } = newStock;
      let { PM, QM, PA, RA, IR } = stockChoosed.rules;

      let objIndex = stocksWithRules.findIndex(
        (obj) =>
          obj.stockCode === stockChoosed.stockCode &&
          obj.date === stockChoosed.date
      );

      let objIndexAux = stocksWithRules.findIndex(
        (obj) =>
          obj.stockCode === stockChoosed.stockCode && obj.date === "2020-01"
      );

      //COMECANDO O MES
      if (PM === 0 && QM === 0) {
        if (objIndexAux !== -1) {
          PM = newMonthlyLog[objIndexAux].rules.PM;
          QM = newMonthlyLog[objIndexAux].rules.QM;
          console.log(newMonthlyLog[objIndexAux].rules.PM);
          console.log(newMonthlyLog[objIndexAux].rules.QM);
        }
      }

      if (operationType === "Compra") {
        PM =
          (PM * QM + Number(price) * Number(quant) + Number(brockageFee)) /
          (QM + Number(quant));
        QM = QM + Number(quant);

        newMonthlyLog[objIndex].rules.PM = PM;
        newMonthlyLog[objIndex].rules.QM = QM;
        newMonthlyLog[objIndex].quant = QM;
      } else if (operationType === "Venda") {
        RA = (Number(price) - PM) * Number(quant) - Number(brockageFee);

        QM = QM - Number(quant);

        if (RA < 0) {
          PA = Math.abs(PA + RA);
        } else {
          IR = (RA - Math.min(RA, PA)) * 0.15;
          PA = PA - Math.min(RA, PA);
        }

        newMonthlyLog[objIndex].rules.RA = RA;
        newMonthlyLog[objIndex].rules.PA = PA;
        newMonthlyLog[objIndex].rules.QM = QM;
        newMonthlyLog[objIndex].quant = QM;
        newMonthlyLog[objIndex].rules.IR = IR;
      }

      if (!calculated) {
        setCalculated(true);
      }

      setStocksWithRules(newMonthlyLog);

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
              {/* <TransactionChart data={stocksWithRules} />
              <OverviewChart data={stocksWithRules} /> */}
            </InfoContainer>
          </Col>
          <Col xs="9">
            <InfoContainer>
              <Row>
                <Col xs="7">
                  <LogTransitionsTable content={transactionsLog} />
                </Col>
                <Col xs="5">
                  <AddNewTransaction
                    addNewTransaction={handleAddNewTransaction}
                  />
                </Col>
              </Row>
            </InfoContainer>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
}

export default TaxCalculator;
