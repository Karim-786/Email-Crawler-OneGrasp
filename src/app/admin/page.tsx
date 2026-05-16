"use client";

import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Users,
  Brain,
  Settings,
  Upload,
  BarChart3,
} from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen flex bg-[#f5f5f5]">

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#1f2937] text-white p-8 flex flex-col">

        {/* Logo */}
        <div>
          <h1 className="text-4xl font-black text-red-600">
            OneGrasp
          </h1>

          <p className="text-gray-400 text-sm tracking-[3px] mt-2">
            ADMIN PANEL
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="mt-14 flex flex-col gap-4">

          <button className="flex items-center gap-4 bg-red-600 px-5 py-4 rounded-2xl font-medium">
            <LayoutDashboard size={22} />
            Dashboard
          </button>

          <button className="flex items-center gap-4 hover:bg-gray-700 px-5 py-4 rounded-2xl transition">
            <ClipboardList size={22} />
            Questions
          </button>

          <button className="flex items-center gap-4 hover:bg-gray-700 px-5 py-4 rounded-2xl transition">
            <Upload size={22} />
            Upload MCQs
          </button>

          <button className="flex items-center gap-4 hover:bg-gray-700 px-5 py-4 rounded-2xl transition">
            <FileText size={22} />
            Reports
          </button>

          <button className="flex items-center gap-4 hover:bg-gray-700 px-5 py-4 rounded-2xl transition">
            <Users size={22} />
            Users
          </button>

          <button className="flex items-center gap-4 hover:bg-gray-700 px-5 py-4 rounded-2xl transition">
            <BarChart3 size={22} />
            Analytics
          </button>

          <button className="flex items-center gap-4 hover:bg-gray-700 px-5 py-4 rounded-2xl transition">
            <Settings size={22} />
            Settings
          </button>

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 p-10 overflow-y-auto">

        {/* HEADER */}
        <div className="bg-white rounded-[32px] border border-gray-200 p-8 shadow-sm">

          <h1 className="text-4xl font-black text-gray-900">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Manage assessments, questions, reports and users.
          </p>

        </div>

        {/* STATS */}
        <div className="grid lg:grid-cols-4 gap-6 mt-10">

          {/* CARD */}
          <div className="bg-white rounded-[28px] p-7 shadow-sm border border-gray-200">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500">
                  Total Questions
                </p>

                <h1 className="text-5xl font-black text-red-600 mt-4">
                  120
                </h1>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
                <ClipboardList className="text-red-600" size={32} />
              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="bg-white rounded-[28px] p-7 shadow-sm border border-gray-200">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500">
                  Reports Generated
                </p>

                <h1 className="text-5xl font-black text-red-600 mt-4">
                  84
                </h1>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
                <FileText className="text-red-600" size={32} />
              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="bg-white rounded-[28px] p-7 shadow-sm border border-gray-200">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500">
                  Registered Users
                </p>

                <h1 className="text-5xl font-black text-red-600 mt-4">
                  42
                </h1>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
                <Users className="text-red-600" size={32} />
              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="bg-white rounded-[28px] p-7 shadow-sm border border-gray-200">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500">
                  Assessments
                </p>

                <h1 className="text-5xl font-black text-red-600 mt-4">
                  12
                </h1>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
                <Brain className="text-red-600" size={32} />
              </div>

            </div>

          </div>

        </div>

        {/* QUESTION MANAGEMENT */}
        <div className="bg-white rounded-[32px] border border-gray-200 shadow-sm p-8 mt-10">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-black text-gray-900">
                Question Management
              </h2>

              <p className="text-gray-500 mt-2">
                Upload and manage psychometric questions
              </p>

            </div>

            <button className="px-6 py-3 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition font-medium">
              Add New Question
            </button>

          </div>

          {/* TABLE */}
          <div className="mt-8 overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-gray-200 text-left">

                  <th className="pb-4 text-gray-500 font-semibold">
                    Question
                  </th>

                  <th className="pb-4 text-gray-500 font-semibold">
                    Category
                  </th>

                  <th className="pb-4 text-gray-500 font-semibold">
                    Type
                  </th>

                  <th className="pb-4 text-gray-500 font-semibold">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b border-gray-100">

                  <td className="py-5">
                    I enjoy solving logical problems.
                  </td>

                  <td className="py-5">
                    Aptitude
                  </td>

                  <td className="py-5">
                    MCQ
                  </td>

                  <td className="py-5">
                    <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      Active
                    </span>
                  </td>

                </tr>

                <tr className="border-b border-gray-100">

                  <td className="py-5">
                    I prefer working in teams.
                  </td>

                  <td className="py-5">
                    Personality
                  </td>

                  <td className="py-5">
                    MCQ
                  </td>

                  <td className="py-5">
                    <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      Active
                    </span>
                  </td>

                </tr>

                <tr>

                  <td className="py-5">
                    I enjoy creative design tasks.
                  </td>

                  <td className="py-5">
                    Interests
                  </td>

                  <td className="py-5">
                    MCQ
                  </td>

                  <td className="py-5">
                    <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                      Draft
                    </span>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </main>
  );
}