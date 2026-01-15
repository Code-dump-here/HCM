export default function NameInput({ onStart }) {
  const startGame = () => {
    const name = document.getElementById("name").value.trim();
    if (name.length < 2) {
      alert("Vui lòng nhập tên hợp lệ");
      return;
    }
    onStart(name);
  };

  return (
  <div className="card">
    <h2>ĐẠI ĐOÀN KẾT</h2>
    <p className="small">Một trò chơi dựa trên tư tưởng Hồ Chí Minh</p>
    <input id="name" placeholder="Tên của bạn" />
    <button className="agree" onClick={startGame}>
      Bắt đầu
    </button>
  </div>
);

}
