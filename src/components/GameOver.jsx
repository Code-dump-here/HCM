import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  UsersIcon,
  BriefcaseIcon,
  LightBulbIcon,
  GlobeAltIcon,
  TrophyIcon
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Leaderboard from './Leaderboard';

export default function GameOver({ result, playerName, onRestart }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const isVictory = result.isVictory;

  const statConfig = {
    people: { label: 'Đoàn kết dân tộc', icon: UsersIcon, color: '#2E7D32' },
    class: { label: 'Nội bộ vững mạnh', icon: BriefcaseIcon, color: '#1976D2' },
    idea: { label: 'Lý tưởng thống nhất', icon: LightBulbIcon, color: '#FBC02D' },
    intl: { label: 'Đoàn kết quốc tế', icon: GlobeAltIcon, color: '#7B1FA2' }
  };

  const getFailureMessage = () => {
    if (result.people <= 0) {
      return {
        title: "Mất đoàn kết dân tộc",
        message: "\"Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.\" - Bác Hồ. Bạn đã không thể đoàn kết các tầng lớp nhân dân, các dân tộc, tôn giáo. Không có đại đoàn kết, không thể có thắng lợi."
      };
    }
    if (result.class <= 0) {
      return {
        title: "Nội bộ tan rã",
        message: "\"Trong đoàn kết là sức mạnh, ngoài đoàn kết là thất bại.\" Nội bộ công-nông-trí thức tan rã. Khi mất gắn kết nội bộ, cách mạng không thể tiến lên."
      };
    }
    if (result.idea <= 0) {
      return {
        title: "Mất lý tưởng chung",
        message: "\"Không có gì quý hơn độc lập tự do.\" Khi không còn lý tưởng chung, nhân dân sẽ lạc lối. Mục tiêu thống nhất là cội nguồn của mọi đoàn kết."
      };
    }
    if (result.intl <= 0) {
      return {
        title: "Cô lập quốc tế",
        message: "\"Đoàn kết quốc tế là sức mạnh to lớn.\" Một dân tộc nhỏ bé không thể đứng vững nếu cô lập. Cần liên kết với phong trào giải phóng dân tộc và các lực lượng tiến bộ thế giới."
      };
    }
    return {
      title: "Thất bại",
      message: "Đoàn kết toàn dân tộc và quốc tế là nền tảng của mọi thắng lợi."
    };
  };

  const failure = getFailureMessage();

  return (
    <div className="container" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card-panel animate-fade-in-up" style={{ maxWidth: '600px', padding: '3rem', textAlign: 'center', borderTop: isVictory ? '6px solid var(--success)' : '6px solid var(--danger)' }}>

        <div style={{ marginBottom: '2rem' }}>
          {isVictory ? (
            <CheckCircleIcon className="icon-lg" style={{ width: '5rem', height: '5rem', color: 'var(--success)', margin: '0 auto' }} />
          ) : (
            <XCircleIcon className="icon-lg" style={{ width: '5rem', height: '5rem', color: 'var(--danger)', margin: '0 auto' }} />
          )}
          <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '0.5rem', color: isVictory ? 'var(--success)' : 'var(--danger)' }}>
            {isVictory ? "THẮNG LỢI VẺ VANG!" : "CÁCH MẠNG GẶP KHÓ KHĂN"}
          </h2>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)', opacity: 0.8 }}>
            {isVictory ? "Độc lập - Tự do - Hạnh phúc" : failure.title.toUpperCase()}
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.03)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', marginBottom: '2rem', textAlign: 'left' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {Object.entries(statConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon className="icon-sm" style={{ color: config.color }} />
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{config.label}</span>
                  </div>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{result[key]}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span>Tổng số lượt:</span>
            <span style={{ fontWeight: 'bold' }}>{result.turns} / 30</span>
          </div>
        </div>

        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '2.5rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
          {isVictory
            ? "\"Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.\" - Chủ tịch Hồ Chí Minh. Bạn đã thể hiện được tinh thần đoàn kết toàn dân tộc và quốc tế, giữ vững độc lập chủ quyền!"
            : failure.message}
        </p>

        <button
          onClick={onRestart}
          style={{
            background: isVictory ? 'var(--success)' : 'var(--text-main)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1.1rem',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease',
            marginRight: '1rem'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <ArrowPathIcon className="icon-sm" />
          Phát động lại phong trào
        </button>

        <button
          onClick={() => setShowLeaderboard(true)}
          style={{
            background: 'var(--accent-gold)',
            color: '#333',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1.1rem',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <TrophyIcon className="icon-sm" />
          Bảng xếp hạng
        </button>
      </div>

      <AnimatePresence>
        {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}
      </AnimatePresence>
    </div>
  );
}
