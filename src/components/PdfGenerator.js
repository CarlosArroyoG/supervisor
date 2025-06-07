import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const generatePdfReport = (evaluationData, branchData) => {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.text(`Reporte de Evaluación - ${branchData.name}`, 15, 20);
  
  // Datos básicos
  doc.setFontSize(12);
  doc.text(`Fecha: ${new Date(evaluationData.date).toLocaleDateString()}`, 15, 30);
  doc.text(`Dirección: ${branchData.address}`, 15, 38);
  
  // Tabla de resultados
  doc.autoTable({
    startY: 50,
    head: [['Categoría', 'Puntaje', 'Observaciones']],
    body: [
      ['Aseo', evaluationData.cleanliness, ''],
      ['Organización', evaluationData.organization, ''],
      ['Inventario', evaluationData.inventory, ''],
      ['Proceso de venta', evaluationData.process, ''],
      ['Presentación empleados', evaluationData.appearance, ''],
    ],
    styles: {
      cellPadding: 5,
      fontSize: 10,
      valign: 'middle',
      halign: 'center',
    },
    columnStyles: {
      0: { halign: 'left', cellWidth: 60 },
      1: { cellWidth: 30 },
      2: { cellWidth: 80 },
    },
    didDrawCell: (data) => {
      if (data.section === 'body' && data.column.index === 1) {
        const value = data.cell.raw;
        if (value < 3) {
          doc.setFillColor(255, 230, 230);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
        }
      }
    }
  });

  // Fotos (si existen)
  if (evaluationData.photos && evaluationData.photos.length > 0) {
    doc.addPage();
    doc.text('Evidencia Fotográfica:', 15, 20);
    
    evaluationData.photos.forEach((photo, index) => {
      if (index % 2 === 0 && index !== 0) doc.addPage();
      
      const yPos = 30 + (index % 2) * 100;
      doc.addImage(photo, 'JPEG', 15, yPos, 80, 80);
    });
  }

  doc.save(`reporte_${branchData.name}_${evaluationData.date}.pdf`);
};

export default generatePdfReport;