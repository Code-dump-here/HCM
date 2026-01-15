export default function GameOver({ result, playerName, onRestart }) {
  const isVictory = result.isVictory;
  

  const getFailureMessage = () => {
    if (result.people <= 0) {
      return {
        title: "Mất lòng dân",
        message: "\"Dân là gốc nước. Gốc vững thì nước bền.\" - Bác Hồ. Bạn đã quên rằng sức mạnh của cách mạng xuất phát từ quần chúng nhân dân. Không có sự ủng hộ của nhân dân, không thể có thắng lợi nào."
      };
    }
    if (result.class <= 0) {
      return {
        title: "Giai cấp suy yếu",
        message: "\"Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.\" Giai cấp công nhân và nông dân là nền tảng của cách mạng. Thiếu đoàn kết giai cấp, đất nước sẽ suy yếu."
      };
    }
    if (result.idea <= 0) {
      return {
        title: "Tư tưởng lung lay",
        message: "\"Không có gì quý hơn độc lập tự do.\" Tư tưởng là kim chỉ nam cho hành động. Khi mất phương hướng tư tưởng, cách mạng sẽ lạc lối và thất bại."
      };
    }
    if (result.intl <= 0) {
      return {
        title: "Cô lập quốc tế",
        message: "\"Đoàn kết quốc tế là sức mạnh to lớn.\" Một đất nước cô lập không thể đứng vững. Cần có sự hợp tác và đoàn kết với các lực lượng tiến bộ trên thế giới."
      };
    }
    return {
      title: "Thất bại",
      message: "Đoàn kết toàn dân là nền tảng của mọi thắng lợi."
    };
  };
  
  const failure = getFailureMessage();
  
  return (
  <div className="card">
    <h3>{isVictory ? "🎉 CHIẾN THẮNG!" : `❌ ${failure.title.toUpperCase()}`}</h3>

    <p className="small">Số lượt chơi: {result.turns}</p>

    <div className="stats">
      <div className="stat"><span>👥 Nhân dân</span><span>{result.people}</span></div>
      <div className="stat"><span>🏛 Giai cấp</span><span>{result.class}</span></div>
      <div className="stat"><span>🧠 Tư tưởng</span><span>{result.idea}</span></div>
      <div className="stat"><span>🌍 Quốc tế</span><span>{result.intl}</span></div>
    </div>

    <div className="divider" />

    <p className="small">
      {isVictory 
        ? "\"Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.\" - Chủ tịch Hồ Chí Minh. Bạn đã thể hiện được tinh thần đoàn kết toàn dân tộc và quốc tế, là nền tảng của mọi thắng lợi!"
        : failure.message}
    </p>

    <button className="agree" onClick={onRestart}>
      Chơi lại
    </button>
  </div>
);

}
