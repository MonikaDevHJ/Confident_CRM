"use client";

import PageLayout from "../../component/dashboard/PageLayout";

const Contact = () => {
  return (
    <PageLayout
      title="Contacts"
      description="Manage customer contact information."
    >
      <div className="border rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Contact List
        </h2>

        <p className="text-gray-500">
          All saved contacts will appear here.
        </p>

      </div>
    </PageLayout>
  );
};

export default Contact;