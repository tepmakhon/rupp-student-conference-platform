import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getUsers, updateAccountStatus } from "../../api/adminApi";
import useApiQuery from "../../hooks/useApiQuery";
import { getApiErrorMessage } from "../../utils/apiError";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import Pagination from "../../components/common/Pagination";
import ResponsiveTable from "../../components/common/ResponsiveTable";

export default function AdminUsersPage({ organizationsOnly = false }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [role, setRole] = useState(organizationsOnly ? "ORGANIZATION" : "");
  const [saving, setSaving] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);
  const loader = useCallback(() => getUsers({ page, limit: 10, search, role }), [page, search, role]);
  const { data, loading, error, retry } = useApiQuery(loader);
  const changeStatus = async (user) => {
    setSaving(user.id);
    try {
      await updateAccountStatus(user.id, user.accountStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE");
      toast.success("Account status updated");
      retry();
    } catch (error) { toast.error(getApiErrorMessage(error)); }
    finally { setSaving(null); }
  };
  const columns = [
    { key: "name", label: "Name", render: (user) => user.organization?.organizationName || user.profile?.fullName || "—" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (user) => user.role.roleName },
    { key: "accountStatus", label: "Status" },
    { key: "actions", label: "Actions", render: (user) => user.role.roleName === "ADMIN" || user.id === currentUser?.id ? "—" :
      <button disabled={saving !== null} onClick={() => changeStatus(user)} className="rounded-xl border px-4 py-2 disabled:opacity-50">
        {saving === user.id ? "Saving..." : user.accountStatus === "ACTIVE" ? "Suspend" : "Activate"}
      </button> },
  ];
  return <DashboardLayout><div className="max-w-7xl mx-auto space-y-6">
    <PageHeader title={organizationsOnly ? "Organizations" : "Users"} description="Review accounts and manage their access to the platform." />
    <form className="flex flex-col sm:flex-row gap-3" onSubmit={(event) => { event.preventDefault(); setSearch(draft.trim()); setPage(1); }}>
      <input aria-label="Search accounts" placeholder="Search name or email" value={draft} onChange={(event) => setDraft(event.target.value)} className="border rounded-xl p-3 min-w-0 flex-1" />
      {!organizationsOnly && <select aria-label="Filter by role" value={role} onChange={(event) => { setRole(event.target.value); setPage(1); }} className="border rounded-xl p-3">
        <option value="">All roles</option>{["STUDENT", "ORGANIZATION", "ADMIN"].map((item) => <option key={item}>{item}</option>)}
      </select>}
      <button className="bg-primary text-white px-5 py-3 rounded-xl">Search</button>
    </form>
    {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={retry} /> : <>
      <ResponsiveTable columns={columns} data={data?.users || []} />
      <Pagination page={page} totalPages={data?.pagination?.totalPages || 0} onPageChange={setPage} />
    </>}
  </div></DashboardLayout>;
}
