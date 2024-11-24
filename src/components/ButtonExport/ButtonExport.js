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

    // Lấy hàng tổng trực tiếp từ bảng
    const footerRow = table.querySelector('tfoot tr');
    const totals = footerRow ? Array.from(footerRow.querySelectorAll('td')).map(td => {
      const span = td.querySelector('span');
      return span ? span.textContent.trim() : '';
    }) : [];

    return {
      headers,
      data: data.filter(row => row.length > 0),
      totals
    };
  };

  const exportToExcel = () => {
    const { headers, data, totals } = getTableData();
    
    // Tạo worksheet với dữ liệu đã có
    const ws = XLSX.utils.aoa_to_sheet([
      headers,
      ...data,
      ...(totalCheck ? [totals] : [])
    ]);

    // Định dạng cột
    const colWidths = headers.map(() => ({ wch: 15 }));
    ws['!cols'] = colWidths;

    // Định dạng header
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

    // Định dạng hàng tổng
    if (totalCheck) {
      const lastRow = range.e.r;
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_cell({ r: lastRow, c: C });
        if (!ws[address]) continue;
        ws[address].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "000000" } },
          font: { color: { rgb: "FFFFFF" }, bold: true },
        };
      }
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