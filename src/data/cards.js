import {
  UserGroupIcon,
  WrenchIcon,
  AcademicCapIcon,
  BuildingOffice2Icon,
  NewspaperIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon,
  HeartIcon,
  MusicalNoteIcon,
  CircleStackIcon,
  FireIcon,
  BookOpenIcon,
  TruckIcon,
  GlobeAmericasIcon,
  LinkIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  NoSymbolIcon,
  GlobeAltIcon,
  ShieldExclamationIcon,
  ArrowPathIcon,
  UsersIcon,
  FaceFrownIcon,
  BriefcaseIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  LockClosedIcon,
  ScaleIcon,
  HandRaisedIcon
} from '@heroicons/react/24/solid';

// Regular random encounters - focused on Unity & Solidarity
const regularCards = [
  {
    faction: "Công-Nông",
    icon: HandRaisedIcon,
    text: "Công nhân và nông dân đề xuất liên minh lao động. Hỗ trợ?",
    yes: { people: +12, class: +9, idea: -5, intl: -7 },
    no: { people: -7, class: -8, idea: +5, intl: +6 }
  },
  {
    faction: "Dân tộc thiểu số",
    icon: UserGroupIcon,
    text: "Đồng bào Tày-Nùng muốn tham gia chính quyền. Chấp nhận?",
    yes: { people: +12, class: -5, idea: +7, intl: -6 },
    no: { people: -10, class: +6, idea: -7, intl: +5 }
  },
  {
    faction: "Công giáo",
    icon: BookOpenIcon,
    text: "Giáo dân xin đoàn kết cùng cách mạng. Hợp tác?",
    yes: { people: +12, class: -6, idea: -7, intl: +8 },
    no: { people: -8, class: +5, idea: +6, intl: -7 }
  },
  {
    faction: "Phật giáo",
    icon: HeartIcon,
    text: "Tăng ni đề xuất 'Hòa thượng yêu nước'. Ủng hộ?",
    yes: { people: +11, class: -5, idea: +6, intl: -6 },
    no: { people: -9, class: +6, idea: -5, intl: +5 }
  },
  {
    faction: "Trí thức",
    icon: AcademicCapIcon,
    text: "Giới trí thức yêu nước muốn tham gia Việt Minh. Mời?",
    yes: { people: +11, class: -7, idea: +12, intl: -5 },
    no: { people: -6, class: +6, idea: -8, intl: +7 }
  },
  {
    faction: "Phụ nữ",
    icon: UsersIcon,
    text: "Hội Phụ nữ đề nghị vai trò lãnh đạo. Hỗ trợ?",
    yes: { people: +12, class: +7, idea: -5, intl: -6 },
    no: { people: -8, class: -6, idea: +5, intl: +6 }
  },
  {
    faction: "Liên Xô",
    icon: GlobeAltIcon,
    text: "Liên Xô đề nghị huấn luyện quân sự. Chấp nhận?",
    yes: { people: -5, class: +6, idea: -7, intl: +12 },
    no: { people: +6, class: -5, idea: +8, intl: -10 }
  },
  {
    faction: "Trung Quốc",
    icon: GlobeAmericasIcon,
    text: "Trung Quốc gửi viện trợ lương thực. Tiếp nhận?",
    yes: { people: +7, class: -5, idea: -6, intl: +12 },
    no: { people: -5, class: +6, idea: +7, intl: -9 }
  },
  {
    faction: "Cuba",
    icon: FireIcon,
    text: "Cuba yêu cầu hỗ trợ kinh nghiệm cách mạng. Giúp?",
    yes: { people: +5, class: -6, idea: +7, intl: +12 },
    no: { people: -4, class: +5, idea: -6, intl: -10 }
  },
  {
    faction: "Algeria",
    icon: ShieldCheckIcon,
    text: "Mặt trận Algeria xin ủng hộ. Tuyên bố hỗ trợ?",
    yes: { people: +6, class: -5, idea: +8, intl: +11 },
    no: { people: -5, class: +6, idea: -7, intl: -9 }
  },
  {
    faction: "Hội nghị Bandung",
    icon: LinkIcon,
    text: "Tham gia phong trào không liên kết. Đồng ý?",
    yes: { people: +7, class: -6, idea: +6, intl: +12 },
    no: { people: -6, class: +7, idea: -5, intl: -10 }
  },
  {
    faction: "Văn nghệ sĩ",
    icon: MusicalNoteIcon,
    text: "Văn nghệ sĩ cả nước muốn đại đoàn kết. Tổ chức?",
    yes: { people: +12, class: -5, idea: +9, intl: -6 },
    no: { people: -7, class: +5, idea: -7, intl: +6 }
  },
  {
    faction: "Thanh niên",
    icon: UsersIcon,
    text: "Lập đoàn thanh niên đại đoàn kết. Ủng hộ?",
    yes: { people: +11, class: +8, idea: -6, intl: -6 },
    no: { people: -7, class: -6, idea: +6, intl: +5 }
  },
  {
    faction: "Đảng viên",
    icon: BriefcaseIcon,
    text: "Mở rộng đảng, thu hút nhiều thành phần. Đồng ý?",
    yes: { people: +12, class: +7, idea: -7, intl: -5 },
    no: { people: -8, class: -6, idea: +8, intl: +6 }
  },
  {
    faction: "Hoa kiều",
    icon: UserGroupIcon,
    text: "Hoa kiều yêu nước muốn góp sức. Chào đón?",
    yes: { people: +10, class: -6, idea: +6, intl: +9 },
    no: { people: -7, class: +5, idea: -6, intl: -8 }
  },
  // Positive unity events
  {
    faction: "Mặt trận",
    icon: LinkIcon,
    text: "Lập Mặt trận Việt Minh đại đoàn kết dân tộc!",
    yes: { people: +12, class: +11, idea: +8, intl: -6 },
    no: { people: -8, class: -7, idea: -6, intl: +7 }
  },
  {
    faction: "Quốc tế",
    icon: GlobeAltIcon,
    text: "Tổ chức hội nghị đoàn kết quốc tế châu Á-Phi!",
    yes: { people: +8, class: -6, idea: +9, intl: +12 },
    no: { people: -6, class: +5, idea: -7, intl: -10 }
  },
  {
    faction: "Đoàn kết",
    icon: HandRaisedIcon,
    text: "\"Đoàn kết, đoàn kết, đại đoàn kết!\" Phát động?",
    yes: { people: +12, class: +10, idea: +8, intl: -5 },
    no: { people: -7, class: -6, idea: -6, intl: +6 }
  }
];

