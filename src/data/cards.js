// Regular random encounters
const regularCards = [
  {
    faction: "👨‍🌾 Nông dân",
    text: "Chúng tôi yêu cầu cải cách ruộng đất.",
    yes: { people: +12, class: +10, idea: +5, intl: -12 }, // Land reform upsets capitalist nations
    no:  { people: -15, class: -10, idea: -5, intl: +8 }
  },
  {
    faction: "👷 Công nhân",
    text: "Cần nâng lương và giảm giờ làm.",
    yes: { people: +15, class: +12, idea: +3, intl: -8 }, // Worker rights hurt foreign investment
    no:  { people: -15, class: -15, idea: -5, intl: +5 }
  },
  {
    faction: "🎓 Trí thức",
    text: "Giáo dục phải được ưu tiên ngân sách.",
    yes: { people: +8, class: -8, idea: +15, intl: +5 }, // Education costs but improves ideology
    no:  { people: -8, class: +5, idea: -15, intl: 0 }
  },
  {
    faction: "🏭 Nhà máy",
    text: "Cần tăng ca sản xuất để đáp ứng nhu cầu.",
    yes: { people: -15, class: +10, idea: -5, intl: +8 }, // Overwork hurts people, helps production
    no:  { people: +10, class: -12, idea: 0, intl: -10 }
  },
  {
    faction: "🌾 Hợp tác xã",
    text: "Đề xuất thành lập hợp tác xã nông nghiệp.",
    yes: { people: +12, class: +10, idea: +8, intl: -10 }, // Collectivization upsets West
    no:  { people: -12, class: -12, idea: -8, intl: +5 }
  },
  {
    faction: "📰 Báo chí",
    text: "Yêu cầu tự do báo chí rộng rãi hơn.",
    yes: { people: +10, class: -8, idea: +12, intl: +12 }, // Press freedom helps international image
    no:  { people: -10, class: +8, idea: -12, intl: -8 }
  },
  {
    faction: "⚔️ Quân đội",
    text: "Cần tăng ngân sách quốc phòng.",
    yes: { people: -15, class: +5, idea: -5, intl: +10 }, // Military spending diverts from people
    no:  { people: +8, class: -8, idea: +3, intl: -15 }
  },
  {
    faction: "🏛️ Chính quyền",
    text: "Đề xuất cải tổ bộ máy hành chính.",
    yes: { people: +10, class: -5, idea: +10, intl: 0 }, // Reform improves governance
    no:  { people: -12, class: +5, idea: -10, intl: 0 }
  },
  {
    faction: "👨‍⚕️ Y tế",
    text: "Cần mở rộng chăm sóc sức khỏe miễn phí.",
    yes: { people: +18, class: -5, idea: +8, intl: 0 }, // Healthcare for all costs resources
    no:  { people: -20, class: +5, idea: -8, intl: +5 }
  },
  {
    faction: "🎭 Văn nghệ sĩ",
    text: "Yêu cầu hỗ trợ nghệ thuật cách mạng.",
    yes: { people: +12, class: +8, idea: +12, intl: -8 }, // Revolutionary art seen as propaganda
    no:  { people: -12, class: -8, idea: -15, intl: +5 }
  },
  {
    faction: "🌾 Thóc gạo",
    text: "Xuất khẩu thóc để kiếm ngoại tệ?",
    yes: { people: -15, class: +10, idea: 0, intl: +15 }, // Export at cost of domestic supply
    no:  { people: +10, class: -8, idea: 0, intl: -12 }
  },
  {
    faction: "🏫 Thanh niên",
    text: "Tổ chức phong trào thanh niên tình nguyện.",
    yes: { people: +8, class: +10, idea: +12, intl: -5 },
    no:  { people: -8, class: -8, idea: -10, intl: +3 }
  },
  {
    faction: "⛪ Tôn giáo",
    text: "Các tổ chức tôn giáo xin tự do hoạt động.",
    yes: { people: +12, class: -10, idea: -8, intl: +10 }, // Religion vs ideology
    no:  { people: -10, class: +8, idea: +8, intl: -8 }
  },
  {
    faction: "🚜 Máy móc",
    text: "Nhập khẩu máy móc hiện đại từ nước ngoài?",
    yes: { people: -5, class: +12, idea: +5, intl: +12 }, // Trade improves relations
    no:  { people: +5, class: -10, idea: -5, intl: -10 }
  },
  {
    faction: "🌳 Môi trường",
    text: "Khai thác rừng để phát triển kinh tế?",
    yes: { people: -8, class: +15, idea: -5, intl: +5 }, // Exploitation for growth
    no:  { people: +8, class: -12, idea: +8, intl: 0 }
  }
];

