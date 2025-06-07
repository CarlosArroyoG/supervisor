import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateFullReport = (evaluation, branch, questions) => {
  const doc = new jsPDF();
  
  // Configuración inicial
  doc.setFont('helvetica');
  doc.setFontSize(20);
  doc.setTextColor(40, 53, 147);
  doc.text(`Reporte de Evaluación - ${branch.name}`, 105, 20, { align: 'center' });
  
  // Información básica
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Fecha: ${new Date(evaluation.date).toLocaleDateString()}`, 15, 35);
  doc.text(`Evaluador: ${evaluation.evaluatorName || 'N/A'}`, 15, 42);
  doc.text(`Dirección: ${branch.address}`, 15, 49);
  
  // Sección de resultados
  doc.setFontSize(14);
  doc.setTextColor(40, 53, 147);
  doc.text('Resultados de Evaluación', 15, 65);
  doc.setLineWidth(0.5);
  doc.line(15, 68, 195, 68);
  
  // Tabla de preguntas y respuestas
  const body = questions.map(q => [
    q.text,
    evaluation.answers[q.id] || 'N/A',
    getScoreColor(evaluation.answers[q.id])
  ]);
  
  doc.autoTable({
    startY: 75,
    head: [['Pregunta', 'Puntaje', 'Estado']],
    body: body,
    styles: {
      cellPadding: 5,
      fontSize: 10,
      valign: 'middle'
    },
    columnStyles: {
      0: { cellWidth: 120, halign: 'left' },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' }
    },
    didDrawCell: (data) => {
      if (data.section === 'body' && data.column.index === 2) {
        const value = data.cell.raw;
        if (value === 'Bajo') {
          doc.setFillColor(255, 235, 238);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
        }
      }
    }
  });
  
  // Observaciones
  doc.setFontSize(14);
  doc.setTextColor(40, 53, 147);
  doc.text('Observaciones Generales', 15, doc.autoTable.previous.finalY + 15);
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(evaluation.notes || 'Ninguna', 15, doc.autoTable.previous.finalY + 25);
  
  // Fotos
  if (evaluation.photos && evaluation.photos.length > 0) {
    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(40, 53, 147);
    doc.text('Evidencia Fotográfica', 105, 20, { align: 'center' });
    
    let yPosition = 30;
    evaluation.photos.forEach((photo, index) => {
      if (index > 0 && index % 2 === 0) {
        doc.addPage();
        yPosition = 30;
      }
      
      const xPosition = index % 2 === 0 ? 15 : 105;
      doc.addImage(photo, 'JPEG', xPosition, yPosition, 80, 80);
      
      if (index % 2 === 1) {
        yPosition += 90;
      }
    });
  }
  
  doc.save(`Reporte_${branch.name.replace(/\s+/g, '_')}_${evaluation.date.replace(/\//g, '-')}.pdf`);
};

const getScoreColor = (score) => {
  if (!score) return 'N/A';
  if (score >= 4) return 'Alto';
  if (score >= 3) return 'Medio';
  return 'Bajo';
};