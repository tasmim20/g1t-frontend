import DashboardDrawer from "@/src/components/DashboardDrawer/DashboardDrawer";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default Dashboardlayout;
