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

// Stats Config
const statConfig = {
  people: { label: 'Nhân dân', icon: UsersIcon, color: '#2E7D32' },
  class: { label: 'Giai cấp', icon: BriefcaseIcon, color: '#1976D2' },
  idea: { label: 'Tư tưởng', icon: LightBulbIcon, color: '#FBC02D' },
  intl: { label: 'Quốc tế', icon: GlobeAltIcon, color: '#7B1FA2' }
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
      </div>

    </div>
  );
}
