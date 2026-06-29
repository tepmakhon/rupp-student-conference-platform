import { useEffect, useMemo, useState, useCallback } from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import AdminPageHeader from "./AdminPageHeader";

import AdminDataTable from "./AdminDataTable";

import AdminFormModal from "./AdminFormModal";

import DeleteConfirmationModal from "./DeleteConfirmationModal";

import Input from "../ui/Input";

import Select from "../ui/Select";

import Textarea from "../ui/Textarea";

function AdminCrudPage({
  title,

  description,

  entityName,

  columns,

  formFields,

  getAll,

  create,

  update,

  remove,
}) {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({});

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getAll();

      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      toast.error(`Failed to load ${entityName}`);
    } finally {
      setLoading(false);
    }
  }, [entityName, getAll]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filtered = useMemo(() => {
    if (!search) {
      return items;
    }

    return items.filter((item) =>
      JSON.stringify(item)

        .toLowerCase()

        .includes(search.toLowerCase()),
    );
  }, [items, search]);

  const handleAdd = () => {
    setSelected(null);

    const initial = {};

    formFields.forEach((field) => {
      initial[field.name] = field.defaultValue || "";
    });

    setForm(initial);

    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelected(item);

    const values = {};

    formFields.forEach((field) => {
      values[field.name] = item[field.name] ?? "";
    });

    setForm(values);

    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selected) {
        await update(
          selected.id,

          form,
        );

        toast.success(`${entityName} updated`);
      } else {
        await create(form);

        toast.success(`${entityName} created`);
      }

      setModalOpen(false);

      await loadData();
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async () => {
    try {
      await remove(selected.id);

      toast.success(`${entityName} deleted`);

      setDeleteOpen(false);

      await loadData();
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <DashboardLayout>
      <div
        className="

          max-w-7xl

          mx-auto

        "
      >
        <AdminPageHeader
          title={title}

          description={description}

          addLabel={`

            Add ${entityName}

          `}

          onAdd={handleAdd}
        />

        <AdminDataTable
          columns={columns}

          data={filtered}

          loading={loading}

          search={search}

          setSearch={setSearch}

          onEdit={handleEdit}

          onDelete={(item) => {
            setSelected(item);

            setDeleteOpen(true);
          }}
        />

        <AdminFormModal
          open={modalOpen}

          title={selected ? `Edit ${entityName}` : `Create ${entityName}`}

          onClose={() => setModalOpen(false)}

          onSubmit={handleSubmit}
        >
          {formFields.map((field) => (
            <div key={field.name}>
              {field.type === "textarea" ? (
                <Textarea
                  label={field.label}

                  value={form[field.name] || ""}

                  rows={field.rows || 4}

                  placeholder={field.placeholder}

                  onChange={(e) =>
                    setForm({
                      ...form,

                      [field.name]: e.target.value,
                    })
                  }
                />
              ) : field.type === "select" ? (
                <Select
                  label={field.label}

                  value={form[field.name] || ""}

                  options={field.options || []}

                  optionValue={field.optionValue || "id"}

                  optionLabel={field.optionLabel || "name"}

                  placeholder={field.placeholder || "Select"}

                  onChange={(e) =>
                    setForm({
                      ...form,

                      [field.name]: e.target.value,
                    })
                  }
                />
              ) : (
                <Input
                  label={field.label}

                  type={field.type || "text"}

                  value={form[field.name] || ""}

                  placeholder={field.placeholder}

                  disabled={field.disabled}

                  onChange={(e) =>
                    setForm({
                      ...form,

                      [field.name]: e.target.value,
                    })
                  }
                />
              )}
            </div>
          ))}
        </AdminFormModal>

        <DeleteConfirmationModal
          open={deleteOpen}

          title={
            selected?.name || selected?.title || selected?.categoryName || ""
          }

          onClose={() => setDeleteOpen(false)}

          onConfirm={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}

export default AdminCrudPage;
