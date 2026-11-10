import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get student ID from arguments or prompt
const studentId = (process.argv[2] || 'B122045').trim().toUpperCase();

console.log('==========================================================');
console.log(`📦 IIIT Bhubaneswar - IWT Project Submission Packager`);
console.log(`🎓 Target Student ID: ${studentId}`);
console.log('==========================================================');

const targetFolder = path.join(__dirname, studentId);
const sourceCodeFolder = path.join(targetFolder, 'source_code');
const videoFolder = path.join(targetFolder, 'Video');
const zipFileName = `${studentId}.zip`;
const zipFilePath = path.join(__dirname, zipFileName);

// Clean up existing folders and old zip
if (fs.existsSync(targetFolder)) {
  fs.rmSync(targetFolder, { recursive: true, force: true });
}
if (fs.existsSync(zipFilePath)) {
  fs.unlinkSync(zipFilePath);
}

// Create directories
fs.mkdirSync(sourceCodeFolder, { recursive: true });
fs.mkdirSync(videoFolder, { recursive: true });

console.log('[1/4] Copying root documentation and configuration...');
['package.json', 'README.md', 'PRESENTATION_SCRIPT.md'].forEach(file => {
  const src = path.join(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(sourceCodeFolder, file));
    if (file.endsWith('.md')) {
      fs.copyFileSync(src, path.join(targetFolder, file));
    }
  }
});

// Helper to copy directory recursively excluding node_modules and dist
function copyDirRecursive(src, dest, excludeDirs = ['node_modules', 'dist', '.git']) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (excludeDirs.includes(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath, excludeDirs);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('[2/4] Copying clean server source code...');
copyDirRecursive(path.join(__dirname, 'server'), path.join(sourceCodeFolder, 'server'));

console.log('[3/4] Copying clean client source code...');
copyDirRecursive(path.join(__dirname, 'client'), path.join(sourceCodeFolder, 'client'));

// Create Video instruction note
const videoNote = `===================================================================
10-MINUTE PRESENTATION VIDEO SUBMISSION FOLDER
===================================================================
Student ID: ${studentId}
Project: IIIT Bhubaneswar Mess Management System (IWT Course)

INSTRUCTIONS:
1. Record your 10-minute presentation using the in-app "10-Min Video Guide"
   or follow the PRESENTATION_SCRIPT.md guide.
2. Save your recorded MP4 video in this folder as:
   ${studentId}_Presentation_Video.mp4
3. Verify video length is approximately 10 minutes.
4. Ensure your audio is clear and all key features (Menu, QR Pass, Rebate Desk,
   Billing, Feedback, and Admin Console) are demonstrated.
===================================================================
`;
fs.writeFileSync(path.join(videoFolder, 'INSTRUCTIONS_FOR_VIDEO.txt'), videoNote, 'utf-8');

console.log(`[4/4] Creating zip archive: ${zipFileName}...`);
try {
  // Use native tar.exe (fast zip format support on Windows)
  try {
    execSync(`tar.exe -a -c -f "${zipFileName}" "${studentId}"`, { cwd: __dirname, stdio: 'ignore' });
  } catch (tarErr) {
    // Fallback to PowerShell without progress UI
    const psCmd = `powershell -NoProfile -Command "$ProgressPreference = 'SilentlyContinue'; Compress-Archive -Path '${targetFolder}\\*' -DestinationPath '${zipFilePath}' -Force"`;
    execSync(psCmd, { stdio: 'inherit' });
  }

  const stats = fs.statSync(zipFilePath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

  console.log('==========================================================');
  console.log(`✅ PACKAGING COMPLETED SUCCESSFULLY!`);
  console.log(`📁 Zip File: ${zipFilePath} (${sizeMB} MB)`);
  console.log('==========================================================');
  console.log('SUBMISSION CHECKLIST:');
  console.log('1. Record your 10-minute presentation video.');
  console.log(`2. Place it in the Video folder inside ${zipFileName}.`);
  console.log(`3. Upload ${zipFileName} to your Google Drive.`);
  console.log('4. Set share permission to "Anyone with link can view".');
  console.log('5. Share the Google Drive link and deployed URL in Google Classroom!');
  console.log('==========================================================');
} catch (err) {
  console.error('Error creating zip archive:', err.message);
}
