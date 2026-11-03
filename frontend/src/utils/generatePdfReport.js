import jsPDF from 'jspdf';
import { normalizeRiskLevel, computeRiskScore } from './riskUtils';

export function generatePdfReport(scan, typeOverride) {
  if (!scan) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const scanType = (scan.type || typeOverride || 'THREAT').toUpperCase();
  const riskCategory = normalizeRiskLevel(scan.riskLevel);
  const reasons = Array.isArray(scan.reasons) ? scan.reasons : [];
  const riskScore = scan.riskScore || computeRiskScore(scan.riskLevel, reasons);
  const formattedDate = scan.createdAt
    ? new Date(scan.createdAt).toLocaleString()
    : new Date().toLocaleString();

  const primaryColor = [5, 150, 105]; // #059669
  const darkColor = [23, 43, 36]; // #172B24
  const grayColor = [100, 116, 139]; // #64748B

  let severityColor = [5, 150, 105]; // Green for SAFE
  if (riskCategory === 'SUSPICIOUS') {
    severityColor = [217, 119, 6]; // Amber
  } else if (riskCategory === 'DANGEROUS') {
    severityColor = [220, 38, 38]; // Red
  }

  // --- Document Header ---
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 18, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('SCAMSHIELD AI  |  CYBER THREAT ASSESSMENT REPORT', 14, 12);

  // Sub-header metadata band
  doc.setFillColor(248, 250, 252); // #F8FAFC
  doc.rect(0, 18, 210, 32, 'F');
  doc.setDrawColor(226, 232, 240); // #E2E8F0
  doc.line(0, 50, 210, 50);

  // Metadata items
  doc.setTextColor(...darkColor);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('SCAN TYPE:', 14, 26);
  doc.setFont('helvetica', 'normal');
  doc.text(scanType, 40, 26);

  doc.setFont('helvetica', 'bold');
  doc.text('DATE & TIME:', 14, 34);
  doc.setFont('helvetica', 'normal');
  doc.text(formattedDate, 40, 34);

  doc.setFont('helvetica', 'bold');
  doc.text('SCAN ID:', 14, 42);
  doc.setFont('helvetica', 'normal');
  doc.text(String(scan._id || 'LIVE-AUDIT-' + Date.now()), 40, 42);

  // Risk Score Box (Right side of header band)
  doc.setFillColor(...severityColor);
  doc.roundedRect(138, 23, 58, 22, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('THREAT SEVERITY SCORE', 143, 29);
  doc.setFontSize(14);
  doc.text(`${riskScore}/100`, 143, 37);
  doc.setFontSize(9);
  doc.text(`[ ${riskCategory} ]`, 143, 42);

  let cursorY = 60;

  // --- Helper to add Section Titles ---
  const addSectionTitle = (title) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...darkColor);
    doc.text(title.toUpperCase(), 14, cursorY);
    cursorY += 2;
    doc.setDrawColor(226, 232, 240);
    doc.line(14, cursorY, 196, cursorY);
    cursorY += 6;
  };

  // --- Section 1: Analyzed Content ---
  addSectionTitle('1. Analyzed Payload / Submitted Content');
  doc.setFont('courier', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  const rawContent = String(scan.content || 'No content provided.');
  const contentLines = doc.splitTextToSize(rawContent, 178);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  const contentBoxHeight = Math.min(contentLines.length * 4.5 + 6, 40);
  doc.roundedRect(14, cursorY, 182, contentBoxHeight, 1.5, 1.5, 'FD');

  doc.text(contentLines.slice(0, 8), 18, cursorY + 5);
  cursorY += contentBoxHeight + 8;

  // --- Section 2: AI Threat Explanation ---
  addSectionTitle('2. Threat Intelligence & AI Analysis');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const explanationText = String(scan.explanation || 'Analysis completed with no additional details provided.');
  const explanationLines = doc.splitTextToSize(explanationText, 180);
  doc.text(explanationLines, 14, cursorY);
  cursorY += explanationLines.length * 4.5 + 8;

  // --- Section 3: Detection Reasons & Red Flags ---
  if (reasons.length > 0) {
    addSectionTitle(`3. Observed Threat Indicators (${reasons.length})`);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);

    reasons.forEach((reason, i) => {
      if (cursorY > 260) {
        doc.addPage();
        cursorY = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(`[!] Indicator ${i + 1}:`, 16, cursorY);
      doc.setFont('helvetica', 'normal');
      const reasonLines = doc.splitTextToSize(String(reason), 150);
      doc.text(reasonLines, 45, cursorY);
      cursorY += Math.max(reasonLines.length * 4.5, 6) + 2;
    });
    cursorY += 6;
  }

  // --- Section 4: Recommendation ---
  if (scan.recommendation) {
    if (cursorY > 250) {
      doc.addPage();
      cursorY = 20;
    }
    addSectionTitle('4. SecOps Safety Recommendation');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);

    const recLines = doc.splitTextToSize(String(scan.recommendation), 180);
    doc.text(recLines, 14, cursorY);
    cursorY += recLines.length * 4.5 + 10;
  }

  // --- Footer ---
  const pageHeight = 297;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, pageHeight - 16, 196, pageHeight - 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...grayColor);
  doc.text('This automated threat report is generated by ScamShield AI. For enterprise verification only.', 14, pageHeight - 10);
  doc.text(`Generated on ${new Date().toUTCString()}`, 196, pageHeight - 10, { align: 'right' });

  // Save the PDF
  const filename = `ScamShield-${scanType}-Report-${Date.now().toString().slice(-6)}.pdf`;
  doc.save(filename);
}

