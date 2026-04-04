const app = { "name": "Luna", "tagline": "당신의 사이클을 이해하세요" };
const phases = { "menstrual": "월경기", "follicular": "난포기", "ovulation": "배란기", "luteal": "황체기" };
const privacy = { "badge": "비공개 및 암호화", "disclaimer": "이 정보는 전문적인 의학적 조언을 대체하지 않습니다. 항상 자격을 갖춘 의료 전문가와 상담하세요." };
const settings = { "title": "설정", "cycleLength": "주기 길이", "periodLength": "생리 기간", "lastPeriod": "마지막 생리 날짜", "save": "저장", "saved": "설정이 저장되었습니다" };
const contact = { "title": "문의하기", "close": "닫기", "back": "뒤로", "send": "보내기", "messageAriaLabel": "메시지", "sentTitle": "메시지 전송 완료!", "sentBody": "감사합니다. 모든 메시지를 읽습니다.", "typeImprovement": "개선 제안", "typeFeedback": "피드백", "typeBug": "버그", "placeholderImprovement": "이런 기능이 있으면 좋겠어요…", "placeholderFeedback": "의견을 들려주세요…", "placeholderBug": "이렇게 하면… 이런 일이 생겨요" };
const ko = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  ko as default,
  phases,
  privacy,
  settings
};
