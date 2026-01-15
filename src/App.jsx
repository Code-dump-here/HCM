import { useState, useRef } from "react";
import NameInput from "./components/NameInput";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import { saveGameSession } from "./lib/supabase";

export default function App() {
  const [playerName, setPlayerName] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const savedRef = useRef(false);

  if (!playerName) {
    return <NameInput onStart={setPlayerName} />;
  }

  if (gameResult) {
    return (
      <GameOver
        result={gameResult}
        playerName={playerName}
        onRestart={() => location.reload()}
      />
    );
  }

  return (
    <Game
      onGameOver={(stats, turns, isVictory = false, failedStat = null) => {
        const result = { ...stats, turns, isVictory, failedStat };
        setGameResult(result);
        
        // Save session only once
        if (!savedRef.current) {
          savedRef.current = true;
          saveGameSession({
            playerName,
            isVictory,
            turnsSurvived: turns,
            finalPeople: stats.people,
            finalClass: stats.class,
            finalIdea: stats.idea,
            finalIntl: stats.intl,
            failedStat: failedStat || null
          }).then(response => {
            if (response.success) {
              console.log('Game session saved successfully');
            } else {
              console.error('Failed to save session:', response.error);
            }
          });
        }
      }}
    />
  );
}
