export const createAuthSlice = (set) => ({
  userInfo: undefined,
  data: null,
  imageNames: null,
  video: null,
  forsale: null,
  forrent: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  setFormData: (data, imageNames, video, forsale) =>
    set({ data, imageNames, video, forsale }),
});