// Special events that trigger at specific turns
const turnBasedEvents = [
  {
    turn: 5,
    faction: "📜 Sự kiện",
    text: "Quốc hội họp lần đầu. Có nên thông qua hiến pháp ngay?",
    yes: { people: +12, class: +12, idea: +15, intl: +12 },
    no:  { people: -10, class: -10, idea: -15, intl: -5 }
  },
  {
    turn: 10,
    faction: "🌾 Nạn đói",
    text: "Hạn hán ở miền Bắc. Mở kho dự trữ cứu đói?",
    yes: { people: +20, class: -20, idea: +8, intl: -10 },
    no:  { people: -25, class: +12, idea: -8, intl: +5 }
  },
  {
    turn: 15,
    faction: "🌍 Quan hệ quốc tế",
    text: "Liên Xô đề nghị viện trợ. Chấp nhận?",
    yes: { people: +8, class: +12, idea: -8, intl: +22 },
    no:  { people: -5, class: -10, idea: +12, intl: -20 }
  },
  {
    turn: 20,
    faction: "⚔️ Chiến tranh",
    text: "Thực dân Pháp tấn công. Tổng động viên?",
    yes: { people: -18, class: +18, idea: +12, intl: +8 },
    no:  { people: +10, class: -25, idea: -15, intl: -18 }
  },
  {
    turn: 25,
    faction: "📜 Cải cách",
    text: "Đã 25 quyết sách. Tiến hành cải cách toàn diện?",
    yes: { people: +15, class: +15, idea: +15, intl: +12 },
    no:  { people: -18, class: -18, idea: -12, intl: -5 }
  }
];

// Threshold-based events (trigger once when conditions are met)
const thresholdEvents = [
  {
    id: "popular_uprising",
    condition: (stats) => stats.people >= 80,
    faction: "👥 Quần chúng",
    text: "Nhân dân hân hoan ủng hộ. Có nên tổ chức lễ kỷ niệm lớn?",
    yes: { people: +12, class: +8, idea: +12, intl: +8 },
    no:  { people: -12, class: +8, idea: -5, intl: -5 }
  },
  {
    id: "people_discontent",
    condition: (stats) => stats.people <= 25,
    faction: "😠 Bất mãn",
    text: "Dân chúng bất bình. Cần có hành động khẩn cấp!",
    yes: { people: +18, class: -15, idea: -8, intl: -8 },
    no:  { people: -15, class: +8, idea: 0, intl: 0 }
  },
  {
    id: "class_solidarity",
    condition: (stats) => stats.class >= 80,
    faction: "🚩 Giai cấp",
    text: "Giai cấp công nhân đoàn kết vững mạnh. Mở rộng quyền lợi?",
    yes: { people: +12, class: +12, idea: +12, intl: -12 },
    no:  { people: -8, class: -15, idea: -5, intl: +8 }
  },
  {
    id: "class_struggle",
    condition: (stats) => stats.class <= 25,
    faction: "⚠️ Khủng hoảng",
    text: "Giai cấp công nhân yếu thế. Tăng cường tuyên truyền?",
    yes: { people: -8, class: +22, idea: +12, intl: -8 },
    no:  { people: +8, class: -12, idea: -15, intl: 0 }
  },
  {
    id: "ideological_peak",
    condition: (stats) => stats.idea >= 80,
    faction: "🧠 Tư tưởng",
    text: "Nhận thức chính trị cao. Xuất bản sách lý luận?",
    yes: { people: +8, class: +8, idea: +12, intl: +12 },
    no:  { people: -5, class: -5, idea: -12, intl: -8 }
  },
  {
    id: "ideological_crisis",
    condition: (stats) => stats.idea <= 25,
    faction: "📚 Giáo dục",
    text: "Tư tưởng yếu kém. Mở lớp học tập khẩn cấp?",
    yes: { people: -12, class: +8, idea: +25, intl: -8 },
    no:  { people: +8, class: -12, idea: -15, intl: 0 }
  },
  {
    id: "international_support",
    condition: (stats) => stats.intl >= 80,
    faction: "🌍 Quốc tế",
    text: "Được quốc tế ủng hộ mạnh. Tổ chức hội nghị lớn?",
    yes: { people: +8, class: +8, idea: +8, intl: +12 },
    no:  { people: -5, class: -5, idea: -5, intl: -15 }
  },
  {
    id: "isolated",
    condition: (stats) => stats.intl <= 25,
    faction: "🔒 Cô lập",
    text: "Bị cô lập quốc tế. Tìm kiếm đồng minh mới?",
    yes: { people: -12, class: -8, idea: -8, intl: +28 },
    no:  { people: +8, class: +8, idea: +8, intl: -15 }
  },
  {
    id: "balanced_state",
    condition: (stats) => {
      // Only trigger when all stats are between 45-55 (very balanced)
      return stats.people >= 45 && stats.people <= 55 &&
             stats.class >= 45 && stats.class <= 55 &&
             stats.idea >= 45 && stats.idea <= 55 &&
             stats.intl >= 45 && stats.intl <= 55;
    },
    faction: "⚖️ Cân bằng",
    text: "Đất nước phát triển cân đối hoàn hảo. Tiếp tục duy trì?",
    yes: { people: +8, class: +8, idea: +8, intl: +8 },
    no:  { people: -12, class: -12, idea: -12, intl: -12 }
  }
];

export { regularCards, turnBasedEvents, thresholdEvents };
