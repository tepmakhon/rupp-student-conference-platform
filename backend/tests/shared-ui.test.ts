import { describe, expect, it, vi } from "vitest";
import React from "../../frontend/node_modules/react/index.js";
import { renderToStaticMarkup } from "../../frontend/node_modules/react-dom/server.node.js";
import Input from "../../frontend/src/components/ui/Input.jsx";
import Pagination from "../../frontend/src/components/common/Pagination.jsx";
import SafeImage from "../../frontend/src/components/common/SafeImage.jsx";
import EventForm from "../../frontend/src/components/events/EventForm.jsx";
import AdminDataTable from "../../frontend/src/components/admin/AdminDataTable.jsx";

vi.stubGlobal("React", React);
const render = (component: any, props: any) => renderToStaticMarkup(React.createElement(component, props));
describe("shared UI rendering", () => {
  it("associates shared form labels with inputs and forwards accessibility attributes", () => {
    const html = render(Input, { label: "Name", id: "full-name", "aria-describedby": "name-help" });
    expect(html).toContain('for="full-name"'); expect(html).toContain('id="full-name"'); expect(html).toContain('aria-describedby="name-help"');
  });
  it("bounds pagination controls for large result sets", () => {
    const html = render(Pagination, { page: 500, totalPages: 10000, onPageChange: vi.fn() });
    expect((html.match(/<button/g) || []).length).toBe(7);
    expect(html).toContain('aria-current="page"');
    expect(html).toContain("Page 500 of 10000");
  });
  it("renders an offline-safe placeholder for missing images", () => {
    const html = render(SafeImage, { alt: "Workshop" });
    expect(html).toContain('src="/image-placeholder.svg"'); expect(html).toContain('loading="lazy"');
  });
  it("initializes event editing fields from loaded values without an effect", () => {
    const html = render(EventForm, { initialData: { title: "Existing workshop", eventDate: "2027-01-01T10:00" }, categories: [], onSubmit: vi.fn(), submitText: "Save Changes" });
    expect(html).toContain('value="Existing workshop"'); expect(html).toContain('value="2027-01-01T10:00"');
  });
  it("supports read-only records without edit/delete buttons", () => {
    const html = render(AdminDataTable, { columns: [{ key: "name", label: "Name" }], data: [{ id: "1", name: "RUPP" }] });
    expect(html).toContain("RUPP"); expect(html).not.toContain("Edit record"); expect(html).not.toContain("Delete record");
  });
});
