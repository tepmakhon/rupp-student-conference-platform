import { useCallback, useState } from "react";
import { getAuditLogs } from "../../api/adminApi";
import useApiQuery from "../../hooks/useApiQuery";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import Pagination from "../../components/common/Pagination";
import ResponsiveTable from "../../components/common/ResponsiveTable";
import { formatDate } from "../../utils/formatDate";

const columns = [
  { key: "createdAt", label: "Time", render: (log) => formatDate(log.createdAt) },
  { key: "actor", label: "Actor", render: (log) => log.user?.profile?.fullName || log.user?.email || "—" },
  { key: "action", label: "Action" },
  { key: "ipAddress", label: "IP address", render: (log) => log.ipAddress || "—" },
];
export default function AdminAuditLogsPage() {
  const [page, setPage] = useState(1);
  const loader = useCallback(() => getAuditLogs(page), [page]);
  const { data, loading, error, retry } = useApiQuery(loader);
  return <DashboardLayout><div className="max-w-7xl mx-auto space-y-6">
    <PageHeader title="Audit logs" description="Review recorded account and platform actions." />
    {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={retry} /> : <>
      <ResponsiveTable columns={columns} data={data?.logs || []} />
      <Pagination page={page} totalPages={data?.pagination?.totalPages || 0} onPageChange={setPage} />
    </>}
  </div></DashboardLayout>;
}
