import { useState, useRef, useEffect } from "react";
import { regularCards, turnBasedEvents, thresholdEvents } from "../data/cards";

const clamp = (v) => Math.max(0, Math.min(100, v));

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
    people: 0,
    class: 0,
    idea: 0,
    intl: 0
  });
  const [pendingPenaltyWarning, setPendingPenaltyWarning] = useState(null);
  const [card, setCard] = useState(
    regularCards[Math.floor(Math.random() * regularCards.length)]
  );

  const [tilt, setTilt] = useState("");
  const [flying, setFlying] = useState("");
  const startX = useRef(null);

  // Format stat change for display
  const formatChange = (value) => {
    if (value >= 11) return '+++';
    if (value >= 6) return '++';
    if (value > 0) return '+';
    if (value <= -11) return '---';
    if (value <= -6) return '--';
    if (value < 0) return '-';
    return '○';
  };

  // Get color for stat change
  const getChangeColor = (value) => {
    if (value > 0) return '#2ecc71';
    if (value < 0) return '#e74c3c';
    return '#999';
  };

  // Apply stat decay - all stats naturally decrease over time
  const applyStatDecay = (currentStats, penalties) => {
    const decayed = { ...currentStats };
    
    // Each stat decays by 2-3 points per turn + permanent penalties
    decayed.people = clamp(decayed.people - 2 + penalties.people);
    decayed.class = clamp(decayed.class - 2 + penalties.class);
    decayed.idea = clamp(decayed.idea - 2 + penalties.idea);
    decayed.intl = clamp(decayed.intl - 3 + penalties.intl);
    
    return decayed;
  };

  // Apply linked stat penalties when stats get too extreme
  const applyLinkedPenalties = (currentStats) => {
    const penalized = { ...currentStats };
    
    // High Class (>75) causes People to suffer (elitism)
    if (penalized.class > 75) {
      penalized.people = clamp(penalized.people - 3);
    }
    
    // High Idea (>75) with low People (<30) causes discontent
    if (penalized.idea > 75 && penalized.people < 30) {
      penalized.people = clamp(penalized.people - 5);
      penalized.class = clamp(penalized.class - 3);
    }
    
    // High International (>75) with low Class (<30) = foreign dependency
    if (penalized.intl > 75 && penalized.class < 30) {
      penalized.class = clamp(penalized.class - 4);
      penalized.idea = clamp(penalized.idea - 3);
    }
    
    // High People (>75) with low Idea (<30) = populism without direction
    if (penalized.people > 75 && penalized.idea < 30) {
      penalized.idea = clamp(penalized.idea - 4);
      penalized.class = clamp(penalized.class - 3);
    }
    
    // Very extreme stats (>85) cause additional decay
    if (penalized.people > 85) penalized.people = clamp(penalized.people - 2);
    if (penalized.class > 85) penalized.class = clamp(penalized.class - 2);
    if (penalized.idea > 85) penalized.idea = clamp(penalized.idea - 2);
    if (penalized.intl > 85) penalized.intl = clamp(penalized.intl - 2);
    
    return penalized;
  };

  // Check for critical thresholds and apply permanent penalties
  const checkCriticalThresholds = (currentStats, currentPenalties) => {
    const newPenalties = { ...currentPenalties };
    const triggeredStats = [];
    
    // Critical low thresholds (<=15) - permanent -1 per turn penalty
    if (currentStats.people <= 15 && newPenalties.people === 0) {
      newPenalties.people = -1;
      triggeredStats.push('👥 Nhân dân');
    }
    if (currentStats.class <= 15 && newPenalties.class === 0) {
      newPenalties.class = -1;
      triggeredStats.push('🏛 Giai cấp');
    }
    if (currentStats.idea <= 15 && newPenalties.idea === 0) {
      newPenalties.idea = -1;
      triggeredStats.push('🧠 Tư tưởng');
    }
    if (currentStats.intl <= 15 && newPenalties.intl === 0) {
      newPenalties.intl = -1;
      triggeredStats.push('🌍 Quốc tế');
    }
    
    return { penalties: newPenalties, triggered: triggeredStats };
  };

  const getNextCard = (currentTurns, currentStats, alreadyTriggered) => {
    // Check for turn-based events first
    const turnEvent = turnBasedEvents.find(e => e.turn === currentTurns + 1);
    if (turnEvent) {
      return turnEvent;
    }

    // Check for threshold events that haven't been triggered yet
    for (const event of thresholdEvents) {
      if (!alreadyTriggered.has(event.id) && event.condition(currentStats)) {
        return { ...event, isThresholdEvent: true };
      }
    }

    // Return random regular card
    return regularCards[Math.floor(Math.random() * regularCards.length)];
  };

  const resolveChoice = (agree) => {
    if (flying) return; // Prevent interaction during animation

    // If this is a penalty warning card, just continue to next card without incrementing turn
    if (card.isPenaltyWarning) {
      setFlying(agree ? "flying-right" : "flying-left");
      setTimeout(() => {
        setPendingPenaltyWarning(null);
        setCard(getNextCard(turns, stats, triggeredEvents));
        setFlying("");
      }, 500);
      return;
    }

    const effects = agree ? card.yes : card.no;
    const newStats = { ...stats };

    for (const key in effects) {
      newStats[key] = clamp(newStats[key] + effects[key]);
      if (newStats[key] <= 0) {
        setFlying(agree ? "flying-right" : "flying-left");
        setTimeout(() => {
          onGameOver(newStats, turns, false, key); // Pass failedStat
        }, 500);
        return;
      }
    }

    setFlying(agree ? "flying-right" : "flying-left");
    setTilt("");

    setTimeout(() => {
      const newTurns = turns + 1;
      const newTriggered = new Set(triggeredEvents);
      
      // Check if player won by surviving to turn 30
      if (newTurns >= 30) {
        onGameOver(newStats, newTurns, true); // Pass true for victory
        return;
      }
      
      // Mark threshold event as triggered
      if (card.isThresholdEvent) {
        newTriggered.add(card.id);
        setTriggeredEvents(newTriggered);
      }
      
      // Check for critical thresholds and update permanent penalties
      const { penalties: updatedPenalties, triggered: triggeredStats } = checkCriticalThresholds(newStats, permanentPenalties);
      setPermanentPenalties(updatedPenalties);
      
      // Apply stat decay and linked penalties
      let finalStats = applyStatDecay(newStats, updatedPenalties);
      finalStats = applyLinkedPenalties(finalStats);
      
      // Check if any stat reached 0 after decay
      if (finalStats.people <= 0 || finalStats.class <= 0 || 
          finalStats.idea <= 0 || finalStats.intl <= 0) {
        setStats(finalStats);
        const failedStat = finalStats.people <= 0 ? 'people' :
                          finalStats.class <= 0 ? 'class' :
                          finalStats.idea <= 0 ? 'idea' : 'intl';
        setTimeout(() => {
          onGameOver(finalStats, newTurns, false, failedStat);
        }, 300);
        return;
      }
      
      setStats(finalStats);
      setTurns(newTurns);
      
      // If permanent penalties were triggered, show warning card first
      if (triggeredStats.length > 0) {
        setCard({
          isPenaltyWarning: true,
          faction: "⚠️ Cảnh báo",
          text: `${triggeredStats.join(', ')} đã đạt ngưỡng nguy hiểm! Bạn nhận phạt phạt vĩnh viễn: -1 điểm mỗi lượt.`,
          yes: { people: 0, class: 0, idea: 0, intl: 0 },
          no: { people: 0, class: 0, idea: 0, intl: 0 }
        });
      } else {
        setCard(getNextCard(newTurns, finalStats, newTriggered));
      }
      
      setFlying("");
    }, 500);
  };

  const onPointerDown = (e) => {
    startX.current = e.clientX;
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (startX.current === null) return;
      const diff = e.clientX - startX.current;

      if (diff > 40) setTilt("tilt-right");
      else if (diff < -40) setTilt("tilt-left");
      else setTilt("");
    };

    const handleUp = (e) => {
      if (startX.current === null) return;
      const diff = e.clientX - startX.current;

      if (diff > 80) resolveChoice(true);
      else if (diff < -80) resolveChoice(false);

      startX.current = null;
      setTilt("");
    };

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);

    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
    };
  }, [card, stats, turns, triggeredEvents, flying]);

  return (
    <div className="game-container">
      <div className="stats-panel">
        <div className="turn-counter" style={{ '--progress': `${(turns / 30) * 100}%` }}>
          <span>Lượt {turns}/30</span>
        </div>
        
        {/* Upcoming event warning */}
        {[5, 10, 15, 20, 25].includes(turns + 1) && (
          <div className="event-warning">
            ⚠️ Sự kiện đặc biệt lượt {turns + 1}
          </div>
        )}
        
        <div className="stats">
          <div className="stat">
            <div className="stat-label">
              <span>👥 Nhân dân</span>
              <span className={`stat-value ${stats.people <= 15 ? 'critical' : stats.people >= 80 ? 'excellent' : ''}`}>
                {stats.people}{permanentPenalties.people > 0 && <span className="penalty">-{permanentPenalties.people}</span>}
              </span>
            </div>
            <div className="stat-bar">
              <div 
                className={`stat-fill ${stats.people <= 15 ? 'critical' : stats.people >= 80 ? 'excellent' : ''}`}
                style={{ width: `${stats.people}%` }}
              />
            </div>
          </div>
          <div className="stat">
            <div className="stat-label">
              <span>🏛 Giai cấp</span>
              <span className={`stat-value ${stats.class <= 15 ? 'critical' : stats.class >= 80 ? 'excellent' : ''}`}>
                {stats.class}{permanentPenalties.class > 0 && <span className="penalty">-{permanentPenalties.class}</span>}
              </span>
            </div>
            <div className="stat-bar">
              <div 
                className={`stat-fill ${stats.class <= 15 ? 'critical' : stats.class >= 80 ? 'excellent' : ''}`}
                style={{ width: `${stats.class}%` }}
              />
            </div>
          </div>
          <div className="stat">
            <div className="stat-label">
              <span>🧠 Tư tưởng</span>
              <span className={`stat-value ${stats.idea <= 15 ? 'critical' : stats.idea >= 80 ? 'excellent' : ''}`}>
                {stats.idea}{permanentPenalties.idea > 0 && <span className="penalty">-{permanentPenalties.idea}</span>}
              </span>
            </div>
            <div className="stat-bar">
              <div 
                className={`stat-fill ${stats.idea <= 15 ? 'critical' : stats.idea >= 80 ? 'excellent' : ''}`}
                style={{ width: `${stats.idea}%` }}
              />
            </div>
          </div>
          <div className="stat">
            <div className="stat-label">
              <span>🌍 Quốc tế</span>
              <span className={`stat-value ${stats.intl <= 15 ? 'critical' : stats.intl >= 80 ? 'excellent' : ''}`}>
                {stats.intl}{permanentPenalties.intl > 0 && <span className="penalty">-{permanentPenalties.intl}</span>}
              </span>
            </div>
            <div className="stat-bar">
              <div 
                className={`stat-fill ${stats.intl <= 15 ? 'critical' : stats.intl >= 80 ? 'excellent' : ''}`}
                style={{ width: `${stats.intl}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Decay info */}
        <div className="decay-info">
          📉 Suy giảm: -2/-2/-2/-3 mỗi lượt
        </div>
      </div>

      <div
        className={`card ${tilt} ${flying}`}
        onPointerDown={onPointerDown}
      >
        <div className="faction">{card.faction}</div>
        <div className="text">{card.text}</div>

        <div className="effects-preview">
          <div className="effect-column left-effect">
            <div className="effect-label">← Từ chối</div>
            <div className="effect-changes">
              <span style={{ color: getChangeColor(card.no.people) }}>
                👥 {formatChange(card.no.people)}
              </span>
              <span style={{ color: getChangeColor(card.no.class) }}>
                🏛 {formatChange(card.no.class)}
              </span>
              <span style={{ color: getChangeColor(card.no.idea) }}>
                🧠 {formatChange(card.no.idea)}
              </span>
              <span style={{ color: getChangeColor(card.no.intl) }}>
                🌍 {formatChange(card.no.intl)}
              </span>
            </div>
          </div>
          
          <div className="effect-column right-effect">
            <div className="effect-label">Đồng ý →</div>
            <div className="effect-changes">
              <span style={{ color: getChangeColor(card.yes.people) }}>
                👥 {formatChange(card.yes.people)}
              </span>
              <span style={{ color: getChangeColor(card.yes.class) }}>
                🏛 {formatChange(card.yes.class)}
              </span>
              <span style={{ color: getChangeColor(card.yes.idea) }}>
                🧠 {formatChange(card.yes.idea)}
              </span>
              <span style={{ color: getChangeColor(card.yes.intl) }}>
                🌍 {formatChange(card.yes.intl)}
              </span>
            </div>
          </div>
        </div>

        <div className="choice-hint">
          <div
          className="triangle left"
          onDoubleClick={() => resolveChoice(false)}/>
          <div
          className="triangle right"
          onDoubleClick={() => resolveChoice(true)}/>
        </div>

        <p className="small">
          Kéo sang phải để đồng ý • Kéo sang trái để từ chối
          Nhấn đúp vào góc để chọn nhanh
        </p>
      </div>
    </div>
  );
}
