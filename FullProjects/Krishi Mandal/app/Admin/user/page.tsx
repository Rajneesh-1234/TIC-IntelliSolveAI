interface User {
  id: number
  name: string
  role: string
  status: string
}

const users: User[] = [
  { id: 1, name: "Rahul", role: "Farmer", status: "Active" },
  { id: 2, name: "Amit", role: "Seller", status: "Blocked" }
]

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">User Management</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button>View</button>
                <button>Block</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}