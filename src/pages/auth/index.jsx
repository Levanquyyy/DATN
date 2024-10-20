import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useFacebookLogin } from "@kazion/react-facebook-login";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import apiClient from "@/lib/api-client";
import { SIGNUP_ROUTE, SIGNIN_ROUTE } from "@/utilities/constant";
import { toast } from "sonner";
const Auth = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [emailForSignIn, setEmailForSignIn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordForSignIn, setPasswordForpasswordForSignIn] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const { setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateSignUp = () => {
    if (!first.length) {
      toast.warning(" First Name is required");
      return false;
    }
    if (!last.length) {
      toast.warning("Last Name is required");
      return false;
    }
    if (!phone.length) {
      toast.warning("Phone is required");
      return false;
    }
    if (!email.length) {
      toast.warning("Email is required");
      return false;
    }
    const emailCriteria = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailCriteria.test(email)) {
      toast.warning("Email không hợp lệ");
      return false;
    }
    if (!password.length) {
      toast.warning("Password is required");
      return false;
    }
    const passwordCriteria =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordCriteria.test(password)) {
      toast.warning(
        "Mật khẩu phải có viết hoa, thường, số, ký tự đặc biệt ít nhất 8 ký tự"
      );
      return false;
    }

    return true;
  };

  const login = useFacebookLogin({
    onSuccess: (response) => {
      console.log(response);
    },
  });

  const handleSignUp = async () => {
    setUserInfo({
      first,
      last,
      phone,
      email,
      password,
      fullName: `${first} ${last}`,
    });
    if (validateSignUp()) {
      const data = {
        username: first + last,
        firstname: first,
        lastname: last,
        phone,
        password,
        email,
      };

      try {
        const response = await apiClient.post(SIGNUP_ROUTE, data);
        if (response.data.status === "error") {
          throw new Error(response.data.message);
        }
        console.log(response);
        toast.success("Đăng ký thành công!");

        // Save the token in a cookie
        const { access_token, expires_in } = response.data;
        Cookies.set("access_token", access_token, {
          expires: new Date(expires_in),
          secure: true,
          sameSite: "strict",
        });
      } catch (error) {
        const errorMessage = error.message || "An unknown error occurred";
        console.error("Signup error:", errorMessage);
        toast.error(`Signup failed: ${errorMessage}`);
      }
    }
  };
  const handleSignIn = async () => {
    const data = {
      email: emailForSignIn,
      password: passwordForSignIn,
    };
    try {
      const response = await apiClient.post(SIGNIN_ROUTE, data);
      if (response.data.status) {
        // Save the token in a cookie
        const { access_token, expires_in } = response.data;
        Cookies.set("access_token", access_token, {
          expires: new Date(expires_in),
          secure: true,
          sameSite: "strict",
        });

        // Set user info to Zustand
        setUserInfo(response.data.user);

        // Navigate based on response status
        if (response.status === 200) {
          navigate("/home-page");
        } else {
          navigate("/auth");
        }
      }
      console.log(response);
    } catch (error) {
      console.error("Signin error:", error.response?.data || error.message);
      toast.error(
        `Signin failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Đăng Ký</TabsTrigger>
          <TabsTrigger value="password">Đăng Nhập</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Tài Khoản</CardTitle>
              <CardDescription>
                Thực hiện thay đổi cho tài khoản của bạn tại đây. Nhấp vào lưu
                khi bạn hoàn tất.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="first"> Họ</Label>
                <Input
                  id="first"
                  type="text"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="last"> Tên</Label>
                <Input
                  id="last"
                  type="text"
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email"> Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Mật Khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10" // Add padding to the right to avoid overlap with the button
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 text-blue-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-center my-2">Hoặc</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <GoogleLogin
                    size="large"
                    width={100}
                    onSuccess={(credentialResponse) => {
                      const decoded = jwtDecode(credentialResponse.credential);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />

                  <Button
                    className="bg-blue-500 flex-1 dark:text-white"
                    onClick={() => login()}
                  >
                    <FaFacebookF /> {""} Login With FaceBook
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignUp}>Đăng ký</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={emailForSignIn}
                  onChange={(e) => setEmailForSignIn(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Mật Khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    defaultValue="123"
                    className="pr-10" // Add padding to the right to avoid overlap with the button
                    onChange={(e) =>
                      setPasswordForpasswordForSignIn(e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 text-blue-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-center my-2">Hoặc</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <GoogleLogin
                    size="large"
                    width={100}
                    onSuccess={(credentialResponse) => {
                      const decoded = jwtDecode(credentialResponse.credential);
                      console.log(decoded);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />

                  <Button
                    className="bg-blue-500 flex-1 dark:text-white"
                    onClick={() => login()}
                  >
                    <FaFacebookF /> {""} Login With FaceBook
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignIn}>Đăng nhập</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
