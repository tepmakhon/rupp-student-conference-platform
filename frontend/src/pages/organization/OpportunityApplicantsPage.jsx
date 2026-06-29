import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import ApplicantCard from "../../components/organization/ApplicantCard";

import { getApplicants } from "../../api/applicationApi";

import toast from "react-hot-toast";

function OpportunityApplicantsPage() {
  const { id } = useParams();

  const [applicants, setApplicants] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplicants();
  }, [id]);

  const loadApplicants = async () => {
    try {
      setLoading(true);

      const data = await getApplicants(id);

      setApplicants(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
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
        <div
          className="
            mb-8
          "
        >
          <h1
            className="
              text-4xl
              font-bold
              text-primary
            "
          >
            Opportunity Applicants
          </h1>

          <p
            className="
              text-gray-600
              mt-2
            "
          >
            Review and manage applicants.
          </p>
        </div>

        {loading ? (
          <div
            className="
                flex
                justify-center
                py-20
              "
          >
            Loading...
          </div>
        ) : applicants.length === 0 ? (
          <div
            className="
                bg-white
                rounded-2xl
                shadow-md
                p-10
                text-center
              "
          >
            <h2
              className="
                  text-2xl
                  font-bold
                  text-primary
                "
            >
              No Applicants Yet
            </h2>

            <p
              className="
                  text-gray-500
                  mt-2
                "
            >
              Nobody has applied yet.
            </p>
          </div>
        ) : (
          <div
            className="
                grid
                gap-6
              "
          >
            {applicants.map((applicant) => (
              <ApplicantCard
                key={applicant.id}

                applicant={applicant}

                onUpdate={loadApplicants}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default OpportunityApplicantsPage;
