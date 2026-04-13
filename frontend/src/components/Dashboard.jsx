import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush } from "recharts";

function Dashboard({ states, villages, page, totalVillages, chartData, chartLoading }) {
  const data = (chartData ?? []).map((state) => ({
    name: state.state_name,
    villages: state.villages,
  }));

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-xl font-semibold">Dashboard Overview</h2>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">States</p>
          <p className="text-2xl font-bold">{states.length}</p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Villages (loaded)</p>
          <p className="text-2xl font-bold">{villages.length}</p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Active Page</p>
          <p className="text-2xl font-bold">{page}</p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Villages (total)</p>
          <p className="text-2xl font-bold">{totalVillages}</p>
        </div>
      </div>

      <div className="h-80 rounded-xl bg-white p-4 shadow">
        {chartLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-600">Loading chart data...</div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-600">No chart data available.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="28%">
              <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="villages" fill="#4f46e5" barSize={20} />
              <Brush dataKey="name" height={24} startIndex={0} endIndex={Math.min(data.length - 1, 9)} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
