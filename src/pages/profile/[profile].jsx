import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalendarIcon, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { updateUser } from '@/routes/apiforUser.jsx';
import { useParams } from 'react-router-dom';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' }),
  lastname: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters.' }),
  identity_card: z
    .string()
    .min(9, { message: 'Identity card must be at least 9 characters.' }),
  gender: z.enum(['0', '1', 'other'], {
    required_error: 'Please select a gender.',
  }),
  avatar: z
    .any()
    .refine((files) => files?.length === 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
});

const Profile = () => {
  const [avatarPreview, setAvatarPreview] = useState();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const { id } = useParams();

  const onSubmit = async (values) => {
    console.log(values);
    const avatarFile = values.avatar?.[0]; // Lấy tệp từ FileList

    // Tạo một đối tượng FormData
    const formData = new FormData();

    // Thêm các trường khác vào FormData
    formData.append('firstname', values.firstname); // Đảm bảo sử dụng đúng tên trường
    formData.append('lastname', values.lastname); // Đảm bảo sử dụng đúng tên trường
    formData.append('identity_card', values.identity_card);
    formData.append('gender', values.gender);

    // Thêm avatar vào FormData (FileList)
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    try {
      const res = await updateUser(formData, id); // Giả sử `updateUser` hỗ trợ FormData
      if (res) {
        toast.success('User updated successfully');
      } else {
        toast.error('Failed to update user');
      }
    } catch (error) {
      toast.error(
        'Error updating user:',
        error.response?.data || error.message
      );
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Update Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={avatarPreview || ''} alt="Avatar" />
                  <AvatarFallback>
                    {form.watch('firstname')?.[0]}
                    {form.watch('lastname')?.[0]}
                  </AvatarFallback>
                </Avatar>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="avatar"
                        className="cursor-pointer mt-4"
                      >
                        <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <Upload className="h-4 w-4" />
                          Upload new avatar
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            handleAvatarChange(e);
                            onChange(e.target.files);
                          }}
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your public display first name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your public display last name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="identity_card"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identity Card</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your identity card number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="0" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Prefer not to say
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
