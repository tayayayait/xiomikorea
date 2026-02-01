import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Mail, Lock, User, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") === "signup" ? "signup" : "login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup form
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        if (error.message === "Invalid login credentials") {
          setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else if (error.message === "Email not confirmed") {
          setError("이메일 인증이 필요합니다. 이메일을 확인해주세요.");
        } else {
          setError(error.message);
        }
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation
    if (signupPassword !== signupConfirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    if (signupPassword.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      setIsLoading(false);
      return;
    }

    if (!signupUsername.trim()) {
      setError("닉네임을 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username: signupUsername,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          setError("이미 가입된 이메일입니다.");
        } else {
          setError(error.message);
        }
      } else {
        toast({
          title: "회원가입 완료",
          description: "이메일 인증 링크를 확인해주세요.",
        });
        setActiveTab("login");
      }
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="container-custom py-16 lg:py-24">
        <div className="mx-auto max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Camera className="h-6 w-6 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="mt-4 text-2xl font-bold text-foreground">샤오미코리아 커뮤니티</h1>
            <p className="mt-2 text-muted-foreground">사진을 나누는 공간</p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">로그인</TabsTrigger>
                  <TabsTrigger value="signup">회원가입</TabsTrigger>
                </TabsList>

                {error && (
                  <div className="mt-4 flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <TabsContent value="login" className="mt-4">
                  <CardTitle>로그인</CardTitle>
                  <CardDescription>계정에 로그인하세요</CardDescription>
                </TabsContent>
                <TabsContent value="signup" className="mt-4">
                  <CardTitle>회원가입</CardTitle>
                  <CardDescription>새 계정을 만드세요</CardDescription>
                </TabsContent>
              </Tabs>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">이메일</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="example@email.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">비밀번호</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "로그인 중..." : "로그인"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-username">닉네임</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signup-username"
                          type="text"
                          placeholder="닉네임"
                          value={signupUsername}
                          onChange={(e) => setSignupUsername(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">이메일</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="example@email.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">비밀번호</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="6자 이상 입력"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">비밀번호 확인</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="signup-confirm-password"
                          type="password"
                          placeholder="비밀번호 재입력"
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "가입 중..." : "회원가입"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
