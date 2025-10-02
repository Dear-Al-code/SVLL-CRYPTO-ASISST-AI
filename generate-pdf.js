const fs = require('fs');
const path = require('path');

// Lee el markdown
const mdContent = fs.readFileSync(path.join(__dirname, 'EXECUTIVE-SUMMARY.md'), 'utf8');

// Convierte markdown simple a HTML
function markdownToHtml(md) {
  let html = md;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

  // Code blocks
  html = html.replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>');

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');

  // Tables (simple)
  html = html.replace(/^\|(.+)\|$/gim, '<tr><td>$1</td></tr>');

  // Checkboxes
  html = html.replace(/\[x\]/gim, '☑');
  html = html.replace(/\[ \]/gim, '☐');

  // Paragraphs
  html = html.split('\n\n').map(para => {
    if (!para.startsWith('<') && para.trim() !== '' && para.trim() !== '---') {
      return `<p>${para}</p>`;
    }
    return para;
  }).join('\n');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr/>');

  return html;
}

const htmlContent = markdownToHtml(mdContent);

// Template HTML con estilos minimalistas
const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sovereign AI - Executive Summary</title>
    <style>
        @page {
            margin: 2cm;
            size: A4;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: #000;
            background: #fff;
            max-width: 21cm;
            margin: 0 auto;
            padding: 2cm;
        }

        h1 {
            font-size: 32px;
            font-weight: 700;
            margin: 40px 0 20px 0;
            color: #FF0000;
            text-transform: uppercase;
            letter-spacing: -1px;
            page-break-before: always;
        }

        h1:first-of-type {
            page-break-before: auto;
            font-size: 48px;
            margin-top: 0;
            border-bottom: 4px solid #FF0000;
            padding-bottom: 20px;
        }

        h2 {
            font-size: 24px;
            font-weight: 700;
            margin: 30px 0 15px 0;
            color: #000;
            border-left: 4px solid #FF0000;
            padding-left: 15px;
        }

        h3 {
            font-size: 18px;
            font-weight: 600;
            margin: 20px 0 10px 0;
            color: #333;
        }

        p {
            margin: 10px 0;
            text-align: justify;
        }

        ul, ol {
            margin: 10px 0;
            padding-left: 30px;
        }

        li {
            margin: 5px 0;
        }

        pre {
            background: #f5f5f5;
            border-left: 4px solid #FF0000;
            padding: 15px;
            margin: 15px 0;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            line-height: 1.4;
        }

        code {
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
        }

        pre code {
            background: none;
            padding: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 14px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        th {
            background: #000;
            color: #fff;
            font-weight: 600;
        }

        tr:nth-child(even) {
            background: #f9f9f9;
        }

        hr {
            border: none;
            border-top: 2px solid #FF0000;
            margin: 30px 0;
        }

        a {
            color: #FF0000;
            text-decoration: none;
            border-bottom: 1px solid #FF0000;
        }

        a:hover {
            background: #FF0000;
            color: #fff;
        }

        strong {
            font-weight: 700;
            color: #000;
        }

        blockquote {
            border-left: 4px solid #FF0000;
            padding-left: 20px;
            margin: 20px 0;
            font-style: italic;
            color: #666;
        }

        .cover-page {
            text-align: center;
            padding: 100px 0;
            page-break-after: always;
        }

        .cover-page h1 {
            font-size: 64px;
            margin-bottom: 20px;
            border: none;
        }

        .cover-page .subtitle {
            font-size: 24px;
            color: #666;
            margin: 20px 0;
        }

        .cover-page .date {
            font-size: 16px;
            color: #999;
            margin-top: 40px;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }

        @media print {
            body {
                max-width: 100%;
                padding: 0;
            }

            .no-print {
                display: none;
            }

            h1, h2, h3 {
                page-break-after: avoid;
            }

            pre, table {
                page-break-inside: avoid;
            }
        }

        /* Print button */
        .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #FF0000;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            text-transform: uppercase;
            letter-spacing: 1px;
            z-index: 1000;
        }

        .print-button:hover {
            background: #cc0000;
        }
    </style>
</head>
<body>
    <button class="print-button no-print" onclick="window.print()">📄 IMPRIMIR / GUARDAR PDF</button>

    <div class="cover-page">
        <h1>SOVEREIGN AI</h1>
        <div class="subtitle">Executive Summary & Technical Documentation</div>
        <div class="subtitle">VPS 82.180.162.78 • coinbase-token.xyz</div>
        <div class="date">October 2, 2025</div>
        <div class="date">CONFIDENTIAL</div>
    </div>

    ${htmlContent}

    <div class="footer">
        <p>Sovereign AI - Self-Sovereign AI Infrastructure on Base</p>
        <p>Generated: ${new Date().toISOString().split('T')[0]}</p>
        <p>CONFIDENTIAL - For Internal Use Only</p>
    </div>

    <script>
        // Auto-wrap tables
        document.querySelectorAll('table').forEach(table => {
            const wrapper = document.createElement('div');
            wrapper.style.overflowX = 'auto';
            wrapper.style.margin = '20px 0';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });

        // Clean up code blocks
        document.querySelectorAll('pre code').forEach(block => {
            block.textContent = block.textContent.trim();
        });
    </script>
</body>
</html>`;

// Guarda el HTML
fs.writeFileSync(path.join(__dirname, 'SOVEREIGN-AI-EXECUTIVE-SUMMARY.html'), template);

console.log('✅ HTML generado exitosamente!');
console.log('📄 Archivo: SOVEREIGN-AI-EXECUTIVE-SUMMARY.html');
console.log('');
console.log('Para convertir a PDF:');
console.log('1. Abre el archivo HTML en tu navegador');
console.log('2. Click en el botón "IMPRIMIR / GUARDAR PDF"');
console.log('3. Selecciona "Guardar como PDF" como destino');
console.log('4. Ajusta márgenes si es necesario');
console.log('5. Guarda');
console.log('');
console.log('O accede desde:');
console.log(`http://82.180.162.78:8000/SOVEREIGN-AI-EXECUTIVE-SUMMARY.html`);
