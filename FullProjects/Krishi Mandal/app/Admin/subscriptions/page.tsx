const plans = [
  { name: "Free", price: "₹0", features: ["Basic access"] },
  { name: "Basic", price: "₹499", features: ["More listings"] },
  { name: "Premium", price: "₹999", features: ["Unlimited access"] }
]

export default function SubscriptionsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Plans</h1>

      <div className="grid grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <div key={i} className="bg-white p-4 shadow rounded">
            <h2>{plan.name}</h2>
            <p>{plan.price}</p>
            <ul>
              {plan.features.map((f, j) => <li key={j}>{f}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}