function StudentRegisterForm({
  form,

  setForm,

  universities,

  faculties,

  majors,
}) {
  return (
    <div className="space-y-5">
      {/* Full Name */}

      <div>
        <label
          className="
            block
            mb-2
            font-medium
          "
        >
          Full Name
        </label>

        <input
          type="text"

          value={form.fullName}

          onChange={(e) =>
            setForm({
              ...form,

              fullName: e.target.value,
            })
          }

          placeholder="Enter full name"

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />
      </div>

      {/* University */}

      <div>
        <label
          className="
            block
            mb-2
            font-medium
          "
        >
          University
        </label>

        <select
          value={form.universityId}

          onChange={(e) =>
            setForm({
              ...form,

              universityId: e.target.value,
            })
          }

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        >
          <option value="">Select University</option>

          {universities.map((university) => (
            <option
              key={university.id}

              value={university.id}
            >
              {university.universityName}
            </option>
          ))}
        </select>
      </div>

      {/* Faculty */}

      <div>
        <label
          className="
            block
            mb-2
            font-medium
          "
        >
          Faculty
        </label>

        <select
          value={form.facultyId}

          onChange={(e) =>
            setForm({
              ...form,

              facultyId: e.target.value,
            })
          }

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        >
          <option value="">Select Faculty</option>

          {faculties.map((faculty) => (
            <option
              key={faculty.id}

              value={faculty.id}
            >
              {faculty.facultyName}
            </option>
          ))}
        </select>
      </div>

      {/* Major */}

      <div>
        <label
          className="
            block
            mb-2
            font-medium
          "
        >
          Major
        </label>

        <select
          value={form.majorId}

          onChange={(e) =>
            setForm({
              ...form,

              majorId: e.target.value,
            })
          }

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        >
          <option value="">Select Major</option>

          {majors.map((major) => (
            <option
              key={major.id}

              value={major.id}
            >
              {major.majorName}
            </option>
          ))}
        </select>
      </div>

      {/* Academic Year */}

      <div>
        <label
          className="
            block
            mb-2
            font-medium
          "
        >
          Academic Year
        </label>

        <input
          type="text"

          value={form.academicYear}

          onChange={(e) =>
            setForm({
              ...form,

              academicYear: e.target.value,
            })
          }

          placeholder="Year 1"

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />
      </div>
    </div>
  );
}

export default StudentRegisterForm;