// Special events - Unity & Solidarity milestones
// Timeline: 1941 (Viet Minh founded) → 1970 (~1 year per turn, ends after Bác's passing 1969)
const turnBasedEvents = [
  {
    turn: 4,
    faction: "Cách mạng tháng 8",
    icon: CalendarDaysIcon,
    text: "1945: Cơ hội giành chính quyền! Tổng khởi nghĩa toàn dân?",
    yes: { people: +12, class: +10, idea: +9, intl: -7 },
    no: { people: -10, class: -9, idea: -8, intl: +8 }
  },
  {
    turn: 8,
    faction: "Kháng chiến toàn dân",
    icon: HandRaisedIcon,
    text: "1948: \"Già, trẻ, gái, trai đều kháng chiến!\" Phát động?",
    yes: { people: +12, class: +12, idea: +9, intl: -6 },
    no: { people: -10, class: -9, idea: -7, intl: +7 }
  },
  {
    turn: 13,
    faction: "Hội nghị Geneva",
    icon: GlobeAltIcon,
    text: "1954: Đề xuất hòa bình Geneva. Đoàn kết quốc tế ủng hộ?",
    yes: { people: +8, class: -6, idea: +7, intl: +12 },
    no: { people: -6, class: +7, idea: -6, intl: -11 }
  },
  {
    turn: 18,
    faction: "Miền Nam",
    icon: LinkIcon,
    text: "1959: Đồng bào miền Nam kêu gọi giải phóng. Ủng hộ?",
    yes: { people: +12, class: +9, idea: -6, intl: -8 },
    no: { people: -10, class: -7, idea: +6, intl: +8 }
  },
  {
    turn: 25,
    faction: "Phong trào quốc tế",
    icon: GlobeAmericasIcon,
    text: "1966: Thế giới phản chiến ủng hộ VN. Kêu gọi mạnh?",
    yes: { people: +9, class: -6, idea: +8, intl: +12 },
    no: { people: -6, class: +7, idea: -6, intl: -10 }
  }
];

