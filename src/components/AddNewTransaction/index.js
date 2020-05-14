import React, { useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Container, Button } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

function AddNewTransaction(props) {
  const [newTransaction, setNewTransaction] = useState({
    id: uuidv4(),
    stockCode: "PETR4",
    date: "2020-01-01",
    operationType: "Compra",
    price: 0,
    quant: 0,
    brockageFee: 0,
  });

  const handlerSubmit = () => {
    props.addNewTransaction(newTransaction);
    setNewTransaction({
      id: uuidv4(),
      stockCode: "PETR4",
      date: "2020-01-01",
      operationType: "Compra",
      price: "",
      quant: "",
      brockageFee: "",
    });
  };

  return (
    <Container>
      <AvForm onValidSubmit={handlerSubmit} id="form">
        <Row>
          <Col xs="auto">
            <AvField
              type="select"
              id="select-stock"
              name="stocknameInput"
              label="Código da Ação"
              onClick={() => {
                var selectedStockCode = document.getElementById("select-stock")
                  .value;
                if (selectedStockCode) {
                  setNewTransaction({
                    ...newTransaction,
                    stockCode: selectedStockCode,
                  });
                }
              }}
            >
              <option>PETR4</option>
              <option>VALE5</option>
              <option>ITUB4</option>
              <option>BBAS3</option>
              <option>CRFB3</option>
              <option>ITSA4</option>
              <option>JBSS3</option>
              <option>EMBR3</option>
            </AvField>
          </Col>
          <Col xs="auto">
            <AvField
              name="dateInput"
              label="Data da Operação"
              type="date"
              value={newTransaction.date}
              onChange={(e) => {
                setNewTransaction({ ...newTransaction, date: e.target.value });
              }}
              validate={{
                required: { value: true, errorMessage: "Adicione a data" },
                dateRange: {
                  start: { value: -5, units: "years" },
                  end: { value: 5, units: "years" },
                },
              }}
            />
          </Col>
          <Col xs="auto">
            <AvField
              type="select"
              id="select-operation"
              name="selectInput"
              label="Tipo de Operação"
              onClick={() => {
                var selectedOperation = document.getElementById(
                  "select-operation"
                ).value;
                if (selectedOperation) {
                  setNewTransaction({
                    ...newTransaction,
                    operationType: selectedOperation,
                  });
                }
              }}
            >
              <option>Compra</option>
              <option>Venda</option>
            </AvField>
          </Col>
        </Row>

        <Row>
          <Col xs="auto">
            <AvField
              name="priceInput"
              label="Valor da ação"
              type="number"
              placeholder="15.50"
              value={newTransaction.price}
              onChange={(e) => {
                setNewTransaction({ ...newTransaction, price: e.target.value });
              }}
              validate={{
                required: { value: true, errorMessage: "Adicione um valor" },
              }}
            />
          </Col>
          <Col xs="auto">
            <AvField
              name="quantInput"
              label="Quantidade"
              type="number"
              placeholder="100"
              value={newTransaction.quant}
              onChange={(e) => {
                setNewTransaction({ ...newTransaction, quant: e.target.value });
              }}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Adicione uma quantidade",
                },
              }}
            />
          </Col>
          <Col xs="auto">
            <AvField
              name="brockagefeeInput"
              label="Taxa de Corretagem"
              type="number"
              placeholder="8.75"
              value={newTransaction.brockageFee}
              onChange={(e) => {
                setNewTransaction({
                  ...newTransaction,
                  brockageFee: e.target.value,
                });
              }}
              validate={{
                required: { value: true, errorMessage: "Please enter a name" },
              }}
            />
          </Col>
        </Row>
        <Button color="primary">Adicionar</Button>
      </AvForm>
    </Container>
  );
}

export default AddNewTransaction;
