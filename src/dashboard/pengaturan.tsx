import { Alert } from "../components/alert";
import DashboardLayout, { LayoutSettingsPage } from "../layout/dashboardlayout";

export default function PengaturanPage() {
  return (
    <DashboardLayout setting={true}>
      <LayoutSettingsPage>
        <Alert type="info">
          Semua perubahan data akan berpengaruh terhadap ...
        </Alert>
      </LayoutSettingsPage>
    </DashboardLayout>
  );
}
