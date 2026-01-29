import { Download, FileJson, FileText } from 'lucide-react';
import type { ReconResult } from '@/types/recon';

interface ExportButtonsProps {
  result: ReconResult;
}

export const ExportButtons = ({ result }: ExportButtonsProps) => {
  const exportJSON = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recon-${result.target}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    // Create a printable HTML version
    const printContent = generatePrintableHTML(result);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={exportJSON}
        className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors"
      >
        <FileJson className="w-4 h-4" />
        Export JSON
      </button>
      <button
        onClick={exportPDF}
        className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors"
      >
        <FileText className="w-4 h-4" />
        Export PDF
      </button>
    </div>
  );
};

function generatePrintableHTML(result: ReconResult): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Reconnaissance Report - ${result.target}</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { color: #00b4d8; border-bottom: 2px solid #00b4d8; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f5f5f5; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
        .low { background: #d4edda; color: #155724; }
        .medium { background: #fff3cd; color: #856404; }
        .high { background: #f8d7da; color: #721c24; }
        .critical { background: #721c24; color: white; }
        .mono { font-family: monospace; font-size: 12px; }
        .disclaimer { background: #f8f9fa; padding: 15px; border-left: 4px solid #00b4d8; margin-top: 30px; }
      </style>
    </head>
    <body>
      <h1>🔍 Reconnaissance Report</h1>
      <p><strong>Target:</strong> ${result.target}</p>
      <p><strong>Scan Date:</strong> ${result.scanDate}</p>
      
      <h2>Server Information</h2>
      <table>
        <tr><th>IP Address</th><td class="mono">${result.serverInfo.ip}</td></tr>
        <tr><th>Provider</th><td>${result.serverInfo.provider || 'Unknown'}</td></tr>
        <tr><th>Location</th><td>${result.serverInfo.location || 'Unknown'}</td></tr>
        <tr><th>ASN</th><td class="mono">${result.serverInfo.asn || 'N/A'}</td></tr>
      </table>

      <h2>Technologies Detected</h2>
      <table>
        <tr><th>Technology</th><th>Category</th><th>Confidence</th></tr>
        ${result.technologies.map(t => `
          <tr><td>${t.name}${t.version ? ` v${t.version}` : ''}</td><td>${t.category}</td><td>${t.confidence}%</td></tr>
        `).join('')}
      </table>

      <h2>DNS Records</h2>
      <table>
        <tr><th>Type</th><th>Value</th></tr>
        ${result.dnsRecords.map(r => `
          <tr><td>${r.type}</td><td class="mono">${r.value}</td></tr>
        `).join('')}
      </table>

      <h2>Security Headers</h2>
      <table>
        <tr><th>Header</th><th>Value</th><th>Status</th></tr>
        ${result.httpHeaders.filter(h => ['Content-Security-Policy', 'X-Frame-Options', 'X-Content-Type-Options', 'Strict-Transport-Security'].includes(h.name)).map(h => `
          <tr><td>${h.name}</td><td class="mono">${h.value}</td><td><span class="badge ${h.status}">${h.status}</span></td></tr>
        `).join('')}
      </table>

      <h2>Risk Assessment</h2>
      <p><strong>Overall Risk Level:</strong> <span class="badge ${result.overallRisk}">${result.overallRisk.toUpperCase()}</span></p>
      <table>
        <tr><th>Category</th><th>Description</th><th>Severity</th></tr>
        ${result.risks.map(r => `
          <tr><td>${r.category}</td><td>${r.description}</td><td><span class="badge ${r.severity}">${r.severity}</span></td></tr>
        `).join('')}
      </table>

      <div class="disclaimer">
        <strong>⚠️ Disclaimer:</strong> This report was generated using passive reconnaissance techniques and publicly available data only. 
        This tool is intended for educational purposes and authorized security assessments only. 
        Always obtain proper authorization before scanning any systems you do not own.
      </div>
    </body>
    </html>
  `;
}
