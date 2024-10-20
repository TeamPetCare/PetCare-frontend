import Table from "react-bootstrap/Table";
import styles from "./TablePagamentos.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";

const TablePagamentos = ({ dadosPlanos }) => {
  const [isDown, setIsDown] = useState(true);

  const handleArrowClick = () => {
    setIsDown(!isDown);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["container-titulo"]}>
        <h3>Pagamentos dos Planos</h3>
        <hr />
      </div>

      {/* Contêiner para permitir o scroll na tabela */}
      <div className={styles["scrollable-table"]}>
        <Table
          hover
          style={{
            margin: "0",
          }}
        >
          <thead>
            <tr>
              <th>
                Cliente
                {isDown ? (
                  <IoIosArrowDown
                    style={{
                      cursor: "pointer",
                    }}
                    size={13}
                    onClick={handleArrowClick}
                  />
                ) : (
                  <IoIosArrowUp
                    style={{
                      cursor: "pointer",
                    }}
                    size={13}
                    onClick={handleArrowClick}
                  />
                )}
              </th>
              <th>Status</th>
              <th style={{ width: "23%" }}>Período</th>
              <th>Pendente</th>
            </tr>
          </thead>
          <tbody>
            {dadosPlanos.map((item, index) => (
              <tr key={index}>
                <td className={styles["cliente-info"]}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className={styles["cliente-nome"]} title={item.cliente.nome}>
                      {item.cliente.nome}
                    </div>
                    <div className={styles["plano-tipo"]}>
                      {item.cliente.plano}
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={
                      item.status === "Pendente"
                        ? styles["status-pendente"]
                        : styles["status-pago"]
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      item.status === "Pendente"
                        ? styles["periodo-info-pendente"]
                        : styles["periodo-info-pago"]
                    }
                    title={item.Período}
                  >
                    {item.PeríodoTitle}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      item.status === "Pendente"
                        ? styles["valor-faltante-pendente"]
                        : styles["valor-faltante-pago"]
                    }
                  >
                    {item.valorFaltante}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TablePagamentos;
