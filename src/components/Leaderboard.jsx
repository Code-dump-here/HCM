import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { getLeaderboard } from '../lib/supabase';

export default function Leaderboard({ onClose }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [filter]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    const result = await getLeaderboard(filter, 15);
    if (result.success) {
      setLeaderboard(result.data);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="card-panel"
        style={{
          width: '100%',
          maxWidth: '700px',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          <XMarkIcon style={{ width: '24px', height: '24px', color: 'var(--text-muted)' }} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <TrophyIcon style={{ width: '32px', height: '32px', color: 'var(--accent-gold)' }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary-red)', margin: 0 }}>
            BẢNG XẾP HẠNG
          </h2>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'victories', label: 'Chiến thắng' },
            { id: 'defeats', label: 'Thất bại' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: filter === f.id ? 'var(--primary-red)' : 'rgba(0,0,0,0.05)',
                color: filter === f.id ? 'white' : 'var(--text-main)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Leaderboard Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            Đang tải...
          </div>
        ) : leaderboard.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            Chưa có dữ liệu
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {leaderboard.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr auto auto',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '1rem',
                  background: idx < 3 
                    ? `linear-gradient(135deg, ${
                        idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : '#CD7F32'
                      }, rgba(255,255,255,0.8))` 
                    : 'rgba(0,0,0,0.03)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: entry.is_victory ? '4px solid var(--success)' : '4px solid var(--danger)'
                }}
              >
                <div style={{ 
                  fontSize: idx < 3 ? '1.2rem' : '1rem', 
                  fontWeight: '700',
                  color: idx < 3 ? '#333' : 'var(--text-muted)',
                  textAlign: 'center'
                }}>
                  {idx < 3 ? ['🥇', '🥈', '🥉'][idx] : `#${idx + 1}`}
                </div>

                <div>
                  <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>
                    {entry.player_name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {entry.is_victory ? '✓ Chiến thắng' : `✗ ${entry.failed_stat || 'Thất bại'}`}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-red)' }}>
                    {entry.turns_survived}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    lượt
                  </div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  minWidth: '120px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-muted)' }}>Dân</div>
                    <div style={{ fontWeight: '600' }}>{entry.final_people}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-muted)' }}>Giai</div>
                    <div style={{ fontWeight: '600' }}>{entry.final_class}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-muted)' }}>Tư</div>
                    <div style={{ fontWeight: '600' }}>{entry.final_idea}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-muted)' }}>Quốc</div>
                    <div style={{ fontWeight: '600' }}>{entry.final_intl}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem',
          background: 'rgba(0,0,0,0.03)',
          borderRadius: 'var(--radius-sm)',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          Dữ liệu cập nhật tự động từ tất cả người chơi
        </div>
      </motion.div>
    </motion.div>
  );
}
