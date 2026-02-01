import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Calendar, ArrowLeft, Send, Trash2, Loader2, ZoomIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useGalleryPost, useToggleLike } from "@/hooks/useGallery";
import { useComments, useCreateComment, useDeleteComment } from "@/hooks/useComments";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function GalleryDetail() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: post, isLoading: postLoading } = useGalleryPost(id!);
  const { data: comments, isLoading: commentsLoading } = useComments(id!);
  const toggleLikeMutation = useToggleLike();
  const createCommentMutation = useCreateComment();
  const deleteCommentMutation = useDeleteComment();

  const handleLike = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "로그인 필요",
        description: "좋아요를 누르려면 로그인이 필요합니다.",
      });
      return;
    }

    try {
      await toggleLikeMutation.mutateAsync({
        postId: id!,
        isLiked: post?.is_liked || false,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "좋아요 처리 중 오류가 발생했습니다.",
      });
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (!user) {
      toast({
        variant: "destructive",
        title: "로그인 필요",
        description: "댓글을 작성하려면 로그인이 필요합니다.",
      });
      return;
    }

    try {
      await createCommentMutation.mutateAsync({
        postId: id!,
        content: comment,
      });
      setComment("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "댓글 작성 중 오류가 발생했습니다.",
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteCommentMutation.mutateAsync({
        commentId,
        postId: id!,
      });
      toast({
        title: "삭제 완료",
        description: "댓글이 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "댓글 삭제 중 오류가 발생했습니다.",
      });
    }
  };

  if (postLoading) {
    return (
      <div className="container-custom py-8 lg:py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-6 w-32 bg-muted rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="aspect-[4/3] bg-muted rounded-lg" />
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-muted rounded-lg" />
              <div className="h-48 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">게시물을 찾을 수 없습니다</h1>
        <Button asChild>
          <Link to="/gallery">갤러리로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 lg:py-12">
      {/* Back Button */}
      <Link
        to="/gallery"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        갤러리로 돌아가기
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image */}
        <div className="lg:col-span-2">
          <Card className="group overflow-hidden border-0 shadow-lg relative cursor-pointer">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-auto object-contain max-h-[70vh] bg-muted"
              onClick={() => window.open(post.image_url, '_blank')}
            />
            <div 
              className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center"
              onClick={() => window.open(post.image_url, '_blank')}
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
                <ZoomIn className="h-6 w-6 text-foreground" />
              </div>
            </div>
          </Card>
          <p className="text-xs text-muted-foreground mt-2 text-center">클릭하여 원본 이미지 보기</p>
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Author & Stats */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.profiles?.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {(post.profiles?.username || "?").charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">
                    {post.profiles?.username || "익명"}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(post.created_at), "yyyy년 M월 d일", { locale: ko })}
                  </p>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-foreground mb-2">{post.title}</h1>
              {post.description && (
                <p className="text-muted-foreground mb-6">{post.description}</p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-6 mb-6">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Eye className="h-5 w-5" />
                  <span>{post.views}</span>
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-xs font-medium">좋아요</span>
                  <span>{post.likes_count || 0}</span>
                </span>
              </div>

              {/* Like Button */}
              {user ? (
                <Button
                  onClick={handleLike}
                  variant={post.is_liked ? "default" : "outline"}
                  className="w-full"
                  disabled={toggleLikeMutation.isPending}
                >
                  {post.is_liked ? "좋아요 취소" : "좋아요"}
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full">
                  <Link to="/auth">
                    로그인 후 좋아요
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold">댓글 ({comments?.length || 0})</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Comment Form */}
              {user ? (
                <form onSubmit={handleSubmitComment} className="flex gap-2">
                  <Textarea
                    placeholder="댓글을 입력하세요..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="shrink-0"
                    disabled={createCommentMutation.isPending}
                  >
                    {createCommentMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    댓글을 작성하려면 로그인이 필요합니다
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/auth">로그인</Link>
                  </Button>
                </div>
              )}

              {/* Comment List */}
              <div className="space-y-4 pt-4 border-t">
                {commentsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-3 animate-pulse">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-24 bg-muted rounded" />
                          <div className="h-4 w-full bg-muted rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : comments && comments.length > 0 ? (
                  comments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={c.profiles?.avatar_url || undefined} />
                        <AvatarFallback className="text-xs bg-muted">
                          {(c.profiles?.username || "?").charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium">
                            {c.profiles?.username || "익명"}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(c.created_at), "M월 d일", { locale: ko })}
                            </span>
                            {user && c.user_id === user.id && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleDeleteComment(c.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{c.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
