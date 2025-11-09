// import Footer from "@/components/Shared/Footer/Footer";
// import Navbar from "@/components/Shared/Navbar/Navbar";
// import { authOptions } from "@/utils/authOptions";
// import { getServerSession } from "next-auth";
import Footer from "@/src/components/shared/Footer";
import Navbar from "@/src/components/shared/Navbar/Navbar";

import React from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
