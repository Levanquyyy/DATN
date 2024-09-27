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
const Auth = () => {
  const [name, setName] = useState("Le Van Quy");
  const [phone, setPhone] = useState("0922143002");
  const [password, setPassword] = useState("123");
  const [errorName, setErrorName] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateName = (value) => {
    if (!value) {
      setErrorName("Họ tên không được để trống");
    } else {
      setErrorName("");
    }
  };

  const validatePhone = (value) => {
    const phonePattern = /^[0-9]{10}$/; // Example pattern for a 10-digit phone number
    if (!phonePattern.test(value)) {
      setErrorPhone("Số điện thoại không hợp lệ");
    } else {
      setErrorPhone("");
    }
  };

  const validatePassword = (value) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // At least 6 characters, one uppercase, one lowercase
    if (!passwordPattern.test(value)) {
      setErrorPassword(
        "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa và chữ thường"
      );
    } else {
      setErrorPassword("");
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    validatePhone(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  useEffect(() => {
    setIsFormValid(
      !errorName && !errorPhone && !errorPassword && name && phone && password
    );
  }, [errorName, errorPhone, errorPassword, name, phone, password]);

  const login = useFacebookLogin({
    onSuccess: (response) => {
      console.log(response);
    },
  });

  const handleSignIn = async () => {
    setUserInfo({
      name,
      phone,
      password,
    });
    navigate("/home-page");
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
                <Label htmlFor="name">Họ tên</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
                {errorName && <p className="text-red-500">{errorName}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  type="number"
                  value={phone}
                  onChange={handlePhoneChange}
                />
                {errorPhone && <p className="text-red-500">{errorPhone}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Mật Khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
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
                {errorPassword && (
                  <p className="text-red-500">{errorPassword}</p>
                )}
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
              <Button onClick={handleSignIn} disabled={!isFormValid}>
                Save changes
              </Button>
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
                  onChange={handlePhoneChange}
                />
                {errorPhone && <p className="text-red-500">{errorPhone}</p>}
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
