import AdminCrudPage from "../../components/admin/AdminCrudPage";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import useApiQuery from "../../hooks/useApiQuery";
import { getFaculties } from "../../api/facultyApi";
import { getMajors, createMajor, updateMajor, deleteMajor } from "../../api/majorApi";

export default function AdminMajorsPage() {
  const { data, loading, error, retry } = useApiQuery(getFaculties);
  if (loading || error) return <DashboardLayout>{loading ? <LoadingState /> : <ErrorState message={error} onRetry={retry} />}</DashboardLayout>;
  return <AdminCrudPage title="Majors" description="Manage majors and their faculties." entityName="Major"
    columns={[
      { key: "majorName", label: "Major Name" },
      { key: "faculty", label: "Faculty", render: (item) => item.faculty?.facultyName || "—" },
      { key: "careerPath", label: "Career Path" },
    ]}
    formFields={[
      { name: "majorName", label: "Major Name", required: true },
      { name: "facultyId", label: "Faculty", type: "select", options: data || [], optionLabel: "facultyName", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "careerPath", label: "Career Path" },
    ]}
    getAll={getMajors} create={createMajor} update={updateMajor} remove={deleteMajor} />;
}
