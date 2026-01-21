import { useState, useRef, useEffect } from "react";
import { regularCards, turnBasedEvents, thresholdEvents } from "../data/cards";
import {
  UsersIcon,
  BriefcaseIcon,
  LightBulbIcon,
  GlobeAltIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon
} from '@heroicons/react/24/solid';
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

const clamp = (v) => Math.max(0, Math.min(100, v));

// Stats Config with educational descriptions
const statConfig = {
  people: { 
    label: 'Nhân dân', 
    icon: UsersIcon, 
    color: '#2E7D32',
    desc: 'Ủng hộ của quần chúng nhân dân. "Dân là gốc nước" - không thể cách mạng mà thiếu dân.'
  },
  class: { 
    label: 'Giai cấp', 
    icon: BriefcaseIcon, 
    color: '#1976D2',
    desc: 'Sức mạnh công nhân-nông dân. Lực lượng nòng cốt của cách mạng Việt Nam.'
  },
  idea: { 
    label: 'Tư tưởng', 
    icon: LightBulbIcon, 
    color: '#FBC02D',
    desc: 'Nhận thức chính trị và tư tưởng Mác-Lênin. Kim chỉ nam cho mọi hành động.'
  },
  intl: { 
    label: 'Quốc tế', 
    icon: GlobeAltIcon, 
    color: '#7B1FA2',
    desc: 'Quan hệ và ủng hộ quốc tế. "Chủ nghĩa quốc tế là sức mạnh to lớn."'
  }
};

const getChangeColor = (value) => {
  if (value > 0) return 'var(--success)';
  if (value < 0) return 'var(--danger)';
  return 'var(--text-muted)';
};

const formatChange = (value) => {
  if (value > 0) return `+${value}`;
  return value;
};

// Achievement Definitions
const achievementDefs = [
  {
    id: 'pacifist',
    name: 'Hòa bình',
    desc: 'Không tổng động viên chiến tranh ở lượt 20',
    icon: '🕊️'
  },
  {
    id: 'peoples_champion',
    name: 'Người của dân',
    desc: 'Giữ Nhân dân trên 70 đến lượt 15',
    icon: '👥'
  },
  {
    id: 'balanced_leader',
    name: 'Lãnh đạo cân bằng',
    desc: 'Tất cả chỉ số trong khoảng 10 điểm ở lượt 15',
    icon: '⚖️'
  },
  {
    id: 'survivor',
    name: 'Người sống sót',
    desc: 'Sống sót đến lượt 25',
    icon: '🎖️'
  },
  {
    id: 'ideologist',
    name: 'Nhà tư tưởng',
    desc: 'Giữ Tư tưởng trên 80 đến lượt 20',
    icon: '💡'
  }
];

