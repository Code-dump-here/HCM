// Regular random encounters
// Most choices net negative (-1 to -5), some positive (+1 to +5) sprinkled in
// Values: 1-5 (+/-), 6-10 (++/--), 11+ (+++/---)
const regularCards = [
  {
    faction: "👨‍🌾 Nông dân",
    text: "Chúng tôi yêu cầu cải cách ruộng đất.",
    yes: { people: +3, class: +12, idea: -5, intl: -12 }, // -2 net
    no:  { people: -12, class: -5, idea: +3, intl: +12 }  // -2 net
  },
  {
    faction: "👷 Công nhân",
    text: "Cần nâng lương và giảm giờ làm.",
    yes: { people: +12, class: +3, idea: -7, intl: -12 }, // -4 net
    no:  { people: -12, class: -7, idea: +3, intl: +12 }  // -4 net
  },
  {
    faction: "🎓 Trí thức",
    text: "Giáo dục phải được ưu tiên ngân sách.",
    yes: { people: +3, class: -12, idea: +12, intl: -7 }, // -4 net
    no:  { people: -7, class: +12, idea: -12, intl: +3 }  // -4 net
  },
  {
    faction: "🏭 Nhà máy",
    text: "Cần tăng ca sản xuất để đáp ứng nhu cầu.",
    yes: { people: -12, class: +9, idea: -5, intl: +5 }, // -3 net
    no:  { people: +9, class: -12, idea: +5, intl: -5 }  // -3 net
  },
  {
    faction: "🌾 Hợp tác xã",
    text: "Đề xuất thành lập hợp tác xã nông nghiệp.",
    yes: { people: +12, class: +3, idea: -7, intl: -12 }, // -4 net
    no:  { people: -12, class: -7, idea: +3, intl: +12 }  // -4 net
  },
  {
    faction: "📰 Báo chí",
    text: "Yêu cầu tự do báo chí rộng rãi hơn.",
    yes: { people: +3, class: -7, idea: +12, intl: -12 }, // -4 net
    no:  { people: -7, class: +3, idea: -12, intl: +12 }  // -4 net
  },
  {
    faction: "⚔️ Quân đội",
    text: "Cần tăng ngân sách quốc phòng.",
    yes: { people: -12, class: +3, idea: -7, intl: +12 }, // -4 net
    no:  { people: +12, class: -7, idea: +3, intl: -12 }  // -4 net
  },
  {
    faction: "🏛️ Chính quyền",
    text: "Đề xuất cải tổ bộ máy hành chính.",
    yes: { people: +12, class: -7, idea: +3, intl: -12 }, // -4 net
    no:  { people: -12, class: +3, idea: -7, intl: +12 }  // -4 net
  },
  {
    faction: "👨‍⚕️ Y tế",
    text: "Cần mở rộng chăm sóc sức khỏe miễn phí.",
    yes: { people: +12, class: -12, idea: +3, intl: -7 }, // -4 net
    no:  { people: -12, class: +12, idea: -7, intl: +3 }  // -4 net
  },
  {
    faction: "🎭 Văn nghệ sĩ",
    text: "Yêu cầu hỗ trợ nghệ thuật cách mạng.",
    yes: { people: +3, class: -7, idea: +12, intl: -12 }, // -4 net
    no:  { people: -7, class: +3, idea: -12, intl: +12 }  // -4 net
  },
  {
    faction: "🌾 Thóc gạo",
    text: "Xuất khẩu thóc để kiếm ngoại tệ?",
    yes: { people: -12, class: +3, idea: -3, intl: +12 }, // 0 net
    no:  { people: +12, class: -3, idea: +3, intl: -12 }  // 0 net
  },
  {
    faction: "🏫 Thanh niên",
    text: "Tổ chức phong trào thanh niên tình nguyện.",
    yes: { people: +3, class: +9, idea: -5, intl: -12 }, // -5 net
    no:  { people: -5, class: -12, idea: +3, intl: +9 }  // -5 net
  },
  {
    faction: "⛪ Tôn giáo",
    text: "Các tổ chức tôn giáo xin tự do hoạt động.",
    yes: { people: +12, class: -12, idea: -7, intl: +3 }, // -4 net
    no:  { people: -12, class: +12, idea: +3, intl: -7 }  // -4 net
  },
  {
    faction: "🚜 Máy móc",
    text: "Nhập khẩu máy móc hiện đại từ nước ngoài?",
    yes: { people: -7, class: +12, idea: -12, intl: +3 }, // -4 net
    no:  { people: +3, class: -12, idea: +12, intl: -7 }  // -4 net
  },
  {
    faction: "🌳 Môi trường",
    text: "Khai thác rừng để phát triển kinh tế?",
    yes: { people: -7, class: +12, idea: -12, intl: +3 }, // -4 net
    no:  { people: +3, class: -12, idea: +12, intl: -7 }  // -4 net
  },
  // Positive outcome cards (strategic opportunities)
  {
    faction: "🤝 Đoàn kết",
    text: "Đề xuất hội nghị đại đoàn kết toàn quốc.",
    yes: { people: +12, class: +7, idea: +5, intl: -8 }, // +16 net - rare win
    no:  { people: -7, class: -5, idea: -7, intl: +12 }   // -7 net
  },
  {
    faction: "🎯 Kế hoạch",
    text: "Thực hiện kế hoạch 5 năm phát triển kinh tế.",
    yes: { people: +7, class: +12, idea: +5, intl: -8 }, // +16 net - rare win
    no:  { people: -8, class: -12, idea: -5, intl: +7 }  // -18 net - harsh penalty
  },
  {
    faction: "📚 Văn hóa",
    text: "Phát động phong trào xóa mù chữ toàn quốc.",
    yes: { people: +12, class: +5, idea: +9, intl: -7 }, // +19 net - best card
    no:  { people: -7, class: -7, idea: -12, intl: +5 }   // -21 net
  }
];

