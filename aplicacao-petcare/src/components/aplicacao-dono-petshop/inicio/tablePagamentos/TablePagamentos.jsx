import Table from "react-bootstrap/Table";
import styles from "./TablePagamentos.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { getAllPetsAndPlans } from "../../../../services/petService";

const TablePagamentos = () => {
  const [isDown, setIsDown] = useState(true);
  const [dadosPetsEPlanos, setDadosPetsEPlanos] = useState([]);
  const [dadosOrdenados, setDadosOrdenados] = useState([]);

  const handleArrowClick = () => {
    setIsDown(!isDown);
    const sortedData = [...dadosOrdenados].sort((a, b) => {
      if (isDown) {
        return a.name.localeCompare(b.name); // Ordena de A-Z
      } else {
        return b.name.localeCompare(a.name); // Ordena de Z-A
      }
    });
    setDadosOrdenados(sortedData);
  };

  useEffect(() => {
    const loadPetsAndPlansData = async () => {
      try {
        const petsEPlanos = await getAllPetsAndPlans();
        setDadosPetsEPlanos(petsEPlanos);
        setDadosOrdenados(petsEPlanos); 
      } catch (error) {
        console.error("Erro ao carregar Pets e Planos:", error);
      }
    };

    loadPetsAndPlansData();
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["scrollable-table"]}>
        <Table hover style={{ margin: "0" }}>
          <thead>
            <tr>
              <th>
                Pet
                {isDown ? (
                  <IoIosArrowDown
                    style={{ cursor: "pointer" }}
                    size={13}
                    onClick={handleArrowClick}
                  />
                ) : (
                  <IoIosArrowUp
                    style={{ cursor: "pointer" }}
                    size={13}
                    onClick={handleArrowClick}
                  />
                )}
              </th>
              <th>Status</th>
              <th style={{ width: "23%" }}>Valor do Plano</th>
            </tr>
          </thead>
          <tbody>
            {dadosOrdenados.map((item, index) => (
              <tr key={index}>
                <td className={styles["cliente-info"]}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className={styles["cliente-nome"]} title={item.name}>
                      {item.name}
                    </div>
                    <div className={styles["plano-tipo"]}>
                      {/* {item.plan.planType.name} */}
                    </div>
                  </div>
                </td>
                <td>
                  {/* <span
                    className={
                      item.plan.active == false
                        ? styles["status-pendente"]
                        : styles["status-pago"]
                    }
                  >
                    {item.plan.active ? "Ativo" : "Inativo"}
                  </span> */}
                </td>
                <td>
                  {/* <span
                    className={
                      item.plan.active == false
                        ? styles["valor-faltante-pendente"]
                        : styles["valor-faltante-pago"]
                    }
                  >
                    R${item.plan.price}
                  </span> */}
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