// Extracted Card Component to ensure fresh motion state for every card
function DraggableCard({ card, onChoice }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacityYes = useTransform(x, [50, 150], [0, 1]);
  const opacityNo = useTransform(x, [-50, -150], [0, 1]);

  const background = useTransform(
    x,
    [-200, 0, 200],
    ["rgba(255, 0, 0, 0.05)", "rgba(255, 255, 255, 0.85)", "rgba(0, 255, 0, 0.05)"]
  );

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onChoice(true);
    } else if (info.offset.x < -threshold) {
      onChoice(false);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      style={{
        x,
        rotate,
        background,
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: 'grab',
        zIndex: 10
      }}
      initial={{ scale: 0.9, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{
        x: x.get() < 0 ? -500 : 500,
        opacity: 0,
        rotate: x.get() < 0 ? -45 : 45,
        transition: { duration: 0.3 }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="card-panel"
    >
      <div style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          marginBottom: '2rem',
          borderBottom: '2px solid var(--accent-gold)',
          paddingBottom: '0.5rem',
          textAlign: 'center',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          {card.icon && <card.icon style={{ width: '1.25rem', height: '1.25rem' }} />}
          <span>{card.faction}</span>
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          fontWeight: '600',
          textAlign: 'center',
          lineHeight: '1.5',
          color: 'var(--text-main)',
          pointerEvents: 'none'
        }}>
          "{card.text}"
        </div>

        {/* SWIPE OVERLAYS - CORRECTED ROTATION */}
        <motion.div style={{
          position: 'absolute', top: '2rem', right: '2rem', opacity: opacityYes,
          border: '4px solid var(--success)', color: 'var(--success)',
          padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: '800', fontSize: '1.5rem', transform: 'rotate(15deg)'
        }}>
          ĐỒNG Ý
        </motion.div>
        <motion.div style={{
          position: 'absolute', top: '2rem', left: '2rem', opacity: opacityNo,
          border: '4px solid var(--danger)', color: 'var(--danger)',
          padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: '800', fontSize: '1.5rem', transform: 'rotate(-15deg)'
        }}>
          TỪ CHỐI
        </motion.div>

        <div style={{ marginTop: '2rem', pointerEvents: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span>TỪ CHỐI</span>
            <span>ĐỒNG Ý</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ textAlign: 'left' }}>
              {Object.entries(card.no).map(([k, v]) => v !== 0 && (
                <div key={k} style={{ color: getChangeColor(v), fontSize: '0.9rem', marginBottom: '4px' }}>
                  {formatChange(v)} {statConfig[k].label}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'right' }}>
              {Object.entries(card.yes).map(([k, v]) => v !== 0 && (
                <div key={k} style={{ color: getChangeColor(v), fontSize: '0.9rem', marginBottom: '4px' }}>
                  {formatChange(v)} {statConfig[k].label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)', opacity: 0.6 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <HandThumbDownIcon className="icon-sm" />
            <span>Kéo để chọn</span>
            <HandThumbUpIcon className="icon-sm" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Game({ onGameOver }) {
  const [stats, setStats] = useState({
    people: 50,
    class: 50,
    idea: 50,
    intl: 50
  });

  const [turns, setTurns] = useState(0);
  const [triggeredEvents, setTriggeredEvents] = useState(new Set());
  const [permanentPenalties, setPermanentPenalties] = useState({
    people: 0, class: 0, idea: 0, intl: 0
  });
  const [pendingPenaltyWarning, setPendingPenaltyWarning] = useState(null);
  
  // New: Decision history, feedback, achievements
  const [decisionHistory, setDecisionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [achievements, setAchievements] = useState([]);

  // Ensure card has a unique key for AnimatePresence
  const [card, setCard] = useState({
    ...regularCards[Math.floor(Math.random() * regularCards.length)],
    uniqueId: Math.random().toString()
  });

  // Logic Helpers (Identical to before)
  const applyStatDecay = (currentStats, penalties) => {
    const decayed = { ...currentStats };
    decayed.people = clamp(decayed.people - 2 + penalties.people);
    decayed.class = clamp(decayed.class - 2 + penalties.class);
    decayed.idea = clamp(decayed.idea - 2 + penalties.idea);
    decayed.intl = clamp(decayed.intl - 3 + penalties.intl);
    return decayed;
  };

  const applyLinkedPenalties = (currentStats) => {
    const penalized = { ...currentStats };
    if (penalized.class > 75) penalized.people = clamp(penalized.people - 3);
    if (penalized.idea > 75 && penalized.people < 30) {
      penalized.people = clamp(penalized.people - 5);
      penalized.class = clamp(penalized.class - 3);
    }
    if (penalized.intl > 75 && penalized.class < 30) {
      penalized.class = clamp(penalized.class - 4);
      penalized.idea = clamp(penalized.idea - 3);
    }
    if (penalized.people > 75 && penalized.idea < 30) {
      penalized.idea = clamp(penalized.idea - 4);
      penalized.class = clamp(penalized.class - 3);
    }
    if (penalized.people > 85) penalized.people = clamp(penalized.people - 2);
    if (penalized.class > 85) penalized.class = clamp(penalized.class - 2);
    if (penalized.idea > 85) penalized.idea = clamp(penalized.idea - 2);
    if (penalized.intl > 85) penalized.intl = clamp(penalized.intl - 2);
    return penalized;
  };

  const checkCriticalThresholds = (currentStats, currentPenalties) => {
    const newPenalties = { ...currentPenalties };
    const triggeredStats = [];
    Object.keys(statConfig).forEach(key => {
      if (currentStats[key] <= 15 && newPenalties[key] === 0) {
        newPenalties[key] = -1;
        triggeredStats.push(statConfig[key].label);
      }
    });
    return { penalties: newPenalties, triggered: triggeredStats };
  };

  const getNextCard = (currentTurns, currentStats, alreadyTriggered) => {
    const turnEvent = turnBasedEvents.find(e => e.turn === currentTurns + 1);
    if (turnEvent) return { ...turnEvent, uniqueId: Math.random().toString() };

    for (const event of thresholdEvents) {
      if (!alreadyTriggered.has(event.id) && event.condition(currentStats)) {
        return { ...event, isThresholdEvent: true, uniqueId: Math.random().toString() };
      }
    }
    return {
      ...regularCards[Math.floor(Math.random() * regularCards.length)],
      uniqueId: Math.random().toString()
    };
  };

  // Check and unlock achievements
  const checkAchievements = (currentStats, currentTurns) => {
    const newAchievements = [...achievements];
    
    if (currentTurns === 20 && !achievements.includes('pacifist') && card.turn !== 20) {
      newAchievements.push('pacifist');
    }
    if (currentTurns === 15 && currentStats.people >= 70 && !achievements.includes('peoples_champion')) {
      newAchievements.push('peoples_champion');
    }
    if (currentTurns === 15 && !achievements.includes('balanced_leader')) {
      const values = Object.values(currentStats);
      const max = Math.max(...values);
      const min = Math.min(...values);
      if (max - min <= 10) {
        newAchievements.push('balanced_leader');
      }
    }
    if (currentTurns === 25 && !achievements.includes('survivor')) {
      newAchievements.push('survivor');
    }
    if (currentTurns === 20 && currentStats.idea >= 80 && !achievements.includes('ideologist')) {
      newAchievements.push('ideologist');
    }
    
    if (newAchievements.length > achievements.length) {
      setAchievements(newAchievements);
    }
  };

  // Main Logic to Apply Choice
  // Main Logic to Apply Choice
  const handleChoice = (agree) => {
    // 1. Check Penalty Warning
    if (card.isPenaltyWarning) {
      setPendingPenaltyWarning(null);
      setCard(getNextCard(turns, stats, triggeredEvents));
      return;
    }

    // 2. Calculate Stats
    const effects = agree ? card.yes : card.no;
    const newStats = { ...stats };
    let failedStatKey = null;

    for (const key in effects) {
      newStats[key] = clamp(newStats[key] + effects[key]);
      if (newStats[key] <= 0) failedStatKey = key;
    }

    // Immediate failure check
    if (failedStatKey) {
      onGameOver(newStats, turns, false, failedStatKey);
      return;
    }

    // 3. Update Game State (Turns, Decay, etc.)
    const newTurns = turns + 1;
    const newTriggered = new Set(triggeredEvents);

    if (newTurns >= 30) {
      onGameOver(newStats, newTurns, true);
      return;
    }

    if (card.isThresholdEvent) {
      newTriggered.add(card.id);
      setTriggeredEvents(newTriggered);
    }

    const { penalties: updatedPenalties, triggered: triggeredStats } = checkCriticalThresholds(newStats, permanentPenalties);
    setPermanentPenalties(updatedPenalties);

    let finalStats = applyStatDecay(newStats, updatedPenalties);
    finalStats = applyLinkedPenalties(finalStats);

    // Check death after decay
    const deadStat = Object.keys(finalStats).find(k => finalStats[k] <= 0);
    if (deadStat) {
      setStats(finalStats);
      setTimeout(() => onGameOver(finalStats, newTurns, false, deadStat), 300);
      return;
    }

    setStats(finalStats);
    setTurns(newTurns);

    // Track decision history
    const decision = {
      turn: newTurns,
      card: card.faction,
      choice: agree ? 'Đồng ý' : 'Từ chối',
      effects,
      oldStats: stats,
      newStats: finalStats
    };
    setDecisionHistory(prev => [decision, ...prev].slice(0, 10)); // Keep last 10
    
    // Show feedback screen
    setFeedback({
      choice: agree ? 'Đồng ý' : 'Từ chối',
      effects,
      card: card.faction,
      statChanges: Object.keys(effects).map(k => ({
        stat: statConfig[k].label,
        change: effects[k],
        from: stats[k],
        to: finalStats[k]
      }))
    });
    
    // Check achievements
    checkAchievements(finalStats, newTurns);

    // Hide feedback after 2 seconds
    setTimeout(() => setFeedback(null), 2000);

    // 4. Set Next Card
    if (triggeredStats.length > 0) {
      setCard({
        isPenaltyWarning: true,
        faction: "⚠️ Cảnh báo",
        text: `${triggeredStats.join(', ')} đã đạt ngưỡng nguy hiểm! Bạn nhận phạt vĩnh viễn: -1 điểm mỗi lượt.`,
        yes: { people: 0, class: 0, idea: 0, intl: 0 },
        no: { people: 0, class: 0, idea: 0, intl: 0 },
        uniqueId: Math.random().toString()
      });
    } else {
      setCard(getNextCard(newTurns, finalStats, newTriggered));
    }
  };

  return (
    <div className="container" style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(300px, 1fr) minmax(350px, 450px)',
      gap: '4rem',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>

      {/* LEFT: Stats Panel */}
      <div className="card-panel" style={{
        padding: '2rem',
        height: '600px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', background: 'var(--primary-red)', padding: '1rem', borderRadius: 'var(--radius-sm)', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ClockIcon className="icon-md" />
            <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Lượt {turns}/30</span>
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Năm {1911 + turns}</div>
        </div>

        {[5, 10, 15, 20, 25].includes(turns + 1) && (
          <div className="event-warning" style={{ marginBottom: '1.5rem' }}>
            <ExclamationTriangleIcon className="icon-sm" style={{ display: 'inline', marginRight: 4 }} /> Sự kiện sắp tới
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {Object.entries(statConfig).map(([key, config]) => {
            const Icon = config.icon;
            const val = stats[key];
            const pen = permanentPenalties[key];

            return (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: val <= 15 ? 'var(--danger)' : 'var(--text-main)' }}>
                    <Icon className="icon-sm" />
                    {config.label}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {pen < 0 && <span style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>{pen}</span>}
                    <span>{val}</span>
                  </div>
                </div>
                <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${val}%`,
                    height: '100%',
                    background: val <= 15 ? 'var(--danger)' : config.color,
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 'auto', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          "Dĩ bất biến, ứng vạn biến"
        </div>
      </div>

      {/* CENTER: Main Card Area */}
      <div style={{
        height: '600px',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AnimatePresence mode="wait">
          <DraggableCard
            key={card.uniqueId}
            card={card}
            onChoice={handleChoice}
          />
        </AnimatePresence>

        {/* Feedback Screen Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                zIndex: 100,
                minWidth: '300px',
                border: '3px solid var(--accent-gold)'
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', textAlign: 'center', color: 'var(--primary-red)' }}>
                {feedback.choice === 'yes' ? '✓ ĐỒNG Ý' : '✗ TỪ CHỐI'}
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center', fontStyle: 'italic' }}>
                "{feedback.cardTitle}"
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {Object.entries(feedback.changes).map(([key, value]) => value !== 0 && (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                    <span>{statConfig[key].label}</span>
                    <span style={{ color: value > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: '700' }}>
                      {value > 0 ? '+' : ''}{value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decision History Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowHistory(!showHistory)}
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            background: 'var(--primary-red)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: 50
          }}
        >
          <ClockIcon className="icon-sm" />
          LỊCH SỬ ({decisionHistory.length})
        </motion.button>

        {/* Decision History Panel */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              style={{
                position: 'absolute',
                top: 0,
                right: '-350px',
                width: '320px',
                height: '100%',
                background: 'white',
                borderRadius: 'var(--radius-md)',
                boxShadow: '-5px 0 20px rgba(0,0,0,0.1)',
                padding: '1.5rem',
                overflowY: 'auto',
                zIndex: 60
              }}
            >
              <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary-red)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ClockIcon className="icon-sm" />
                LỊCH SỬ QUYẾT ĐỊNH
              </div>
              {decisionHistory.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem' }}>
                  Chưa có quyết định nào
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[...decisionHistory].reverse().map((decision, idx) => (
                    <div key={idx} style={{
                      padding: '1rem',
                      background: 'rgba(0,0,0,0.03)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: `4px solid ${decision.choice === 'yes' ? 'var(--success)' : 'var(--danger)'}`
                    }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        Lượt {decision.turn}
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        {decision.choice === 'yes' ? '✓' : '✗'} {decision.cardTitle}
                      </div>
                      <div style={{ fontSize: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {Object.entries(decision.changes).map(([key, value]) => value !== 0 && (
                          <span key={key} style={{ color: value > 0 ? 'var(--success)' : 'var(--danger)' }}>
                            {statConfig[key].label}: {value > 0 ? '+' : ''}{value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Achievement Notification */}
        <AnimatePresence>
          {achievements.length > 0 && achievements[achievements.length - 1] && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'absolute',
                top: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, var(--accent-gold), #FFE55C)',
                color: '#333',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.95rem',
                fontWeight: '700',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                zIndex: 150,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>
                {achievementDefs.find(a => a.id === achievements[achievements.length - 1])?.icon}
              </span>
              <div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>THÀNH TỰU MỚI</div>
                <div>{achievementDefs.find(a => a.id === achievements[achievements.length - 1])?.name}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Achievements Panel */}
      <div className="card-panel" style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        padding: '1rem 1.5rem',
        maxWidth: '250px',
        zIndex: 40
      }}>
        <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--primary-red)' }}>
          🏆 THÀNH TỰU ({achievements.length}/{achievementDefs.length})
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {achievementDefs.map(achievement => {
            const unlocked = achievements.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                title={`${achievement.name}: ${achievement.desc}`}
                style={{
                  fontSize: '1.5rem',
                  opacity: unlocked ? 1 : 0.3,
                  filter: unlocked ? 'none' : 'grayscale(100%)',
                  cursor: 'help'
                }}
              >
                {achievement.icon}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
