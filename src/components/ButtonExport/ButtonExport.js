import React from 'react';
import * as XLSX from 'xlsx';
import styles from './ButtonExport.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const ButtonExport = ({ start, end, totalCol, nameFile, totalCheck }) => {
  const getTableData = () => {
    const table = document.querySelector('table');
    
    const headerRow = table.querySelector('thead tr');
    const headers = Array.from(headerRow.querySelectorAll('th')).map(th => 
      th.querySelector('span').textContent
    );

    const dataRows = Array.from(table.querySelectorAll('tbody tr'));
    const data = dataRows.map(row => {
      return Array.from(row.querySelectorAll('td')).map(cell => {
        const textarea = cell.querySelector('textarea');
        if (textarea) {
          return textarea.value.trim();
        }
        const span = cell.querySelector('span');
        return span ? span.textContent.trim() : '';
      });
    });

    const footerRow = table.querySelector('tfoot tr');
    const totals = footerRow ? Array.from(footerRow.querySelectorAll('td span')).map(td => 
      td.textContent.trim()
    ) : [];

    return {
      headers,
      data: data.filter(row => row.length > 0),
      totals
    };
  };

  const calculateColumnTotals = (data) => {
    const numericColumns = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const totals = Array(totalCol).fill('');
    
    totals[1] = 'TOTAL'; 

    numericColumns.forEach(colIndex => {
      const columnSum = data.reduce((sum, row) => {
        const value = parseFloat(row[colIndex]?.replace(/[^0-9.-]+/g, '') || 0);
        return sum + value;
      }, 0);
      totals[colIndex] = columnSum.toString();
    });

    return totals;
  };

  const exportToExcel = () => {
    const { headers, data } = getTableData();
    let totals;
    if(totalCheck) {
      totals = calculateColumnTotals(data);
    }
    
    const ws = XLSX.utils.aoa_to_sheet([
      headers,
      ...data,
      totals
    ]);

    const colWidths = headers.map(() => ({ wch: 15 }));
    ws['!cols'] = colWidths;

    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[address]) continue;
      ws[address].s = {
        fill: { fgColor: { rgb: "4F81BD" } },
        font: { color: { rgb: "FFFFFF" }, bold: true },
        alignment: { horizontal: "center" }
      };
    }

    const lastRow = range.e.r;
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: lastRow, c: C });
      if (!ws[address]) continue;
      ws[address].s = {
        font: { color: { rgb: "FFFFFF" }, bold: true },
        fill: { fgColor: { rgb: "000000" } },
      };
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Salary Report");

    const wopts = { 
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary',
      cellStyles: true
    };

    XLSX.writeFile(wb, `${nameFile}.xlsx`, wopts);
  };

  return (
    <button 
      onClick={exportToExcel}
      className={`${styles.custom_btn} `}
    >
      Export to Excel
      <FontAwesomeIcon icon={faDownload} />
    </button>
  );
};

export default ButtonExport;