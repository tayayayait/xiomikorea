import { useParams, Link } from "react-router-dom";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNotice } from "@/hooks/useNotices";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function NoticeDetail() {
  const { id } = useParams();
  const { data: notice, isLoading } = useNotice(id!);

  if (isLoading) {
    return (
      <div className="container-custom py-8 lg:py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-32 bg-muted rounded" />
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="border-b">
              <div className="h-4 w-24 bg-muted rounded mb-2" />
              <div className="h-8 w-3/4 bg-muted rounded" />
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-4/6" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">공지사항을 찾을 수 없습니다</h1>
        <Button asChild>
          <Link to="/notice">공지사항으로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  // Simple markdown-like parsing
  const renderContent = (content: string) => {
    const paragraphs = content.split("\n\n");
    
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">
            {paragraph.replace("## ", "")}
          </h2>
        );
      }
      if (paragraph.startsWith("- ")) {
        const items = paragraph.split("\n");
        return (
          <ul key={index} className="list-disc pl-6 space-y-1 my-4">
            {items.map((item, i) => (
              <li key={i} className="text-muted-foreground">
                <span
                  dangerouslySetInnerHTML={{
                    __html: item
                      .replace("- ", "")
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>'),
                  }}
                />
              </li>
            ))}
          </ul>
        );
      }
      if (paragraph.match(/^\d\./)) {
        const items = paragraph.split("\n");
        return (
          <ol key={index} className="list-decimal pl-6 space-y-1 my-4">
            {items.map((item, i) => (
              <li key={i} className="text-muted-foreground">
                {item.replace(/^\d\.\s/, "")}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <p key={index} className="text-muted-foreground my-4 whitespace-pre-wrap">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="container-custom py-8 lg:py-12">
      {/* Back Button */}
      <Link
        to="/notice"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        공지사항으로 돌아가기
      </Link>

      <Card className="max-w-3xl mx-auto">
        <CardHeader className="border-b">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            {format(new Date(notice.created_at), "yyyy년 M월 d일", { locale: ko })}
          </div>
          <h1 className="text-2xl font-bold text-foreground">{notice.title}</h1>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {renderContent(notice.content)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