// Threshold-based events
const thresholdEvents = [
  {
    id: "popular_uprising",
    condition: (stats) => stats.people >= 80,
    faction: "Quần chúng",
    icon: UsersIcon,
    text: "Nhân dân hân hoan ủng hộ. Có nên tổ chức lễ kỷ niệm lớn?",
    yes: { people: +5, class: -5, idea: +12, intl: -7 },
    no: { people: -2, class: +7, idea: -7, intl: +10 }
  },
  {
    id: "people_discontent",
    condition: (stats) => stats.people <= 25,
    faction: "Bất mãn",
    icon: FaceFrownIcon,
    text: "Dân chúng bất bình. Cần có hành động khẩn cấp!",
    yes: { people: +15, class: -7, idea: +5, intl: -5 },
    no: { people: -5, class: +10, idea: -3, intl: +6 }
  },
  {
    id: "class_solidarity",
    condition: (stats) => stats.class >= 80,
    faction: "Giai cấp",
    icon: BriefcaseIcon,
    text: "Giai cấp công nhân đoàn kết vững mạnh. Mở rộng quyền lợi?",
    yes: { people: +9, class: +12, idea: -4, intl: -7 },
    no: { people: -5, class: -7, idea: +7, intl: +10 }
  },
  {
    id: "class_struggle",
    condition: (stats) => stats.class <= 25,
    faction: "Khủng hoảng",
    icon: ExclamationTriangleIcon,
    text: "Giai cấp công nhân yếu thế. Tăng cường tuyên truyền?",
    yes: { people: -5, class: +15, idea: +7, intl: -7 },
    no: { people: +7, class: -5, idea: -4, intl: +10 }
  },
  {
    id: "ideological_peak",
    condition: (stats) => stats.idea >= 80,
    faction: "Tư tưởng",
    icon: LightBulbIcon,
    text: "Nhận thức chính trị cao. Xuất bản sách lý luận?",
    yes: { people: -4, class: +9, idea: +12, intl: -7 },
    no: { people: +7, class: -5, idea: -7, intl: +10 }
  },
  {
    id: "ideological_crisis",
    condition: (stats) => stats.idea <= 25,
    faction: "Giáo dục",
    icon: AcademicCapIcon,
    text: "Tư tưởng yếu kém. Mở lớp học tập khẩn cấp?",
    yes: { people: -7, class: +7, idea: +15, intl: -5 },
    no: { people: +10, class: -5, idea: -5, intl: +6 }
  },
  {
    id: "international_support",
    condition: (stats) => stats.intl >= 80,
    faction: "Quốc tế",
    icon: GlobeAltIcon,
    text: "Được quốc tế ủng hộ mạnh. Tổ chức hội nghị lớn?",
    yes: { people: +9, class: -5, idea: -7, intl: +12 },
    no: { people: -4, class: +7, idea: +10, intl: -7 }
  },
  {
    id: "isolated",
    condition: (stats) => stats.intl <= 25,
    faction: "Cô lập",
    icon: LockClosedIcon,
    text: "Bị cô lập quốc tế. Tìm kiếm đồng minh mới?",
    yes: { people: -5, class: -7, idea: +7, intl: +15 },
    no: { people: +7, class: +10, idea: -5, intl: -5 }
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
    faction: "Cân bằng",
    icon: ScaleIcon,
    text: "Đất nước phát triển cân đối hoàn hảo. Tiếp tục duy trì?",
    yes: { people: +8, class: +8, idea: +8, intl: +8 },
    no: { people: -12, class: -12, idea: -12, intl: -12 }
  }
];

export { regularCards, turnBasedEvents, thresholdEvents };
