import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ENDOPOINTS } from "@/api/endpoints";
import { toast } from "@/components/ui/use-toast";
import { TokenContext, TokenContextType } from "@/context/TokenContext";
import { Titled } from "react-titled";

export default function Login() {
  const { setToken } = useContext(TokenContext) as TokenContextType;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: () =>
      fetch(ENDOPOINTS.LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              throw new Error(data.message);
            });
          }
          return res.json();
        })
        .catch((error) => {
          throw new Error(error.message);
        }),
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Login Successful",
        description: `"You'll be redirected in 3 seconds.`,
      });
      localStorage.setItem("token", data.jwtToken);
      setToken(data.jwtToken);
      const wait = () => new Promise((resolve) => setTimeout(resolve, 3000));
      wait().then(() => navigate("/article-gallery/all/all"));
    },
  });

  function handleLogin() {
    toast({
      title: "Logging in...",
      description: "Please wait...",
    });
    loginMutation.mutate();
  }

  return (
    <div className="relative mx-auto flex w-10/12 max-w-6xl flex-col gap-20 lg:w-full">
      <div>
        <div className="absolute left-[8%] top-16 -z-30 h-[32rem] w-56 -rotate-[30deg] rounded-full bg-primary opacity-40 blur-[72px] filter dark:opacity-30 lg:left-[18%]"></div>
        <div className="absolute left-[45%] -z-30 h-[30rem] w-28 -rotate-[30deg] rounded-full bg-destructive opacity-50 blur-[72px] filter dark:opacity-45 lg:left-[70%]"></div>

        <div className="absolute left-[35%] top-20 -z-30 h-[20rem] w-28 rotate-[45deg] rounded-full bg-purple-600 opacity-50 blur-[72px] filter dark:opacity-45 lg:left-[50%]"></div>
      </div>
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader className="">
          <CardTitle>Login</CardTitle>
          <CardDescription>to your account</CardDescription>
        </CardHeader>
        <CardContent className="mt-4 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={handleLogin} disabled={loginMutation.isPending}>
            Login
          </Button>
        </CardFooter>
      </Card>
      <Titled title="Login | Ray's Blog" />
    </div>
  );
}
