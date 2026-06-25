import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5">
        <h1 className="text-3xl font-bold text-blue-600">
          CRM Pro
        </h1>

        <Link
          href="/sign-in"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Manage Leads.
              <br />
              Close Deals.
              <br />
              Grow Faster.
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              A simple CRM platform to manage leads,
              track customer interactions, add notes,
              and improve sales productivity.
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                href="/sign-up"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
              >
                Get Started
              </Link>

              <Link
                href="/sign-in"
                className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="text-gray-500 text-sm">
                  Total Leads
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  50
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <h3 className="text-gray-500 text-sm">
                  New Leads
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  10
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl">
                <h3 className="text-gray-500 text-sm">
                  Contacted
                </h3>
                <p className="text-3xl font-bold text-yellow-600">
                  20
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl">
                <h3 className="text-gray-500 text-sm">
                  Closed
                </h3>
                <p className="text-3xl font-bold text-purple-600">
                  20
                </p>
              </div>
            </div>

            <div className="mt-6 border rounded-xl p-4">
              <h3 className="font-semibold mb-4">
                Recent Leads
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Ravi Kumar</span>
                  <span className="text-green-600">New</span>
                </div>

                <div className="flex justify-between">
                  <span>Priya Sharma</span>
                  <span className="text-yellow-600">
                    Contacted
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Amit Patel</span>
                  <span className="text-purple-600">
                    Closed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg">
              Lead Management
            </h3>
            <p className="text-gray-600 mt-2">
              Create, update and manage leads easily.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg">
              Notes & Follow-ups
            </h3>
            <p className="text-gray-600 mt-2">
              Track customer conversations and actions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg">
              Analytics Dashboard
            </h3>
            <p className="text-gray-600 mt-2">
              Monitor sales performance in real-time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;