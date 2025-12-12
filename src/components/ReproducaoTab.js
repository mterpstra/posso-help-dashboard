// src/components/ReproducaoTab.js
// Phase 1: Manual Dashboard with CSV Import, Notes, and Vet Access
// Fully bilingual: Portuguese and English

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #2d5016;
  margin-bottom: 30px;
  font-size: 2em;
`;

const DashboardPanels = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const Panel = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.08);
  border-left: 5px solid ${props => props.borderColor || '#2d5016'};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(45, 80, 22, 0.15);
  }

  strong {
    display: block;
    font-size: 3em;
    color: #2d5016;
    margin-bottom: 10px;
    font-weight: bold;
  }

  span {
    color: #555;
    font-size: 1em;
    display: block;
  }
`;

const ActionBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  padding: 14px 28px;
  background: ${props => props.primary ? '#5d8a3a' : '#2d5016'};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.primary ? '#4a6f2e' : '#1e3a10'};
    transform: translateY(-2px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 12px 24px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  transition: all 0.2s;

  &:hover {
    color: #2d5016;
    background: #f5f5f5;
  }

  &.active {
    color: #2d5016;
    border-bottom-color: #2d5016;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;

  thead {
    background: #2d5016;
    color: white;
  }

  th {
    padding: 14px;
    text-align: left;
    font-weight: bold;
    font-size: 0.95em;
  }

  td {
    padding: 12px 14px;
    border-bottom: 1px solid #f0f0f0;
  }

  tbody tr:hover {
    background: #f9f9f9;
  }

  tbody tr:nth-child(even) {
    background: #fafafa;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'inseminated': return '#d4edda';
      case 'pregnant': return '#27ae60';
      case 'aborted': return '#e74c3c';
      case 'stillborn': return '#2c3e50';
      default: return '#e0e0e0';
    }
  }};
  color: ${props => ['pregnant', 'aborted', 'stillborn'].includes(props.status) ? 'white' : '#155724'};
`;

const Modal = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  margin: 50px auto;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #333;
  }

  input, select, textarea {
    width: 100%;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 1em;

    &:focus {
      outline: none;
      border-color: #2d5016;
    }
  }

  textarea {
    min-height: 100px;
    font-family: inherit;
  }
`;

const NotesSection = styled.div`
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 15px;
  margin-top: 20px;
  border-radius: 4px;
`;

const NoteItem = styled.div`
  background: white;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  border-left: 3px solid #2d5016;
`;

const NoteMeta = styled.div`
  font-size: 0.85em;
  color: #666;
  margin-bottom: 5px;
`;

const CalendarItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: white;
  border-left: 4px solid #3498db;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  &:hover {
    box-shadow: 0 3px 8px rgba(0,0,0,0.15);
  }
`;

const CalendarDate = styled.div`
  font-weight: bold;
  color: #2d5016;
`;

const CalendarAnimal = styled.div`
  color: #555;
`;

const CalendarDays = styled.div`
  color: #3498db;
  font-weight: 600;
