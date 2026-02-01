
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock Data
const MOCK_ORUM_POSTS = Array.from({ length: 15 }).map((_, i) => ({
  id: 100 - i,
  title: i === 0 ? "샤오미코리아 커뮤니티 이용 규칙 안내" : `자유게시판 테스트 게시글입니다. (${100-i})`,
  author: i === 0 ? "관리자" : `User${i + 1}`,
  date: "2026.02.01",
  views: Math.floor(Math.random() * 1000),
  isNotice: i === 0,
}));

export default function Forum() {
  const [posts] = useState(MOCK_ORUM_POSTS);

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Forum</h1>
          <p className="mt-1 text-muted-foreground text-sm">자유롭게 이야기를 나누는 공간입니다.</p>
        </div>
        <Button className="bg-[#cc0000] hover:bg-[#a30000] text-white">글쓰기</Button>
      </div>

      <div className="border-t border-black">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-200">
              <TableHead className="w-[80px] text-center font-bold text-black">번호</TableHead>
              <TableHead className="text-center font-bold text-black">제목</TableHead>
              <TableHead className="w-[120px] text-center font-bold text-black">글쓴이</TableHead>
              <TableHead className="w-[120px] text-center font-bold text-black">날짜</TableHead>
              <TableHead className="w-[80px] text-center font-bold text-black">조회</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow 
                key={post.id} 
                className={`
                  hover:bg-gray-50 transition-colors cursor-pointer
                  ${post.isNotice ? 'bg-[#fff5f5] hover:bg-[#ffebeb]' : ''}
                `}
              >
                <TableCell className="text-center text-xs text-gray-500 font-tahoma">
                  {post.isNotice ? <Badge variant="destructive" className="text-[10px] px-1 py-0 h-5">공지</Badge> : post.id}
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                   <Link to={`/forum/${post.id}`} className="block w-full">
                     {post.title}
                     {/* New badge if recent logic added later */}
                   </Link>
                </TableCell>
                <TableCell className="text-center text-sm text-gray-600">{post.author}</TableCell>
                <TableCell className="text-center text-xs text-gray-400 font-tahoma">{post.date}</TableCell>
                <TableCell className="text-center text-xs text-gray-400 font-tahoma">{post.views}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Mock */}
      <div className="mt-8 flex justify-center gap-1">
        <Button variant="outline" size="sm" disabled className="w-8 h-8 p-0">&lt;</Button>
        <Button variant="default" size="sm" className="w-8 h-8 p-0 bg-black hover:bg-gray-800">1</Button>
        <Button variant="outline" size="sm" className="w-8 h-8 p-0">2</Button>
        <Button variant="outline" size="sm" className="w-8 h-8 p-0">3</Button>
        <Button variant="outline" size="sm" className="w-8 h-8 p-0">&gt;</Button>
      </div>
    </div>
  );
}
