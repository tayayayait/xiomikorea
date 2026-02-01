import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useNotices } from "@/hooks/useNotices";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function Notice() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: notices, isLoading } = useNotices(debouncedQuery);

  const totalPages = Math.ceil((notices?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotices = notices?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedQuery(searchQuery);
    setCurrentPage(1);
  };

  return (
    <div className="container-custom py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">공지사항</h1>
        <p className="mt-1 text-muted-foreground">커뮤니티 소식과 이벤트를 확인하세요</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="공지사항 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">검색</Button>
        </div>
      </form>

      {/* Notice List */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-5 sm:p-6">
                <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : currentNotices.length > 0 ? (
        <div className="space-y-4">
          {currentNotices.map((notice) => (
            <Link key={notice.id} to={`/notice/${notice.id}`}>
              <Card className="hover:bg-accent/50 transition-colors">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1">
                      <h2 className="font-semibold text-foreground mb-1 hover:text-primary transition-colors">
                        {notice.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {notice.content.substring(0, 100)}...
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(notice.created_at), "yyyy. M. d", { locale: ko })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {debouncedQuery ? "검색 결과가 없습니다" : "공지사항이 없습니다"}
          </h3>
          <p className="text-muted-foreground">
            {debouncedQuery ? "다른 검색어로 시도해보세요" : "곧 새로운 소식이 올라올 예정입니다"}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
