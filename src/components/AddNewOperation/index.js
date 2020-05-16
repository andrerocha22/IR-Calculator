import React, { useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Container, Button } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Select from "react-select";

function AddNewOperation(props) {
  const [newTransaction, setNewTransaction] = useState({
    id: uuidv4(),
    stockCode: "",
    date: moment().format("YYYY-MM-DD"),
    operationType: "",
    price: 0,
    quant: 0,
    brockageFee: 0,
  });

  const handlerSubmit = (e) => {
    props.addNewTransaction(newTransaction);

    setNewTransaction({
      ...newTransaction,
      id: uuidv4(),
    });
  };

  const stockOptions = [
    { value: "PETR4", label: "PETR4" },
    { value: "VALE3", label: "VALE3" },
    { value: "ITUB4", label: "ITUB4" },
    { value: "BBDC4", label: "BBDC4" },
    { value: "BBAS3", label: "BBAS3" },
    { value: "JBSS3", label: "JBSS3" },
    { value: "SUZB3", label: "SUZB3" },
    { value: "ABEV3", label: "ABEV3" },
    { value: "RENT3", label: "RENT3" },
    { value: "ITSA4", label: "ITSA4" },
    { value: "CIEL3", label: "CIEL3" },
  ];

  const typeOptions = [
    { value: "Compra", label: "Compra" },
    { value: "Venda", label: "Venda" },
  ];

  const handleChangeTypeOperation = (selectedOption) => {
    setNewTransaction({
      ...newTransaction,
      operationType: selectedOption.value,
    });
  };

  const handleChangeStockName = (selectedOption) => {
    setNewTransaction({
      ...newTransaction,
      stockCode: selectedOption.value,
    });
  };

  return (
    <Container>
      <AvForm onValidSubmit={handlerSubmit} id="frm_id">
        <Row>
          <Col lg="6" sm={{ size: "auto" }}>
            <label>Ação</label>
            <Select
              options={stockOptions}
              onChange={handleChangeStockName}
              placeholder="Selecione"
            />
          </Col>
          <Col lg="6" sm={{ size: "auto" }}>
            <AvField
              name="dateInput"
              label="Data da Operação"
              type="date"
              value={newTransaction.date}
              onChange={(e) => {
                setNewTransaction({
                  ...newTransaction,
                  date: e.target.value,
                });
              }}
              validate={{
                required: { value: true, errorMessage: "Adicione a data" },
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="6" sm={{ size: "auto" }}>
            <label>Tipo de Operação</label>
            <Select
              options={typeOptions}
              onChange={handleChangeTypeOperation}
              placeholder="Selecione"
            />
          </Col>

          <Col lg="6" sm={{ size: "auto" }}>
            <AvField
              name="priceInput"
              label="Valor da ação"
              type="number"
              placeholder="0"
              value={newTransaction.price}
              onChange={(e) => {
                setNewTransaction({ ...newTransaction, price: e.target.value });
              }}
              validate={{
                required: { value: true, errorMessage: "Adicione um valor" },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="6" sm={{ size: "auto" }}>
            <AvField
              name="quantInput"
              label="Quantidade"
              type="number"
              placeholder="0"
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
          <Col lg="6" sm={{ size: "auto" }}>
            <AvField
              name="brockagefeeInput"
              label="Taxa de Corretagem"
              type="number"
              placeholder="0"
              value={newTransaction.brockageFee}
              onChange={(e) => {
                setNewTransaction({
                  ...newTransaction,
                  brockageFee: e.target.value,
                });
              }}
              validate={{
                required: { value: true, errorMessage: "Adicione um valor" },
              }}
            />
          </Col>
          <Col lg="6" sm={{ size: "auto" }}>
            <Button
              color="primary"
              style={{ width: "100%", marginTop: "50px" }}
            >
              Cadastrar Operação
            </Button>
          </Col>
        </Row>
      </AvForm>
    </Container>
  );
}

export default AddNewOperation;
