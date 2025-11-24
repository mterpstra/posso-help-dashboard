// src/components/RebanhoTab.js
// Enhanced version combining Mark's backend with spreadsheet features

import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

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
  justify-content: center;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 180px;
  text-align: center;
  strong {
    display: block;
    font-size: 2.6em;
    color: #2d5016;
    margin-bottom: 8px;
  }
  span {
    color: #555;
    font-size: 0.95em;
  }
`;

const ActionBar = styled.div`
  text-align: center;
  margin: 25px 0;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: #2d5016;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  &:hover { background: #1e3a10; }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  padding: 12px 24px;
  background: #5d8a3a;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  &:hover { background: #4a6f2e; }
`;

const EditableCell = styled.div`
  min-width: 80px;
  padding: 4px;
  cursor: text;
  &:hover {
    background: #f0f0f0;
    border-radius: 4px;
  }
`;

const RebanhoTab = () => {
  const { t } = useTranslation();
  const [animals, setAnimals] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingCell, setEditingCell] = useState(null);

  // Fetch real data from backend
  useEffect(() => {
    fetchHerd();
  }, []);

  const fetchHerd = async () => {
    try {
      const token = localStorage.getItem('zapmanejo_token');
      const res = await fetch('/api/animals/current', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) throw new Error('Failed to fetch herd');
      const data = await res.json();

      // Normalize field names from backend
      const normalized = data.map(animal => ({
        id: animal.id,
        ear_tag: animal.tag || animal.ear_tag || '',
        nickname: animal.nickname || '',
        sex: animal.sex === 'M' ? 'Macho' : 'Fêmea',
        breed: animal.breed || '',
        birth_date: animal.birth_date || '',
        mother_tag: animal.mother_tag || '',
        status: getStatusLabel(animal),
        area: animal.area || '',
        last_calving: animal.last_calving || '',
        notes: animal.notes || '',
        alive: animal.alive
      }));

      setAnimals(normalized);
      setFiltered(normalized);
    } catch (err) {
      console.error('Herd fetch error:', err);
      // Load demo data if backend fails (for development)
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = () => {
    const demo = [
      {id:1, ear_tag:"2235", nickname:"Estrela", sex:"Fêmea", breed:"Nelore", birth_date:"2022-03-12", mother_tag:"1124", status:"Prenhe", area:"Piquete 3", last_calving:"2025-01-15", notes:"IATF", alive:true},
      {id:2, ear_tag:"8888", nickname:"", sex:"Macho", breed:"Angus", birth_date:"2024-12-25", mother_tag:"4456", status:"Bezerro", area:"Cercado", last_calving:"", notes:"Nascido por WhatsApp", alive:true}
    ];
    setAnimals(demo);
    setFiltered(demo);
  };

  const getStatusLabel = (animal) => {
    if (!animal.alive) {
      if (animal.cause_of_death?.toLowerCase().includes('venda')) return 'Vendido';
      if (animal.cause_of_death?.toLowerCase().includes('aborto')) return 'Aborto';
      return 'Morto';
    }
    if (animal.pregnant) return 'Prenhe';
    if (animal.status) return animal.status;
    return 'Vivo';
  };

  // Live search
  useEffect(() => {
    if (!searchTerm) {
      setFiltered(animals);
      return;
    }
    const term = searchTerm.toLowerCase();
    const result = animals.filter(a =>
      Object.values(a).some(val => 
        String(val).toLowerCase().includes(term)
      )
    );
    setFiltered(result);
  }, [searchTerm, animals]);

  // Summary calculations
  const summary = useMemo(() => {
    const alive = animals.filter(a => a.alive).length;
    const males = animals.filter(a => a.sex === 'Macho' && a.alive).length;
    const females = animals.filter(a => a.sex === 'Fêmea' && a.alive).length;
    const pregnant = animals.filter(a => a.status === 'Prenhe').length;
    const calves = animals.filter(a => {
      if (!a.birth_date || !a.alive) return false;
      const birth = new Date(a.birth_date);
      const months = (new Date() - birth) / (1000 * 60 * 60 * 24 * 30.4);
      return months < 12;
    }).length;

    return { total: animals.length, alive, males, females, pregnant, calves };
  }, [animals]);

  // Cell editing handler
  const handleCellEdit = async (animalId, field, newValue) => {
    // Update local state immediately
    setAnimals(prev => prev.map(a => 
      a.id === animalId ? {...a, [field]: newValue} : a
    ));

    // Sync with backend
    try {
      const token = localStorage.getItem('zapmanejo_token');
      await fetch(`/api/animals/${animalId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [field]: newValue })
      });
    } catch (err) {
      console.error('Failed to update animal:', err);
      alert('Erro ao salvar alteração. Verifique sua conexão.');
    }
  };

  // Import CSV/XLSX
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const imported = results.data
            .filter(row => row.ear_tag) // Only rows with ear tag
            .map((row, i) => ({
              id: Date.now() + i,
              ear_tag: row.ear_tag || row.Brinco || '',
              nickname: row.nickname || row.Apelido || '',
              sex: row.sex || row.Sexo || '',
              breed: row.breed || row.Raça || '',
              birth_date: row.birth_date || row.Nascimento || '',
              mother_tag: row.mother_tag || row.Mãe || '',
              status: row.status || row.Status || '',
              area: row.area || row.Área || '',
              last_calving: row.last_calving || '',
              notes: row.notes || row.Observações || '',
              alive: true
            }));
          
          setAnimals(prev => [...prev, ...imported]);
          alert(`${imported.length} animais importados com sucesso!`);
        }
      });
    } else if (ext === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const wb = XLSX.read(ev.target.result, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws);
        
        const imported = data
          .filter(row => row.ear_tag || row.Brinco)
          .map((row, i) => ({
            id: Date.now() + i,
            ear_tag: row.ear_tag || row.Brinco || '',
            nickname: row.nickname || row.Apelido || '',
            sex: row.sex || row.Sexo || '',
            breed: row.breed || row.Raça || '',
            birth_date: row.birth_date || row.Nascimento || '',
            mother_tag: row.mother_tag || row.Mãe || '',
            status: row.status || row.Status || '',
            area: row.area || row.Área || '',
            last_calving: row.last_calving || '',
            notes: row.notes || row.Observações || '',
            alive: true
          }));

        setAnimals(prev => [...prev, ...imported]);
        alert(`${imported.length} animais importados com sucesso!`);
      };
      reader.readAsBinaryString(file);
    }

    // Reset file input
    e.target.value = '';
  };

  // Export to Excel
  const handleExport = () => {
    const exportData = filtered.map(a => ({
      'Brinco': a.ear_tag,
      'Apelido': a.nickname,
      'Sexo': a.sex,
      'Raça': a.breed,
      'Nascimento': a.birth_date,
      'Mãe': a.mother_tag,
      'Status': a.status,
      'Área': a.area,
      'Último Parto': a.last_calving,
      'Observações': a.notes
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rebanho");
    
    // Auto-size columns
    const colWidths = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, 12)
    }));
    ws['!cols'] = colWidths;

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `ZapManejo_Rebanho_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  // Editable cell component
  const EditableField = ({ row, field, displayValue }) => {
    const [value, setValue] = useState(displayValue);
    const [isEditing, setIsEditing] = useState(false);

    const handleBlur = () => {
      setIsEditing(false);
      if (value !== displayValue) {
        handleCellEdit(row.id, field, value);
      }
    };

    return (
      <EditableCell
        contentEditable={isEditing}
        suppressContentEditableWarning
        onDoubleClick={() => setIsEditing(true)}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleBlur();
          }
        }}
      >
        {isEditing ? value : displayValue}
      </EditableCell>
    );
  };

  // Table columns with editable cells
  const columns = [
    { 
      name: 'Brinco', 
      selector: row => row.ear_tag, 
      sortable: true, 
      width: '120px',
      cell: row => <EditableField row={row} field="ear_tag" displayValue={row.ear_tag} />
    },
    { 
      name: 'Apelido', 
      selector: row => row.nickname, 
      sortable: true,
      cell: row => <EditableField row={row} field="nickname" displayValue={row.nickname} />
    },
    { 
      name: 'Sexo', 
      selector: row => row.sex, 
      sortable: true, 
      width: '100px',
      cell: row => <EditableField row={row} field="sex" displayValue={row.sex} />
    },
    { 
      name: 'Raça', 
      selector: row => row.breed, 
      sortable: true,
      cell: row => <EditableField row={row} field="breed" displayValue={row.breed} />
    },
    { 
      name: 'Nasc.', 
      selector: row => row.birth_date, 
      sortable: true,
      format: row => row.birth_date ? new Date(row.birth_date).toLocaleDateString('pt-BR') : '-'
    },
    { 
      name: 'Mãe', 
      selector: row => row.mother_tag, 
      sortable: true,
      cell: row => <EditableField row={row} field="mother_tag" displayValue={row.mother_tag} />
    },
    { 
      name: 'Status', 
      selector: row => row.status, 
      sortable: true,
      cell: row => (
        <span style={{
          color: row.alive ? '#2d5016' : '#c0392b',
          fontWeight: 'bold'
        }}>
          {row.status}
        </span>
      )
    },
    { 
      name: 'Área', 
      selector: row => row.area, 
      sortable: true,
      cell: row => <EditableField row={row} field="area" displayValue={row.area} />
    },
    { 
      name: 'Obs', 
      selector: row => row.notes,
      cell: row => <EditableField row={row} field="notes" displayValue={row.notes} />
    },
  ];

  return (
    <div className="white-container" style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#2d5016', marginBottom: '10px' }}>
        🐄 {t('herd') || 'Rebanho Atual'}
      </h2>

      <SummaryCards>
        <Card><strong>{summary.total}</strong> <span>Total Registrados</span></Card>
        <Card><strong>{summary.alive}</strong> <span>Rebanho Atual</span></Card>
        <Card><strong>{summary.males}</strong> <span>Machos</span></Card>
        <Card><strong>{summary.females}</strong> <span>Fêmeas</span></Card>
        <Card><strong>{summary.pregnant}</strong> <span>Prenhes</span></Card>
        <Card><strong>{summary.calves}</strong> <span>Bezerros (&lt;12m)</span></Card>
      </SummaryCards>

      <SearchInput
        type="text"
        placeholder="🔍 Buscar por brinco, raça, área, status..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <ActionBar>
        <FileInput 
          type="file" 
          id="fileImport" 
          accept=".csv,.xlsx" 
          onChange={handleImport} 
        />
        <FileLabel htmlFor="fileImport">
          📁 Importar CSV/Excel
        </FileLabel>
        
        <Button onClick={handleExport} disabled={filtered.length === 0}>
          📥 Exportar para Excel
        </Button>

        <Button onClick={fetchHerd} disabled={loading}>
          🔄 Recarregar
        </Button>
      </ActionBar>

      <div style={{ fontSize: '0.9em', color: '#666', textAlign: 'center', marginBottom: '10px' }}>
        💡 Dica: Clique duas vezes em qualquer célula para editar
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        progressPending={loading}
        pagination
        paginationPerPage={25}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        highlightOnHover
        pointerOnHover
        striped
        responsive
        noDataComponent="Nenhum animal encontrado"
        customStyles={{
          headRow: {
            style: {
              backgroundColor: '#2d5016',
              color: 'white',
              fontSize: '1em',
              fontWeight: 'bold',
            },
          },
        }}
      />
    </div>
  );
};

export default RebanhoTab;
