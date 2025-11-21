import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import styled from 'styled-components';

const SearchInput = styled.input`
  padding: 12px 16px;
  font-size: 1.1em;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  display: block;
  border: 2px solid #2d5016;
  border-radius: 8px;
`;

const SummaryCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;
const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  flex: 1;
  min-width: 180px;
  text-align: center;
  strong {
    display: block;
    font-size: 2.4em;
    color: #2d5016;
  }
`;

const RebanhoTab = () => {
  const { t } = useTranslation();
  const [animals, setAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Demo data (will be replaced by real API later)
  useEffect(() => {
    setAnimals([
      { id: 1, ear_tag: "2235", sex: "Fêmea", breed: "Nelore", birth_date: "2022-03-12", mother_tag: "1124", status: "Prenhe", area: "Piquete 5", last_calving: "2025-01-15", notes: "IATF" },
      { id: 2, ear_tag: "8888", sex: "Macho", breed: "Angus", birth_date: "2024-12-25", mother_tag: "4456", status: "Bezerro", area: "Cercado Bezerros", last_calving: null, notes: "" },
      { id: 3, ear_tag: "5430", sex: "Fêmea", breed: "Girolando", birth_date: "2023-06-05", mother_tag: "3210", status: "Morto", area: "Piquete 3", last_calving: "2025-02-10", notes: "Doença" },
      { id: 4, ear_tag: "9876", sex: "Fêmea", breed: "Nelore", birth_date: "2021-08-20", mother_tag: "5544", status: "Vendido", area: "", last_calving: "2024-11-01", notes: "Venda 15/11/2025" },
    ]);
  }, []);

  const filtered = useMemo(() => {
    if (!searchTerm) return animals;
    const term = searchTerm.toLowerCase();
    return animals.filter(a =>
      Object.values(a).join(' ').toLowerCase().includes(term)
    );
  }, [animals, searchTerm]);

  const summary = useMemo(() => {
    const totalRegistered = animals.length;
    const alive = animals.filter(a => !['Morto', 'Abortado', 'Vendido', 'Dead', 'Aborted', 'Sold']
      .includes(a.status || '')).length;
    const dead = animals.filter(a => ['Morto', 'Dead'].includes(a.status || '')).length;
    const aborted = animals.filter(a => ['Abortado', 'Aborted'].includes(a.status || '')).length;
    const sold = animals.filter(a => ['Vendido', 'Sold'].includes(a.status || '')).length;
    const pregnant = animals.filter(a => ['Prenhe', 'Pregnant'].includes(a.status || '')).length;

    return { totalRegistered, alive, dead, aborted, sold, pregnant };
  }, [animals]);

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (res) => {
          const newAnimals = res.data.map((row, i) => ({ id: Date.now() + i, ...row }));
          setAnimals(prev => [...prev, ...newAnimals]);
        }
      });
    } else if (ext === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const wb = XLSX.read(ev.target.result, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
        const newAnimals = data.map((row, i) => ({ id: Date.now() + i, ...row }));
        setAnimals(prev => [...prev, ...newAnimals]);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(animals);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rebanho");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `ZapManejo_Rebanho_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  const columns = [
    { name: t('tag'), selector: row => row.ear_tag, sortable: true },
    { name: t('sex'), selector: row => row.sex, sortable: true },
    { name: t('breed'), selector: row => row.breed, sortable: true },
    { name: t('birth_date') || 'Nascimento', selector: row => row.birth_date, sortable: true },
    { name: 'Mãe', selector: row => row.mother_tag, sortable: true },
    { name: t('status') || 'Status', selector: row => row.status, sortable: true },
    { name: t('area'), selector: row => row.area, sortable: true },
    { name: 'Último Parto', selector: row => row.last_calving },
    { name: t('notes') || 'Obs', selector: row => row.notes },
  ];

  return (
    <>
      <h2 style={{ textAlign: 'center', color: '#2d5016', margin: '20px 0' }}>
        {t('herd_title')}
      </h2>

      <SummaryCards>
        <Card><strong>{summary.totalRegistered}</strong> {t('total_animals')}</Card>
        <Card><strong>{summary.alive}</strong> {t('current_herd')}</Card>
        <Card><strong>{summary.dead}</strong> {t('dead')}</Card>
        <Card><strong>{summary.aborted}</strong> {t('aborted')}</Card>
        <Card><strong>{summary.sold}</strong> {t('sold')}</Card>
        <Card><strong>{summary.pregnant}</strong> {t('pregnant')}</Card>
      </SummaryCards>

      <SearchInput
        type="text"
        placeholder="🔍 Buscar por brinco, raça, status, área..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <input type="file" accept=".csv,.xlsx" onChange={handleImport} style={{ marginRight: '10px' }} />
        <button onClick={handleExport} style={{ padding: '10px 20px', background: '#2d5016', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Exportar Excel
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        pagination
        highlightOnHover
        responsive
        noDataComponent={t('no_data') || "Nenhum animal encontrado"}
      />
    </>
  );
};

export default RebanhoTab;