`;

const ReproducaoTab = () => {
  const { t } = useTranslation();
  
  // State management
  const [activeTab, setActiveTab] = useState('protocolos');
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    pregnant: 0,
    activeProtocols: 0,
    upcomingBirths: 0,
    conceptionRate: 0
  });
  const [activeProtocols, setActiveProtocols] = useState([]);
  const [upcomingBirths, setUpcomingBirths] = useState([]);
  const [protocols, setProtocols] = useState([]);
  const [showNewProtocolModal, setShowNewProtocolModal] = useState(false);
  const [showAnimalDetails, setShowAnimalDetails] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [newProtocolData, setNewProtocolData] = useState({
    selectedAnimals: [],
    protocolId: '',
    startDate: new Date().toISOString().split('T')[0]
  });
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);

  // Fetch initial data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('zapmanejo_token');
      
      // Fetch dashboard stats
      const statsRes = await fetch('/api/reproduction/dashboard-stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const stats = await statsRes.json();
      setDashboardStats(stats);

      // Fetch active protocols
      const protocolsRes = await fetch('/api/reproduction/active-protocols', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const protocolsData = await protocolsRes.json();
      setActiveProtocols(protocolsData);

      // Fetch upcoming births
      const birthsRes = await fetch('/api/reproduction/calendar', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const birthsData = await birthsRes.json();
      setUpcomingBirths(birthsData);

      // Fetch available protocols
      const availableProtocolsRes = await fetch('/api/reproduction/protocols', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const availableProtocols = await availableProtocolsRes.json();
      setProtocols(availableProtocols);

    } catch (err) {
      console.error('Failed to fetch reproduction data:', err);
      // Load demo data for development
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = () => {
    setDashboardStats({
      pregnant: 12,
      activeProtocols: 8,
      upcomingBirths: 5,
      conceptionRate: 68
    });

    setActiveProtocols([
      { id: 1, 
        animalId: 2235, 
        animalTag: '2235', 
        animalNickname: 'Estrela', 
        protocolName: 'P4/E2 8 Dias', 
        startDate: '2025-01-15', 
        currentDay: 8, 
        iatfDate: '2025-01-25', 
        status: 'active' 
      },
      { id: 2, 
        animalId: 8888, 
        animalTag: '8888', 
        animalNickname: '', 
        protocolName: '7 Dias Otimizado', 
        startDate: '2025-01-18', 
        currentDay: 3, 
        iatfDate: '2025-01-27', 
        status: 'active' 
      },
    ]);

    setUpcomingBirths([
      { id: 1, 
        animalTag: '5430', 
        animalNickname: 'Mimosa', 
        projectedBirthDate: '2025-01-25', 
        daysUntilBirth: 4 
      },
      { id: 2, 
        animalTag: '3421', 
        animalNickname: 'Boneca', 
        projectedBirthDate: '2025-02-02', 
        daysUntilBirth: 12 
      },
    ]);

    setProtocols([
      { id: 1, 
        name: 'P4/E2 Padrão de 8 Dias (Gado de Corte)', 
        protocolType: 'gado_de_corte', 
        protocolTypeEnglish: 'beef_cattle',
        durationDays: 10 
      },
      { id: 2, 
        name: 'Protocolo de Curta Duração de 7 Dias', 
        protocolType: 'corte_otimizado', 
        protocolTypeEnglish: 'optimized_cutting',
        durationDays: 9 
      },
      { id: 3, 
        name: 'Protocolo Ovsynch Modificado (Gado de Leite)', 
        protocolType: 'gado_de_leite', 
        protocolTypeEnglish: 'dairy_cattle',
        durationDays: 10 
      },
    ]);

    setNotes([
      { id: 1, 
        createdBy: 'Dr. Silva', 
        role: 'vet', 
        createdAt: '2025-01-15T10:30:00', 
        noteText: 'Dispositivo inserido sem complicações. Vaca em bom estado corporal (ECC 3,5).' 
      },
      { id: 2, 
        createdBy: 'João', 
        role: 'rancher', 
        createdAt: '2025-01-18T08:15:00', 
        noteText: 'Vaca apresentando cio aparente. Protocolo seguindo conforme esperado.' 
      }
    ]);
  };

  const handleStartProtocol = async () => {
    if (!newProtocolData.selectedAnimals.length || !newProtocolData.protocolId) {
      alert(t('reproduction.select_animals_protocol'));
      return;
    }

    try {
      const token = localStorage.getItem('zapmanejo_token');
      const res = await fetch('/api/reproduction/start-protocol', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProtocolData)
      });

      if (res.ok) {
        alert(t('reproduction.protocol_started_success'));
        setShowNewProtocolModal(false);
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to start protocol:', err);
      alert(t('reproduction.protocol_start_error'));
    }
  };

  const handleConfirmPregnancy = async (animalProtocolId) => {
    const confirmedBy = prompt(t('reproduction.enter_vet_name'));
    if (!confirmedBy) return;

    try {
      const token = localStorage.getItem('zapmanejo_token');
      await fetch('/api/reproduction/confirm-pregnancy', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ animalProtocolId, confirmedBy })
      });

      alert(t('reproduction.pregnancy_confirmed'));
      fetchDashboardData();
      setShowAnimalDetails(false);
    } catch (err) {
      console.error('Failed to confirm pregnancy:', err);
      alert(t('reproduction.pregnancy_confirm_error'));
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      const token = localStorage.getItem('zapmanejo_token');
      await fetch('/api/reproduction/add-note', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          animalProtocolId: selectedAnimal.id,
          animalId: selectedAnimal.animalId,
          noteText: newNote,
          createdBy: 'Dashboard User',
          role: 'rancher'
        })
      });

      alert(t('reproduction.note_added'));
      setNewNote('');
      // Refresh notes (would fetch from API in production)
    } catch (err) {
      console.error('Failed to add note:', err);
      alert(t('reproduction.note_add_error'));
    }
  };

  const viewAnimalDetails = (protocol) => {
    setSelectedAnimal(protocol);
    setShowAnimalDetails(true);
  };

  if (loading) {
    return <Container><p style={{textAlign: 'center', padding: '40px'}}>{t('reproduction.loading')}</p></Container>;
  }

  return (
    <Container>
      <Title>🐄 {t('reproduction.title')}</Title>

      {/* Dashboard Panels */}
      <DashboardPanels>
        <Panel borderColor="#27ae60">
          <strong>{dashboardStats.pregnant}</strong>
          <span>{t('reproduction.pregnant_cows')}</span>
        </Panel>
        <Panel borderColor="#f39c12">
          <strong>{dashboardStats.activeProtocols}</strong>
          <span>{t('reproduction.active_protocols')}</span>
        </Panel>
        <Panel borderColor="#3498db">
          <strong>{dashboardStats.upcomingBirths}</strong>
          <span>{t('reproduction.upcoming_births_30')}</span>
        </Panel>
        <Panel borderColor="#9b59b6">
          <strong>{dashboardStats.conceptionRate}%</strong>
          <span>{t('reproduction.conception_rate')}</span>
        </Panel>
      </DashboardPanels>

      {/* Action Buttons */}
      <ActionBar>
        <Button primary onClick={() => setShowNewProtocolModal(true)}>
          ➕ {t('reproduction.new_protocol')}
        </Button>
        <Button onClick={() => alert(t('reproduction.report_in_development'))}>
          📊 {t('reproduction.production_report')}
        </Button>
        <Button as="label">
          📁 {t('reproduction.import_csv')}
          <input type="file" accept=".csv" style={{display: 'none'}} />
        </Button>
      </ActionBar>

      {/* Tabs */}
      <Tabs>
        <Tab className={activeTab === 'protocolos' ? 'active' : ''} onClick={() => setActiveTab('protocolos')}>
          {t('reproduction.active_protocols_tab')}
        </Tab>
        <Tab className={activeTab === 'calendario' ? 'active' : ''} onClick={() => setActiveTab('calendario')}>
          {t('reproduction.birth_calendar')}
        </Tab>
        <Tab className={activeTab === 'historico' ? 'active' : ''} onClick={() => setActiveTab('historico')}>
          {t('reproduction.history')}
        </Tab>
      </Tabs>

      {/* Tab Content: Protocolos Ativos */}
      {activeTab === 'protocolos' && (
        <div>
          <h3 style={{marginBottom: '15px', color: '#2d5016'}}>{t('reproduction.cows_in_protocol')}</h3>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>{t('tag')}</th>
                  <th>{t('nickname')}</th>
                  <th>{t('reproduction.protocol')}</th>
                  <th>{t('reproduction.start_date')}</th>
                  <th>{t('reproduction.current_day')}</th>
                  <th>{t('reproduction.predicted_iatf')}</th>
                  <th>{t('status')}</th>
                  <th>{t('reproduction.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {activeProtocols.map(protocol => (
                  <tr key={protocol.id}>
                    <td><strong>{protocol.animalTag}</strong></td>
                    <td>{protocol.animalNickname || '-'}</td>
                    <td>{protocol.protocolName}</td>
                    <td>{new Date(protocol.startDate).toLocaleDateString(t('locale'))}</td>
                    <td><strong>D{protocol.currentDay}</strong></td>
                    <td>{protocol.iatfDate ? new Date(protocol.iatfDate).toLocaleDateString(t('locale')) : '-'}</td>
                    <td>
                      <StatusBadge status={protocol.status === 'pregnant' ? 'pregnant' : 'inseminated'}>
                        {protocol.status === 'pregnant' ? t('reproduction.confirmed_pregnant') : t('reproduction.in_protocol')}
                      </StatusBadge>
                    </td>
                    <td>
                      <Button style={{padding: '6px 12px', fontSize: '0.85em'}} onClick={() => viewAnimalDetails(protocol)}>
                        {t('reproduction.view_details')}
                      </Button>
                    </td>
                  </tr>
                ))}
                {activeProtocols.length === 0 && (
                  <tr><td colSpan="8" style={{textAlign: 'center', padding: '20px', color: '#999'}}>{t('reproduction.no_active_protocols')}</td></tr>
                )}
              </tbody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* Tab Content: Calendário */}
      {activeTab === 'calendario' && (
        <div>
          <h3 style={{marginBottom: '15px', color: '#2d5016'}}>{t('reproduction.predicted_births_30')}</h3>
          {upcomingBirths.map(birth => (
            <CalendarItem key={birth.id}>
              <div>
                <CalendarDate>{new Date(birth.projectedBirthDate).toLocaleDateString(t('locale'))}</CalendarDate>
                <CalendarAnimal>{t('reproduction.cow')} {birth.animalTag} - {birth.animalNickname}</CalendarAnimal>
              </div>
              <CalendarDays>{t('reproduction.in_x_days', { days: birth.daysUntilBirth })}</CalendarDays>
            </CalendarItem>
          ))}
          {upcomingBirths.length === 0 && (
            <p style={{textAlign: 'center', color: '#999', padding: '40px'}}>{t('reproduction.no_upcoming_births')}</p>
          )}
        </div>
      )}

      {/* Tab Content: Histórico */}
      {activeTab === 'historico' && (
        <div>
          <h3 style={{marginBottom: '15px', color: '#2d5016'}}>{t('reproduction.protocol_history')}</h3>
          <p style={{color: '#666'}}>{t('reproduction.history_description')}</p>
        </div>
      )}

      {/* Modal: Novo Protocolo */}
      <Modal show={showNewProtocolModal} onClick={() => setShowNewProtocolModal(false)}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <h3 style={{marginBottom: '20px', color: '#2d5016'}}>{t('reproduction.new_protocol')}</h3>
          
          <FormGroup>
            <label>{t('reproduction.select_cows')}</label>
            <p style={{fontSize: '0.9em', color: '#666', marginBottom: '10px'}}>
              {t('reproduction.select_cows_description')}
            </p>
          </FormGroup>

          <FormGroup>
            <label>{t('reproduction.protocol')}</label>
            <select 
              value={newProtocolData.protocolId}
              onChange={e => setNewProtocolData({...newProtocolData, protocolId: e.target.value})}
            >
              <option value="">{t('reproduction.select_protocol')}</option>
              {protocols.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <label>{t('reproduction.start_date_d0')}</label>
            <input 
              type="date" 
              value={newProtocolData.startDate}
              onChange={e => setNewProtocolData({...newProtocolData, startDate: e.target.value})}
            />
          </FormGroup>

          <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
            <Button primary onClick={handleStartProtocol}>{t('reproduction.start_protocol')}</Button>
            <Button style={{background: '#95a5a6'}} onClick={() => setShowNewProtocolModal(false)}>{t('cancel')}</Button>
          </div>
        </ModalContent>
      </Modal>

      {/* Modal: Animal Details */}
      <Modal show={showAnimalDetails} onClick={() => setShowAnimalDetails(false)}>
        <ModalContent onClick={e => e.stopPropagation()}>
          {selectedAnimal && (
            <>
              <h3 style={{color: '#2d5016', marginBottom: '15px'}}>
                📋 {t('reproduction.details')}: {t('reproduction.cow')} {selectedAnimal.animalTag} {selectedAnimal.animalNickname && `- ${selectedAnimal.animalNickname}`}
              </h3>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                <div>
                  <p><strong>{t('reproduction.protocol')}:</strong> {selectedAnimal.protocolName}</p>
                  <p><strong>{t('reproduction.start_date')}:</strong> {new Date(selectedAnimal.startDate).toLocaleDateString(t('locale'))}</p>
                  <p><strong>{t('reproduction.current_day')}:</strong> D{selectedAnimal.currentDay}</p>
                </div>
                <div>
                  <p><strong>{t('reproduction.predicted_iatf')}:</strong> {new Date(selectedAnimal.iatfDate).toLocaleDateString(t('locale'))}</p>
                  <p><strong>{t('status')}:</strong> <StatusBadge status={selectedAnimal.status === 'pregnant' ? 'pregnant' : 'inseminated'}>
                    {selectedAnimal.status === 'pregnant' ? t('reproduction.pregnant') : t('reproduction.in_protocol')}
                  </StatusBadge></p>
                </div>
              </div>

              <NotesSection>
                <h4 style={{marginBottom: '10px', color: '#856404'}}>📝 {t('reproduction.notes_observations')}</h4>
                
                {notes.map(note => (
                  <NoteItem key={note.id}>
                    <NoteMeta>
                      {note.createdBy} ({t(`reproduction.role_${note.role}`)}) - {new Date(note.createdAt).toLocaleString(t('locale'))}
                    </NoteMeta>
                    <div>{note.noteText}</div>
                  </NoteItem>
                ))}

                <FormGroup style={{marginTop: '15px'}}>
                  <textarea 
                    placeholder={t('reproduction.add_new_note')}
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                  ></textarea>
                  <Button style={{marginTop: '10px', padding: '8px 16px', fontSize: '0.9em'}} onClick={handleAddNote}>
                    {t('reproduction.add_note')}
                  </Button>
                </FormGroup>
              </NotesSection>

              <div style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
                <Button onClick={() => handleConfirmPregnancy(selectedAnimal.id)}>
                  ✅ {t('reproduction.confirm_pregnancy')}
                </Button>
                <Button style={{background: '#e74c3c'}} onClick={() => alert(t('reproduction.register_abortion'))}>
                  ❌ {t('reproduction.register_abortion')}
                </Button>
                <Button style={{background: '#95a5a6'}} onClick={() => setShowAnimalDetails(false)}>
                  {t('close')}
                </Button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ReproducaoTab;
