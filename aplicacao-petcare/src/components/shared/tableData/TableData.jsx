import Table from "react-bootstrap/Table";
import styles from "./TableData.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import { useSelectedData } from "../../../pages/aplicacao-dono-petshop/clientesEPets/SelectedDataContext";
import { RiWhatsappFill } from "react-icons/ri";

const TableData = ({ dados = [], columnNames, sortableColumns, filtro }) => {
  const [isDown, setIsDown] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const { setSelectedData } = useSelectedData();

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
      return newSelectedRows;
    });
  };

  useEffect(() => {
    const selectedData = selectedRows.map((i) => dados[i]);
    setSelectedData(selectedData);
  }, [selectedRows, dados, setSelectedData]);

  const handleRowClick = (index) => {
    toggleSelectRow(index);
  };

  // const handleBtnClick = () => {
  //   console.log(
  //     "Dados selecionados:",
  //     selectedRows.map((i) => dados[i])
  //   );
  // };

  // Filtrar e renomear colunas dinamicamente
  const columns =
    dados.length > 0
      ? Object.keys(dados[0]).filter((col) => col !== "id")
      : [];

  const sortedData = [...dados].sort((a, b) => {
    if (sortConfig.key) {
      const order = sortConfig.direction === "asc" ? 1 : -1;
      if (a[sortConfig.key] < b[sortConfig.key]) return -order;
      if (a[sortConfig.key] > b[sortConfig.key]) return order;
    }
    return 0;
  });

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
                    <MdEdit size={15} />
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
              <tr key={index} onClick={() => handleRowClick(index)}>
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
                      <MdEdit size={15} />
                    </td>
                  </>
                )}
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {typeof item[col] === "object" ? (
                      <div className={styles["content-div"]}>
                        {Object.values(item[col]).map((subItem, subIndex) => (
                          <div key={subIndex} className={styles["content-div"]}>
                            {subItem}
                          </div>
                        ))}
                      </div>
                    ) : col === "whatsapp" ? (
                      <a href={`https://wa.me/${item[col].replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className={styles["content-div"]}>
                        <RiWhatsappFill />
                        {item[col]}
                      </a>
                    ) : (
                      <div className={`${styles["content-div"]} ${col === "observacoes" ? styles["white-space-normal"] : styles["white-space-nowrap"]}`}>
                        {item[col]}
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
