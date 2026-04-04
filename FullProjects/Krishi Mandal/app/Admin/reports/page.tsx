const reports = [
  { id: 1, user: "Farmer1", issue: "Payment issue", status: "Pending" }
]

export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold">Reports</h1>

      {reports.map(r => (
        <div key={r.id} className="bg-white p-4 shadow mt-3">
          <p>{r.issue}</p>
          <button>Approve</button>
          <button>Reject</button>
        </div>
      ))}
    </div>
  )
}