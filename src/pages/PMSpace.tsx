import { useState } from 'react';
import { PageHeader, Card } from '@components';
import { Upload, File, CheckCircle } from 'lucide-react';
import styles from './PMSpace.module.css';

export default function PMSpace() {
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; date: string }[]>(
    [
      { name: 'project_plan_Q3.xlsx', date: '2026-09-14' },
      { name: 'budget_forecast.pdf', date: '2026-09-12' },
      { name: 'risk_register.docx', date: '2026-09-10' },
    ]
  );
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        setUploadedFiles(prev => [
          ...prev,
          { name: file.name, date: new Date().toISOString().split('T')[0] }
        ]);
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        setUploadedFiles(prev => [
          ...prev,
          { name: file.name, date: new Date().toISOString().split('T')[0] }
        ]);
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.pmSpace}>
      <PageHeader
        title="Espacio PM"
        subtitle="Compartir documentos y actualizaciones de proyectos"
      />

      <div className={styles.section}>
        <h2>Subir Documentos</h2>
        <Card
          className={`${styles.uploadArea} ${dragActive ? styles.active : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload size={48} className={styles.uploadIcon} />
          <h3>Arrastra archivos aquí o haz clic para seleccionar</h3>
          <p>Soporta: Excel, PDF, Word, PowerPoint (máx. 50MB)</p>
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            className={styles.fileInput}
            id="file-input"
          />
          <label htmlFor="file-input" className={styles.fileLabel}>
            Seleccionar Archivos
          </label>
        </Card>
      </div>

      <div className={styles.section}>
        <h2>Documentos Cargados ({uploadedFiles.length})</h2>
        <div className={styles.filesList}>
          {uploadedFiles.length === 0 ? (
            <Card className={styles.emptyState}>
              <p>No hay documentos cargados aún</p>
            </Card>
          ) : (
            uploadedFiles.map((file, index) => (
              <Card key={index} className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <File size={24} className={styles.fileIcon} />
                  <div className={styles.fileDetails}>
                    <h4>{file.name}</h4>
                    <p>{file.date}</p>
                  </div>
                </div>
                <div className={styles.fileActions}>
                  <CheckCircle size={20} className={styles.uploadedIcon} />
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFile(index)}
                    title="Eliminar"
                  >
                    ×
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Actualizaciones Recientes</h2>
        <div className={styles.updates}>
          {[
            { user: 'Juan García', action: 'Subió', file: 'project_plan_Q3.xlsx', time: 'Hace 1 día' },
            { user: 'María López', action: 'Comentó en', file: 'budget_forecast.pdf', time: 'Hace 3 días' },
            { user: 'Carlos Rodríguez', action: 'Subió', file: 'risk_register.docx', time: 'Hace 5 días' },
          ].map((update, index) => (
            <Card key={index} className={styles.updateItem}>
              <div className={styles.updateContent}>
                <h4>{update.user}</h4>
                <p>
                  {update.action} <strong>{update.file}</strong>
                </p>
              </div>
              <span className={styles.updateTime}>{update.time}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
