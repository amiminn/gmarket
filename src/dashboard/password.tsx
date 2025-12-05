import { Alert } from "../components/alert";
import DashboardLayout, { LayoutSettingsPage } from "../layout/dashboardlayout";

export default function PasswordPage() {
  return (
    <DashboardLayout setting={true}>
      <LayoutSettingsPage>
        <Alert type="info">Soon</Alert>
      </LayoutSettingsPage>
    </DashboardLayout>
  );
}
