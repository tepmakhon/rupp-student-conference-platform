import AdminCrudPage from "../../components/admin/AdminCrudPage";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import useApiQuery from "../../hooks/useApiQuery";
import { getUniversities } from "../../api/universityApi";
import { getFaculties, createFaculty, updateFaculty, deleteFaculty } from "../../api/facultyApi";

export default function AdminFacultiesPage() {
  const { data, loading, error, retry } = useApiQuery(getUniversities);
  if (loading || error) return <DashboardLayout>{loading ? <LoadingState /> : <ErrorState message={error} onRetry={retry} />}</DashboardLayout>;
  return <AdminCrudPage title="Faculties" description="Manage faculties and their universities." entityName="Faculty"
    columns={[
      { key: "facultyName", label: "Faculty Name" },
      { key: "university", label: "University", render: (item) => item.university?.universityName || "—" },
    ]}
    formFields={[
      { name: "facultyName", label: "Faculty Name", required: true },
      { name: "universityId", label: "University", type: "select", options: data || [], optionLabel: "universityName", required: true },
    ]}
    getAll={getFaculties} create={createFaculty} update={updateFaculty} remove={deleteFaculty} />;
}
