export const createAuthSlice = (set) => ({
  userInfo: undefined,
  data: null,
  imageNames: null,
  video: null,
  forsale: null,
  forrent: null,

  page1020: null,
  setpage1020: (page1020) => set({ page1020 }),
  page1060: null,
  setpage1060: (page1060) => set({ page1060 }),
  page1070: null,
  setpage1070: (page1070) => set({ page1070 }),
  page1080: null,
  setpage1080: (page1080) => set({ page1080 }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setFormData: (data, imageNames, video, forsale) =>
    set({ data, imageNames, video, forsale }),
});
