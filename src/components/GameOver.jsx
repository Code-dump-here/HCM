import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  UsersIcon,
  BriefcaseIcon,
  LightBulbIcon,
  GlobeAltIcon
} from '@heroicons/react/24/solid';

export default function GameOver({ result, playerName, onRestart }) {
  const isVictory = result.isVictory;

  const statConfig = {
    people: { label: 'Nhân dân', icon: UsersIcon, color: '#2E7D32' },
    class: { label: 'Giai cấp', icon: BriefcaseIcon, color: '#1976D2' },
    idea: { label: 'Tư tưởng', icon: LightBulbIcon, color: '#FBC02D' },
    intl: { label: 'Quốc tế', icon: GlobeAltIcon, color: '#7B1FA2' }
  };

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
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <ArrowPathIcon className="icon-sm" />
          Phát động lại phong trào
        </button>
      </div>
    </div>
  );
}