// Special events that trigger at specific turns
// Mix of challenging choices and strategic opportunities
const turnBasedEvents = [
  {
    turn: 5,
    faction: "📜 Sự kiện",
    text: "Quốc hội họp lần đầu. Có nên thông qua hiến pháp ngay?",
    yes: { people: +12, class: +7, idea: -5, intl: -12 }, // +2 net - positive!
    no:  { people: -12, class: -7, idea: +5, intl: +12 }  // -2 net
  },
  {
    turn: 10,
    faction: "🌾 Nạn đói",
    text: "Hạn hán ở miền Bắc. Mở kho dự trữ cứu đói?",
    yes: { people: +12, class: -12, idea: +3, intl: -7 }, // -4 net - hard choice
    no:  { people: -12, class: +9, idea: -5, intl: +5 }  // -3 net
  },
  {
    turn: 15,
    faction: "🌍 Quan hệ quốc tế",
    text: "Liên Xô đề nghị viện trợ. Chấp nhận?",
    yes: { people: +3, class: -7, idea: -12, intl: +12 }, // -4 net
    no:  { people: -3, class: +5, idea: +12, intl: -14 }  // 0 net
  },
  {
    turn: 20,
    faction: "⚔️ Chiến tranh",
    text: "Thực dân Pháp tấn công. Tổng động viên?",
    yes: { people: -12, class: +12, idea: +7, intl: -9 }, // -2 net
    no:  { people: +12, class: -14, idea: -5, intl: +5 }   // -2 net
  },
  {
    turn: 25,
    faction: "📜 Cải cách",
    text: "Đã 25 quyết sách. Tiến hành cải cách toàn diện?",
    yes: { people: +12, class: +9, idea: +5, intl: -12 }, // +14 net - big reward!
    no:  { people: -12, class: -7, idea: +3, intl: +12 }   // -4 net
  }
];

// Threshold-based events (trigger once when conditions are met)
// Crisis cards generally negative, success cards more positive
const thresholdEvents = [
  {
    id: "popular_uprising",
    condition: (stats) => stats.people >= 80,
    faction: "👥 Quần chúng",
    text: "Nhân dân hân hoan ủng hộ. Có nên tổ chức lễ kỷ niệm lớn?",
    yes: { people: +3, class: -7, idea: +12, intl: -12 }, // -4 net
    no:  { people: -3, class: +5, idea: -12, intl: +14 }  // +4 net - reward for high people
  },
  {
    id: "people_discontent",
    condition: (stats) => stats.people <= 25,
    faction: "😠 Bất mãn",
    text: "Dân chúng bất bình. Cần có hành động khẩn cấp!",
    yes: { people: +12, class: -12, idea: +3, intl: -7 }, // -4 net - crisis
    no:  { people: -14, class: +12, idea: -5, intl: +5 }  // -2 net
  },
  {
    id: "class_solidarity",
    condition: (stats) => stats.class >= 80,
    faction: "🚩 Giai cấp",
    text: "Giai cấp công nhân đoàn kết vững mạnh. Mở rộng quyền lợi?",
    yes: { people: +7, class: +12, idea: -5, intl: -12 }, // +2 net - reward!
    no:  { people: -7, class: -12, idea: +5, intl: +12 }  // -2 net
  },
  {
    id: "class_struggle",
    condition: (stats) => stats.class <= 25,
    faction: "⚠️ Khủng hoảng",
    text: "Giai cấp công nhân yếu thế. Tăng cường tuyên truyền?",
    yes: { people: -7, class: +12, idea: +5, intl: -12 }, // -2 net
    no:  { people: +5, class: -14, idea: -5, intl: +12 }  // -2 net - crisis
  },
  {
    id: "ideological_peak",
    condition: (stats) => stats.idea >= 80,
    faction: "🧠 Tư tưởng",
    text: "Nhận thức chính trị cao. Xuất bản sách lý luận?",
    yes: { people: -5, class: +7, idea: +12, intl: -12 }, // +2 net - reward!
    no:  { people: +5, class: -7, idea: -12, intl: +14 }  // 0 net
  },
  {
    id: "ideological_crisis",
    condition: (stats) => stats.idea <= 25,
    faction: "📚 Giáo dục",
    text: "Tư tưởng yếu kém. Mở lớp học tập khẩn cấp?",
    yes: { people: -12, class: +5, idea: +12, intl: -7 }, // -2 net - crisis
    no:  { people: +12, class: -7, idea: -12, intl: +5 }  // -2 net
  },
  {
    id: "international_support",
    condition: (stats) => stats.intl >= 80,
    faction: "🌍 Quốc tế",
    text: "Được quốc tế ủng hộ mạnh. Tổ chức hội nghị lớn?",
    yes: { people: +7, class: -7, idea: -12, intl: +12 }, // 0 net - reward
    no:  { people: -5, class: +5, idea: +12, intl: -14 }  // -2 net
  },
  {
    id: "isolated",
    condition: (stats) => stats.intl <= 25,
    faction: "🔒 Cô lập",
    text: "Bị cô lập quốc tế. Tìm kiếm đồng minh mới?",
    yes: { people: -7, class: -12, idea: +5, intl: +12 }, // -2 net - crisis
    no:  { people: +5, class: +12, idea: -7, intl: -12 }  // -2 net
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
