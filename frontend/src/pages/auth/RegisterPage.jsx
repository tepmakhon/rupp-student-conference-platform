import { useEffect, useState , useCallback } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { registerUser } from "../../api/authApi";

import { getUniversities } from "../../api/universityApi";

import { getFaculties } from "../../api/facultyApi";

import { getMajors } from "../../api/majorApi";

import RoleSelector from "../../components/auth/RoleSelector";

import StudentRegisterForm from "../../components/auth/StudentRegisterForm";

import OrganizationRegisterForm from "../../components/auth/OrganizationRegisterForm";

function RegisterPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT");

  const [loading, setLoading] = useState(false);

  const [universities, setUniversities] = useState([]);

  const [faculties, setFaculties] = useState([]);

  const [majors, setMajors] = useState([]);

  const [form, setForm] = useState({
    email: "",

    fullName: "",

    universityId: "",

    facultyId: "",

    majorId: "",

    academicYear: "",

    organizationName: "",

    description: "",
  });

  const loadData = useCallback(async () => {
    try {
      const [universityData, facultyData, majorData] = await Promise.all([
        getUniversities(),

        getFaculties(),

        getMajors(),
      ]);

      setUniversities(universityData);

      setFaculties(facultyData);

      setMajors(majorData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (active) loadData();
    });
    return () => { active = false; };
  }, [loadData]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = new FormData(e.currentTarget);
    const password = credentials.get("password");

    try {
      if (password !== credentials.get("confirmPassword")) {
        return toast.error("Passwords do not match");
      }

      setLoading(true);

      const payload = {
        email: form.email,

        password,

        roleName: role,
      };

      if (role === "STUDENT") {
        Object.assign(
          payload,

          {
            fullName: form.fullName,

            universityId: form.universityId,

            facultyId: form.facultyId,

            majorId: form.majorId,

            academicYear: form.academicYear,
          },
        );
      }

      if (role === "ORGANIZATION") {
        Object.assign(
          payload,

          {
            organizationName: form.organizationName,

            description: form.description,
          },
        );
      }

      await registerUser(payload);

      toast.success("Account created");

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="

      min-h-screen

      bg-gray-50

      flex

      items-center

      justify-center

      px-4

      py-10

      "
    >
      <div
        className="

        w-full

        max-w-2xl

        bg-white

        rounded-3xl

        shadow-lg

        p-10

        "
      >
        <div className="text-center mb-8">
          <h1
            className="

            text-4xl

            font-bold

            text-primary

            "
          >
            Create Account
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}

          className="space-y-5"
        >
          <RoleSelector
            role={role}

            setRole={setRole}
          />

          <input
            type="email"
            aria-label="Email"
            autoComplete="email"
            required

            placeholder="Email"

            value={form.email}

            onChange={(e) =>
              setForm({
                ...form,

                email: e.target.value,
              })
            }

            className="

            w-full

            border

            rounded-xl

            px-4

            py-3

            "
          />

          <input
            type="password"

            aria-label="Password"
            placeholder="Password"

            name="password"
            autoComplete="new-password"
            required
            minLength={8}

            className="

            w-full

            border

            rounded-xl

            px-4

            py-3

            "
          />

          <input
            type="password"

            aria-label="Confirm password"
            placeholder="Confirm Password"

            name="confirmPassword"
            autoComplete="new-password"
            required
            minLength={8}

            className="

            w-full

            border

            rounded-xl

            px-4

            py-3

            "
          />

          {role === "STUDENT" ? (
            <StudentRegisterForm
              form={form}

              setForm={setForm}

              universities={universities}

              faculties={faculties}

              majors={majors}
            />
          ) : (
            <OrganizationRegisterForm
              form={form}

              setForm={setForm}
            />
          )}

          <button
            disabled={loading}

            className="

            w-full

            bg-primary

            hover:bg-secondary

            text-white

            py-3

            rounded-xl

            "
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
