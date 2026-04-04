const transactions = [
  { id: 1, user: "Rahul", amount: 500, status: "Paid" },
  { id: 2, user: "Amit", amount: 300, status: "Pending" }
]

export default function TransactionsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Transactions</h1>

      <table className="w-full bg-white shadow">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.user}</td>
              <td>₹{t.amount}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}