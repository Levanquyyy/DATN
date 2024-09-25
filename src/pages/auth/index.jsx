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
import { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
const Auth = () => {
  const [phone, setPhone] = useState("0922143002");
  const [errorphone, setErrorPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const phonePattern = /^[0-9]{10}$/; // Example pattern for a 10-digit phone number

    if (!phonePattern.test(value)) {
      setErrorPhone("Số điện thoại không hợp lệ");
    } else {
      setErrorPhone("");
    }

    setPhone(value);
  };
  const login = useFacebookLogin({
    onSuccess: (response) => {
      console.log(response);
    },
  });
  console.log(import.meta.env.VITE_CLIENT_ID_OF_GOOGLE);
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
                <Label htmlFor="name">Họ tên</Label>
                <Input id="name" defaultValue="09221430122" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  type="number"
                  value={phone}
                  onChange={handleChange}
                />
                {errorphone && <p className="text-red-500">{errorphone}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Mật Khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    defaultValue="123"
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
              <Button>Save changes</Button>
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
                <Label htmlFor="current">Số điện thoại</Label>
                <Input
                  id="phone"
                  type="number"
                  value={phone}
                  onChange={handleChange}
                />
                {errorphone && <p className="text-red-500">{errorphone}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Mật Khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    defaultValue="123"
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
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Auth;
