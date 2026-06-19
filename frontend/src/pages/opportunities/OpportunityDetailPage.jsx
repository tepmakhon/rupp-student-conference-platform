import {

  useEffect,

  useState,

  useCallback,

} from "react";

import {

  useParams,

} from "react-router-dom";

import toast
from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import PageHeader
from "../../components/common/PageHeader";

import LoadingState
from "../../components/common/LoadingState";

import ErrorState
from "../../components/common/ErrorState";

import Button
from "../../components/ui/Button";

import {

  getOpportunityById,

  saveOpportunity,

  unsaveOpportunity,

  applyOpportunity,

} from "../../api/opportunityApi";

import {

  formatDate,

} from "../../utils/formatDate";

function OpportunityDetailPage() {

  const { id } =

    useParams();

  const [

    opportunity,

    setOpportunity,

  ] = useState(null);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    error,

    setError,

  ] = useState("");

  const [

    saving,

    setSaving,

  ] = useState(false);

  const [

    applying,

    setApplying,

  ] = useState(false);

  const [

    saved,

    setSaved,

  ] = useState(false);

  const loadOpportunity =

    useCallback(

      async () => {

        try {

          setLoading(

            true

          );

          setError(

            ""

          );

          const data =

            await getOpportunityById(

              id

            );

          setOpportunity(

            data

          );

          setSaved(

            data?.isSaved

            ||

            false

          );

        }

        catch (error) {

          console.error(

            error

          );

          setError(

            "Failed to load opportunity"

          );

        }

        finally {

          setLoading(

            false

          );

        }

      },

      [

        id,

      ]

    );

  useEffect(() => {

    loadOpportunity();

  },

  [

    loadOpportunity,

  ]);

  const handleSave =

    async () => {

      try {

        setSaving(

          true

        );

        if (

          saved

        ) {

          await unsaveOpportunity(

            id

          );

          setSaved(

            false

          );

          toast.success(

            "Removed from saved"

          );

        }

        else {

          await saveOpportunity(

            id

          );

          setSaved(

            true

          );

          toast.success(

            "Opportunity saved"

          );

        }

      }

      catch (error) {

        console.error(

          error

        );

        toast.error(

          error?.response

          ?.data?.message

          ||

          "Failed to save"

        );

      }

      finally {

        setSaving(

          false

        );

      }

    };

  const handleApply =

    async () => {

      try {

        setApplying(

          true

        );

        await applyOpportunity(

          id,

          {}

        );

        toast.success(

          "Application submitted"

        );

      }

      catch (error) {

        console.error(

          error

        );

        toast.error(

          error?.response

          ?.data?.message

          ||

          "Application failed"

        );

      }

      finally {

        setApplying(

          false

        );

      }

    };

  return (

    <DashboardLayout>

      <div

        className="

          max-w-6xl

          mx-auto

        "

      >

        {

          loading

          &&

          <LoadingState />

        }

        {

          !loading

          &&

          error

          &&

          (

            <ErrorState

              message={

                error

              }

            />

          )

        }

        {

          !loading

          &&

          !error

          &&

          opportunity

          &&

          (

            <div

              className="

                bg-white

                rounded-2xl

                overflow-hidden

                shadow-sm

                border

              "

            >

              <img

                src={

                  opportunity.coverImageUrl

                  ||

                  "https://placehold.co/1200x500?text=Opportunity"

                }

                alt={

                  opportunity.title

                }

                className="

                  w-full

                  h-96

                  object-cover

                "

              />

              <div

                className="

                  p-8

                "

              >

                <PageHeader

                  title={

                    opportunity.title

                  }

                  description={

                    opportunity.organization

                    ?.organizationName

                  }

                />

                <div

                  className="

                    grid

                    md:grid-cols-3

                    gap-5

                    my-8

                  "

                >

                  <div

                    className="

                      bg-gray-50

                      rounded-xl

                      p-5

                    "

                  >

                    <p

                      className="

                        text-gray-500

                      "

                    >

                      Type

                    </p>

                    <p

                      className="

                        font-semibold

                      "

                    >

                      {

                        opportunity.type

                        ?.typeName

                      }

                    </p>

                  </div>

                  <div

                    className="

                      bg-gray-50

                      rounded-xl

                      p-5

                    "

                  >

                    <p

                      className="

                        text-gray-500

                      "

                    >

                      Deadline

                    </p>

                    <p

                      className="

                        font-semibold

                      "

                    >

                      {

                        opportunity.deadline

                        ?

                        formatDate(

                          opportunity.deadline

                        )

                        :

                        "No deadline"

                      }

                    </p>

                  </div>

                  <div

                    className="

                      bg-gray-50

                      rounded-xl

                      p-5

                    "

                  >

                    <p

                      className="

                        text-gray-500

                      "

                    >

                      Status

                    </p>

                    <p

                      className="

                        font-semibold

                        text-secondary

                      "

                    >

                      {

                        opportunity.status

                      }

                    </p>

                  </div>

                </div>

                <div

                  className="

                    space-y-8

                  "

                >

                  <div>

                    <h2

                      className="

                        text-2xl

                        font-bold

                        text-primary

                        mb-3

                      "

                    >

                      Description

                    </h2>

                    <p

                      className="

                        text-gray-700

                      "

                    >

                      {

                        opportunity.description

                      }

                    </p>

                  </div>

                  <div>

                    <h2

                      className="

                        text-2xl

                        font-bold

                        text-primary

                        mb-3

                      "

                    >

                      Requirements

                    </h2>

                    <p

                      className="

                        text-gray-700

                        whitespace-pre-line

                      "

                    >

                      {

                        opportunity.requirements

                        ||

                        "No requirements provided."

                      }

                    </p>

                  </div>

                </div>

                <div

                  className="

                    flex

                    flex-wrap

                    gap-4

                    mt-10

                  "

                >

                  <Button

                    onClick={

                      handleApply

                    }

                    disabled={

                      applying

                    }

                  >

                    {

                      applying

                      ?

                      "Applying..."

                      :

                      "Apply Now"

                    }

                  </Button>

                  <Button

                    variant={

                      saved

                      ?

                      "secondary"

                      :

                      "outline"

                    }

                    onClick={

                      handleSave

                    }

                    disabled={

                      saving

                    }

                  >

                    {

                      saving

                      ?

                      "Saving..."

                      :

                      saved

                      ?

                      "Saved"

                      :

                      "Save Opportunity"

                    }

                  </Button>

                </div>

              </div>

            </div>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default OpportunityDetailPage;