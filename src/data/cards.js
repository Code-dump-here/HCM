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

// Regular random encounters
const regularCards = [
  {
    faction: "Nông dân",
    icon: UserGroupIcon,
    text: "Chúng tôi yêu cầu cải cách ruộng đất.",
    yes: { people: +5, class: +12, idea: -3, intl: -7 },
    no: { people: -7, class: -3, idea: +5, intl: +8 }
  },
  {
    faction: "Công nhân",
    icon: WrenchIcon,
    text: "Cần nâng lương và giảm giờ làm.",
    yes: { people: +12, class: +5, idea: -5, intl: -7 },
    no: { people: -7, class: -5, idea: +5, intl: +8 }
  },
  {
    faction: "Trí thức",
    icon: AcademicCapIcon,
    text: "Giáo dục phải được ưu tiên ngân sách.",
    yes: { people: +5, class: -7, idea: +12, intl: -5 },
    no: { people: -5, class: +8, idea: -7, intl: +5 }
  },
  {
    faction: "Nhà máy",
    icon: BuildingOffice2Icon,
    text: "Cần tăng ca sản xuất để đáp ứng nhu cầu.",
    yes: { people: -7, class: +11, idea: -3, intl: +6 },
    no: { people: +10, class: -7, idea: +6, intl: -4 }
  },
  {
    faction: "Hợp tác xã",
    icon: HandRaisedIcon,
    text: "Đề xuất thành lập hợp tác xã nông nghiệp.",
    yes: { people: +12, class: +5, idea: -5, intl: -7 },
    no: { people: -7, class: -5, idea: +5, intl: +8 }
  },
  {
    faction: "Báo chí",
    icon: NewspaperIcon,
    text: "Yêu cầu tự do báo chí rộng rãi hơn.",
    yes: { people: +5, class: -5, idea: +12, intl: -7 },
    no: { people: -5, class: +5, idea: -7, intl: +8 }
  },
  {
    faction: "Quân đội",
    icon: ShieldCheckIcon,
    text: "Cần tăng ngân sách quốc phòng.",
    yes: { people: -7, class: +5, idea: -5, intl: +12 },
    no: { people: +10, class: -5, idea: +5, intl: -7 }
  },
  {
    faction: "Chính quyền",
    icon: BuildingLibraryIcon,
    text: "Đề xuất cải tổ bộ máy hành chính.",
    yes: { people: +12, class: -5, idea: +5, intl: -7 },
    no: { people: -7, class: +5, idea: -5, intl: +8 }
  },
  {
    faction: "Y tế",
    icon: HeartIcon,
    text: "Cần mở rộng chăm sóc sức khỏe miễn phí.",
    yes: { people: +12, class: -7, idea: +5, intl: -5 },
    no: { people: -7, class: +8, idea: -5, intl: +5 }
  },
  {
    faction: "Văn nghệ sĩ",
    icon: MusicalNoteIcon,
    text: "Yêu cầu hỗ trợ nghệ thuật cách mạng.",
    yes: { people: +5, class: -5, idea: +12, intl: -7 },
    no: { people: -5, class: +5, idea: -7, intl: +8 }
  },
  {
    faction: "Thóc gạo",
    icon: CircleStackIcon,
    text: "Xuất khẩu thóc để kiếm ngoại tệ?",
    yes: { people: -7, class: +5, idea: -2, intl: +12 },
    no: { people: +10, class: -2, idea: +5, intl: -7 }
  },
  {
    faction: "Thanh niên",
    icon: FireIcon,
    text: "Tổ chức phong trào thanh niên tình nguyện.",
    yes: { people: +5, class: +11, idea: -3, intl: -7 },
    no: { people: -4, class: -7, idea: +5, intl: +10 }
  },
  {
    faction: "Tôn giáo",
    icon: BookOpenIcon,
    text: "Các tổ chức tôn giáo xin tự do hoạt động.",
    yes: { people: +12, class: -7, idea: -5, intl: +5 },
    no: { people: -7, class: +8, idea: +5, intl: -5 }
  },
  {
    faction: "Máy móc",
    icon: TruckIcon,
    text: "Nhập khẩu máy móc hiện đại từ nước ngoài?",
    yes: { people: -5, class: +12, idea: -7, intl: +5 },
    no: { people: +5, class: -7, idea: +10, intl: -5 }
  },
  {
    faction: "Môi trường",
    icon: GlobeAmericasIcon,
    text: "Khai thác rừng để phát triển kinh tế?",
    yes: { people: -5, class: +12, idea: -7, intl: +5 },
    no: { people: +5, class: -7, idea: +10, intl: -5 }
  },
  // Positive outcome cards (strategic opportunities)
  {
    faction: "Đoàn kết",
    icon: LinkIcon,
    text: "Đề xuất hội nghị đại đoàn kết toàn quốc.",
    yes: { people: +12, class: +9, idea: +7, intl: -6 },
    no: { people: -5, class: -4, idea: -5, intl: +8 }
  },
  {
    faction: "Kế hoạch",
    icon: ClipboardDocumentCheckIcon,
    text: "Thực hiện kế hoạch 5 năm phát triển kinh tế.",
    yes: { people: +9, class: +12, idea: +7, intl: -6 },
    no: { people: -6, class: -7, idea: -4, intl: +8 }
  },
  {
    faction: "Văn hóa",
    icon: BookOpenIcon,
    text: "Phát động phong trào xóa mù chữ toàn quốc.",
    yes: { people: +12, class: +7, idea: +11, intl: -5 },
    no: { people: -5, class: -5, idea: -7, intl: +6 }
  }
];

// Special events that trigger at specific turns
const turnBasedEvents = [
  {
    turn: 5,
    faction: "Sự kiện",
    icon: CalendarDaysIcon,
    text: "Quốc hội họp lần đầu. Có nên thông qua hiến pháp ngay?",
    yes: { people: +12, class: +9, idea: +7, intl: +12 },
    no: { people: -7, class: -5, idea: -4, intl: -7 }
  },
  {
    turn: 10,
    faction: "Nạn đói",
    icon: NoSymbolIcon,
    text: "Hạn hán ở miền Bắc. Mở kho dự trữ cứu đói?",
    yes: { people: +12, class: -7, idea: +5, intl: +7 },
    no: { people: -7, class: +10, idea: -4, intl: +2 }
  },
  {
    turn: 15,
    faction: "Quan hệ quốc tế",
    icon: GlobeAltIcon,
    text: "Liên Xô đề nghị viện trợ. Chấp nhận?",
    yes: { people: +5, class: -5, idea: -7, intl: +12 },
    no: { people: -2, class: +6, idea: +12, intl: -7 }
  },
  {
    turn: 20,
    faction: "Chiến tranh",
    icon: ShieldExclamationIcon,
    text: "Thực dân Pháp tấn công. Tổng động viên?",
    yes: { people: -7, class: +12, idea: +9, intl: -7 },
    no: { people: +12, class: -7, idea: -4, intl: +6 }
  },
  {
    turn: 25,
    faction: "Cải cách",
    icon: ArrowPathIcon,
    text: "Đã 25 quyết sách. Tiến hành cải cách toàn diện?",
    yes: { people: +12, class: +11, idea: +7, intl: -7 },
    no: { people: -7, class: -5, idea: +5, intl: +10 }
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
