import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  const faqs = [
    {
      question: "회원가입은 어떻게 하나요?",
      answer:
        "우측 상단 'JOIN' 버튼을 클릭하여 이메일 주소로 회원가입을 진행할 수 있습니다.",
    },
    {
      question: "글쓰기 권한은 어떻게 얻나요?",
      answer:
        "회원가입 후 이메일 인증을 완료하면 즉시 글쓰기 권한이 부여됩니다.",
    },
    {
      question: "사진 업로드 용량 제한이 있나요?",
      answer:
        "네, 각 사진 파일은 10MB 미만이어야 하며, JPG/PNG 형식을 권장합니다.",
    },
    {
      question: "전시회(Exhibition) 참여 방법은?",
      answer:
        "전시회 섹션은 운영진의 큐레이션을 통해 선정된 포트폴리오만 게시됩니다. 참여를 원하시면 admin@xiaomiclub.net으로 문의해주세요.",
    },
    {
      question: "비밀번호를 분실했습니다.",
      answer:
        "로그인 화면의 '비밀번호 찾기' 링크를 통해 가입하신 이메일로 재설정 링크를 받으실 수 있습니다.",
    },
  ];

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">자주 묻는 질문</h1>
        <p className="mt-1 text-muted-foreground">
          커뮤니티 이용에 도움이 되는 내용입니다.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                <span className="text-[#cc0000] mr-2 text-sm font-bold">
                  Q.
                </span>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
