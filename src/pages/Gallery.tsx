import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GalleryCard } from "@/components/ui/GalleryCard";
import { Plus, Loader2, ImagePlus, Filter, SortAsc } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useGalleryPosts, useUploadGalleryPost } from "@/hooks/useGallery";
import { useToast } from "@/hooks/use-toast";

export default function Gallery() {
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [category, setCategory] = useState<string>("all");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { data: posts, isLoading } = useGalleryPosts(sortBy);
  const uploadMutation = useUploadGalleryPost();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!uploadTitle.trim() || !uploadFile) {
      toast({
        variant: "destructive",
        title: "입력 오류",
        description: "제목과 이미지를 모두 입력해주세요.",
      });
      return;
    }

    try {
      await uploadMutation.mutateAsync({
        title: uploadTitle,
        description: uploadDescription,
        imageFile: uploadFile,
      });
      toast({
        title: "업로드 완료",
        description: "사진이 성공적으로 업로드되었습니다.",
      });
      setIsUploadOpen(false);
      setUploadTitle("");
      setUploadDescription("");
      setUploadFile(null);
      setPreviewUrl(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "업로드 실패",
        description: "사진 업로드 중 오류가 발생했습니다.",
      });
    }
  };

  // Filter posts by category (client-side filtering for now)
  // TODO: Add category field to galleries table in database
  const filteredPosts = posts?.filter(post => {
    if (category === "all") return true;
    // Temporarily disabled until category field is added to database
    return (post as any).category === category;
  }) || [];

  return (
    <div className="container-custom py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">갤러리</h1>
          <p className="mt-1 text-muted-foreground">샤오미 스마트폰으로 촬영한 작품들</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Category Filter */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-32">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="nature">자연</SelectItem>
              <SelectItem value="city">도시</SelectItem>
              <SelectItem value="portrait">인물</SelectItem>
              <SelectItem value="other">기타</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as "latest" | "popular")}>
            <SelectTrigger className="w-32">
              <SortAsc className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="popular">인기순</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Upload Button */}
          {user ? (
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  업로드
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>사진 업로드</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">제목 *</Label>
                    <Input
                      id="title"
                      placeholder="사진 제목을 입력하세요"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">설명</Label>
                    <Textarea
                      id="description"
                      placeholder="사진에 대한 설명을 입력하세요"
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>이미지 *</Label>
                    <div className="border-2 border-dashed rounded-lg p-4">
                      {previewUrl ? (
                        <div className="relative">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setUploadFile(null);
                              setPreviewUrl(null);
                            }}
                          >
                            변경
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center h-32 cursor-pointer">
                          <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">
                            클릭하여 이미지 선택
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={handleUpload}
                    disabled={uploadMutation.isPending}
                    className="w-full"
                  >
                    {uploadMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        업로드 중...
                      </>
                    ) : (
                      "업로드"
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button asChild>
              <Link to="/auth">
                <Plus className="mr-2 h-4 w-4" />
                업로드
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="overflow-hidden border shadow-sm">
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-muted animate-pulse" />
                <div className="p-2 space-y-2">
                  <div className="h-3 bg-muted animate-pulse rounded" />
                  <div className="h-2 w-1/2 bg-muted animate-pulse rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4">
          {filteredPosts.map((item) => (
            <GalleryCard
              key={item.id}
              id={item.id}
              image_url={item.image_url}
              title={item.title}
              username={item.profiles?.username}
              likes_count={item.likes_count}
              views={item.views}
              compact
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <ImagePlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">아직 업로드된 사진이 없습니다</h3>
          <p className="text-muted-foreground mb-4">첫 번째 사진을 업로드해보세요!</p>
          {user ? (
            <Button onClick={() => setIsUploadOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              사진 업로드
            </Button>
          ) : (
            <Button asChild>
              <Link to="/auth">로그인하고 업로드하기</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
