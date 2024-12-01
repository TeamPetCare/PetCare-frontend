import Table from "react-bootstrap/Table";
import styles from "./TableData.module.css";
import DropDownStatus from "../dropDownStatus/DropDownStatus";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import { RiWhatsappFill } from "react-icons/ri";
import DropDownPayment from "../dropDownPayment/DropDownPayment";

const TableData = ({ dados = [], columnNames, sortableColumns, filtro }) => {
  const [isDown, setIsDown] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleArrowClick = (col) => {
    const direction =
      sortConfig.key === col && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key: col, direction });
    setIsDown(direction === "asc");
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === dados.length) {
      setSelectedRows([]);
    } else {
      const allRows = dados.map((_, index) => index);
      setSelectedRows(allRows);
    }
  };

  const toggleSelectRow = (index) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((i) => i !== index)
        : [...prevSelectedRows, index];
      
      console.log("Selected row:", dados[index]); // Exibe no console a linha que foi selecionada
      return newSelectedRows;
    });
  };
  

  useEffect(() => {}, [selectedRows]);

  const handleEditClick = () => {
    if (selectedRows.length === 1) {
      onPut();
    }
  };

  const columns = dados.length > 0 ? Object.keys(dados[0]) : [];

  const sortedData = [...dados].sort((a, b) => {
    if (sortConfig.key) {
      const order = sortConfig.direction === "asc" ? 1 : -1;

      if (sortConfig.key === "dataHora") {
        const dateA = new Date(
          `${a.dataHora?.data || ""} ${a.dataHora?.horario || ""}`
        );
        const dateB = new Date(
          `${b.dataHora?.data || ""} ${b.dataHora?.horario || ""}`
        )
        return dateA - dateB > 0 ? order : -order;
      }
      if (a[sortConfig.key] < b[sortConfig.key]) return -order;
      if (a[sortConfig.key] > b[sortConfig.key]) return order;
    }
    return 0;
  });

  const formatText = (text) => {
    if (Array.isArray(text)) {
      return text.map((item) => formatText(item));
    }

    if (typeof text !== "string") {
      return text || "-"; // Retorna "-" caso o valor seja null, undefined ou vazio
    }

    const correctedText = text
      .replace(/CONCLUIDO/g, "Concluído")
      .replace(/CARTAO_DEBITO/g, "Cartão Débito")
      .replace(/CARTAO_CREDITO/g, "Cartão Crédito")

    const withoutHyphens = correctedText.replace(/-/g, " ");

    return withoutHyphens
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["scrollable-table"]}>
        <Table hover style={{ margin: "0" }}>
          <thead>
            <tr>
              {/* Condição para exibir ou ocultar os elementos de seleção e edição */}
              {filtro !== "Clientes & Pets" && (
                <>
                  <th>
                    <label className={styles["custom-checkbox"]}>
                      <input
                        type="checkbox"
                        checked={selectedRows.length === dados.length}
                        onChange={toggleSelectAll}
                      />
                      <span className={styles["checkmark"]}></span>
                    </label>
                  </th>
                  <th>
                    <MdEdit
                      size={15}
                      style={{
                        color:
                          selectedRows.length === 1 ? "inherit" : "lightgray",
                        cursor:
                          selectedRows.length === 1 ? "pointer" : "not-allowed",
                      }}
                      onClick={() => {
                        if (selectedRows.length === 1) handleEditClick();
                      }}
                    />
                  </th>
                </>
              )}
              {columns.map((col, index) => (
                <th key={index}>
                  {columnNames[col] || col} {/* Renomeia a coluna */}
                  {sortableColumns.includes(col) &&
                    (isDown ? (
                      <IoIosArrowDown
                        style={{ cursor: "pointer" }}
                        size={13}
                        onClick={() => handleArrowClick(col)}
                      />
                    ) : (
                      <IoIosArrowUp
                        style={{ cursor: "pointer" }}
                        size={13}
                        onClick={() => handleArrowClick(col)}
                      />
                    ))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                {/* Condição para exibir ou ocultar os elementos de seleção e edição */}
                {filtro !== "Clientes & Pets" && (
                  <>
                    <td>
                      <label className={styles["custom-checkbox-t"]}>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(index)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleSelectRow(index);
                          }}
                        />
                        <span className={styles["checkmark"]}></span>
                      </label>
                    </td>
                    <td>
                      <MdEdit
                        size={15}
                        style={{
                          color:
                            selectedRows.length === 1 &&
                            selectedRows.includes(index)
                              ? "inherit"
                              : "lightgray",
                          cursor:
                            selectedRows.length === 1 &&
                            selectedRows.includes(index)
                              ? "pointer"
                              : "not-allowed",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            selectedRows.length === 1 &&
                            selectedRows.includes(index)
                          ) {
                            handleEditClick();
                          }
                        }}
                      />
                    </td>
                  </>
                )}
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col === "dataHora" && typeof item[col] === "object" ? (
                      <div className={styles["content-div-datahora"]}>
                        <div>{item[col].data}</div>
                        <div>{item[col].horario}</div>
                      </div>
                    ) : col === "whatsapp" ? (
                      item[col] ? (
                        <a
                          href={`https://wa.me/${item[col].replace(
                            /[^0-9]/g,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles["whatsapp-link"]}
                        >
                          <RiWhatsappFill />
                          {item[col]}
                        </a>
                      ) : (
                        "-"
                      )
                    ) : col === "status" ? (
                      <div className={styles["content-div-datahora"]}>
                        <DropDownStatus
                          status={formatText(item[col])}
                          options={["Agendado", "Concluído", "Cancelado"]}
                        />
                      </div>
                    ) : col === "pet" ? (
                      <div className={styles["content-div-pet"]}>
                        {item[col]?.ftPet ? (
                          <img src={item[col].ftPet} alt="Imagem do pet" />
                        ) : (
                          <span>Imagem não disponível</span>
                        )}
                        {item[col]?.nome && (
                          <div>{formatText(item[col].nome)}</div>
                        )}
                      </div>
                    ) : col === "pagamento" ? (
                      <div className={styles["content-div-pagamento"]}>
                        <DropDownPayment
                          status={formatText(item[col]?.status)}
                          options={["Pago", "Pendente"]}
                          metodo={item[col]?.metodo}
                        />
                      </div>
                    ) : typeof item[col] === "object" && item[col] !== null ? (
                      <div className={styles["content-div"]}>
                        {Object.values(item[col]).map((subItem, subIndex) => (
                          <div key={subIndex}>{formatText(subItem)}</div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className={`${styles["content-div"]} ${
                          col === "observacoes"
                            ? styles["white-space-normal"]
                            : styles["white-space-nowrap"]
                        }`}
                      >
                        {formatText(item[col]) || "-"}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableData;
