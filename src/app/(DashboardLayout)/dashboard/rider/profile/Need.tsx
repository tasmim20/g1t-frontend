//   useEffect(() => {
//     const reduxToken = store.getState().auth.accessToken;
//     if (reduxToken && !getMemoryAccessToken()) setMemoryAccessToken(reduxToken);

//     const fetchProfile = async () => {
//       setLoading(true);
//       try {
//         const res = await instance.get<RiderProfile>("/user/profile/me");
//         setProfile(res.data);

//         // Pre-fill update form
//         setUpFirstName(res.data.firstName);
//         setUpLastName(res.data.lastName);
//         setUpBio(res.data.bio || "");
//         setUpAddress(res.data.address || "");
//         setUpMobileNumber(res.data.mobileNumber || "");
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to fetch profile"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);
