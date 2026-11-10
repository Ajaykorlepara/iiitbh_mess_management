import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import tokenRoutes from './routes/tokens.js';
import rebateRoutes from './routes/rebates.js';
import feedbackRoutes from './routes/feedback.js';
import billRoutes from './routes/bills.js';
import noticeRoutes from './routes/notices.js';
import inventoryRoutes from './routes/inventory.js';
import pollRoutes from './routes/polls.js';
import statsRoutes from './routes/stats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/rebates', rebateRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/stats', statsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'IIIT Bhubaneswar Mess Management System API',
    institution: 'International Institute of Information Technology, Bhubaneswar',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build in production or when dist exists
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send(`
        <html>
          <body style="font-family:sans-serif; text-align:center; padding:50px;">
            <h2>IIIT Bhubaneswar - Mess Management API Server</h2>
            <p>API is active on port ${PORT}. Run <code>npm run build</code> to compile frontend static assets.</p>
            <p><a href="/api/health">Check API Health</a></p>
          </body>
        </html>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🍛 IIIT Bhubaneswar Mess Management Server Started!`);
  console.log(`📡 API running at: http://localhost:${PORT}`);
  console.log(`🎓 Ready for IWT Academic Evaluation`);
  console.log(`=======================================================`);
});
