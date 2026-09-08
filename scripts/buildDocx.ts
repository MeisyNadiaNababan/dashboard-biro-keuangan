import { buildDocxDocument } from '../src/utils/generateDocx.js';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  try {
    const buffer = await buildDocxDocument();
    const publicDir = path.resolve(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const outputPath = path.join(publicDir, 'Kamus_KPI_Dashboard_Biro_Keuangan_dan_PDSI_BP_Batam.docx');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Word document successfully generated at: ${outputPath} (${buffer.length} bytes)`);
  } catch (err) {
    console.error('Failed to generate docx:', err);
    process.exit(1);
  }
}

main();
