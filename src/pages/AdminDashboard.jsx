import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE = "https://mbabane-defrdwe3dkekfkdp.southafricanorth-01.azurewebsites.net";
const MUTED_GOLD = "#BFA76F";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // UI state
  const [activeTab, setActiveTab] = useState("members");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Data state
  const [contacts, setContacts] = useState([]);
  const [members, setMembers] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [shopOrders, setShopOrders] = useState([]);

  // Editing state (fixtures)
  const [editingFixture, setEditingFixture] = useState(null);

  /**
   * Single unified fetch for initial load and refresh.
   * - Uses Promise.all with the correct endpoints and correct destructuring
   * - Uses axios consistently
   */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [
        contactsRes,
        membersRes,
        fixturesRes,
        productsRes,
        ordersRes,
        newsRes,
      ] = await Promise.all([
        axios.get(`${BASE}/api/Contacts`),
        axios.get(`${BASE}/api/Members`),
        axios.get(`${BASE}/api/Fixtures`),
        axios.get(`${BASE}/api/Products`),
        axios.get(`${BASE}/api/Orders`),
        axios.get(`${BASE}/api/News`),
      ]);

      setContacts(contactsRes.data || []);
      setMembers(membersRes.data || []);
      setFixtures(fixturesRes.data || []);
      setProducts(productsRes.data || []);
      setShopOrders(ordersRes.data || []);
      setNews(newsRes.data || []);
    } catch (err) {
      // Better logging for debugging
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // initial load
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Update a member's payment/status
  const updateMemberStatus = async (id, status) => {
    try {
      await axios.put(`${BASE}/api/Members/${id}/status`, { status }, {
        headers: { "Content-Type": "application/json" },
      });

      alert(`Member marked as ${status}`);
      const refreshed = await axios.get(`${BASE}/api/Members`);
      setMembers(refreshed.data || []);
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Failed to update member status. See console for details.");
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${BASE}/api/Orders/${orderId}/status`, { status: newStatus }, {
        headers: { "Content-Type": "application/json" },
      });
      // refresh orders only
      const res = await axios.get(`${BASE}/api/Orders`);
      setShopOrders(res.data || []);
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status.");
    }
  };

  // Delete handlers with confirm and then refresh
  const deleteFixture = async (id) => {
    if (!window.confirm("Are you sure you want to delete this fixture?")) return;
    try {
      await axios.delete(`${BASE}/api/Fixtures/${id}`);
      alert("Fixture deleted.");
      const res = await axios.get(`${BASE}/api/Fixtures`);
      setFixtures(res.data || []);
    } catch (err) {
      console.error("Failed to delete fixture:", err.response?.data || err);
      alert("Failed to delete fixture. See console.");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${BASE}/api/Products/delete-product/${id}`);
      alert("Product deleted.");
      const res = await axios.get(`${BASE}/api/Products`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to delete product:", err.response?.data || err);
      alert("Failed to delete product. See console.");
    }
  };

  const deleteNews = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news item?")) return;
    try {
      await axios.delete(`${BASE}/api/News/delete/${id}`);
      alert("News deleted.");
      const res = await axios.get(`${BASE}/api/News`);
      setNews(res.data || []);
    } catch (err) {
      console.error("Failed to delete news:", err.response?.data || err);
      alert("Failed to delete news. See console.");
    }
  };

  const saveEdit = async () => {
    if (!editingFixture) return;
    try {
      await axios.put(`${BASE}/api/Fixtures/${editingFixture.id}`, editingFixture);
      const res = await axios.get(`${BASE}/api/Fixtures`);
      setFixtures(res.data || []);
      setEditingFixture(null);
      alert("Fixture updated");
    } catch (err) {
      console.error("Failed to update fixture:", err);
      alert("Failed to update fixture.");
    }
  };


  const goToAddFixture = () => navigate("/add-fixture");
  const goToAddProduct = () => navigate("/add-product");
  const goToAddNews = () => navigate("/add-news");
  const goToEditFixture = (id) => navigate(`/edit-fixture/${id}`);
  const goToEditProduct = (id) => navigate(`/edit-product/${id}`);
  const goToEditNews = (id) => navigate(`/edit-news/${id}`);


  const normalizedSearch = (searchQuery || "").toLowerCase().trim();

  const filteredMembers = useMemo(() => {
    if (!normalizedSearch) return members;
    return members.filter((m) =>
      (m.fullName || "").toLowerCase().includes(normalizedSearch)
    );
  }, [members, normalizedSearch]);

  const filteredOrders = useMemo(() => {
    if (!normalizedSearch) return shopOrders;
    return shopOrders.filter((o) =>
      (o.customerFullName || o.customerName || "").toLowerCase().includes(normalizedSearch)
    );
  }, [shopOrders, normalizedSearch]);

  const exportCSV = () => {
    const headers = "MemberID,FullName,Email,Branch,Tier,Status\n";
    const rows = (filteredMembers || [])
      .map((m) =>
        `${m.memberID || ""},"${(m.fullName || "").replace(/"/g, '""')}",${m.email || ""},${m.branch || ""},${m.membershipTier || ""},${m.paymentStatus || ""}`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "members.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="p-6" style={{ color: MUTED_GOLD }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black p-6" style={{ color: MUTED_GOLD }}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm" style={{ color: MUTED_GOLD }}>
            Mbabane Highlanders AM Membership Management
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            className="flex items-center bg-black border px-4 py-2 rounded transition"
            style={{ borderColor: MUTED_GOLD, color: MUTED_GOLD }}
            onClick={exportCSV}
          >
            ⬇ Export Data
          </button>

          <button
            className="flex items-center bg-black border px-4 py-2 rounded transition"
            style={{ borderColor: MUTED_GOLD, color: MUTED_GOLD }}
            onClick={() => alert("Add Member flow not implemented (navigate to add-member)")} // placeholder
          >
            ➕ Add Member
          </button>

          <button
            type="button"
            onClick={goToAddFixture}
            className="flex items-center bg-black border px-4 py-2 rounded transition"
            style={{ borderColor: MUTED_GOLD, color: MUTED_GOLD }}
          >
            ➕ Add Fixture
          </button>

          <button
            type="button"
            onClick={goToAddProduct}
            className="flex items-center bg-black border px-4 py-2 rounded transition"
            style={{ borderColor: MUTED_GOLD, color: MUTED_GOLD }}
          >
            ➕ Add Product
          </button>

          <button
            type="button"
            onClick={goToAddNews}
            className="flex items-center bg-black border px-4 py-2 rounded transition"
            style={{ borderColor: MUTED_GOLD, color: MUTED_GOLD }}
          >
            ➕ Add News
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <DashboardCard label="Total Members" value={members.length} icon="👥" />
        <DashboardCard label="Accepted Members" value={members.filter(m => m.paymentStatus === "Accepted").length} icon="✅" />
        <DashboardCard label="Under Review" value={members.filter(m => m.paymentStatus === "Under Review").length} icon="📄" />
        <DashboardCard label="Rejected Members" value={members.filter(m => m.paymentStatus === "Rejected").length} icon="❌" />
        <DashboardCard label="Total Revenue" value={`E${members.reduce((sum, m) => sum + (m.amount || 0), 0)}`} icon="📈" />
        <DashboardCard label="Shop Orders" value={shopOrders.length} icon="🛒" />
      </div>

      <div className="flex space-x-4 mb-6">
        {["members", "inquiries", "fixtures", "products", "shop", "news"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? "" : "bg-[#1A1F3A]"}`}
            style={{
              backgroundColor: activeTab === tab ? MUTED_GOLD : undefined,
              color: activeTab === tab ? "black" : MUTED_GOLD,
            }}
          >
            {tab === "members" && "Members"}
            {tab === "inquiries" && "Contact Inquiries"}
            {tab === "fixtures" && "Fixtures"}
            {tab === "products" && "Products"}
            {tab === "shop" && "Shop Orders"}
            {tab === "news" && "News"}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#1A1F3A] px-4 py-2 rounded w-full md:w-1/2"
          style={{ color: MUTED_GOLD }}
        />
      </div>

      {/* ---------- MEMBERS ---------- */}
      {activeTab === "members" && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1A1F3A]" style={{ color: MUTED_GOLD }}>
              <th className="p-2">Member Code</th>
              <th className="p-2">Full Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Branch</th>
              <th className="p-2">Tier</th>
              <th className="p-2">Status</th>
              <th className="p-2">Join Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Card</th>
              <th className="p-2">Proof</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((m) => (
              <tr key={m.memberID} className="border-b border-[#1A1F3A] hover:bg-[#1A1F3A]" style={{ color: MUTED_GOLD }}>
                <td className="p-2">{m.memberCode}</td>
                <td className="p-2">{m.fullName}</td>
                <td className="p-2">{m.email}</td>
                <td className="p-2">{m.branch}</td>
                <td className="p-2">{m.membershipTier}</td>
                <td className="p-2">{m.paymentStatus}</td>
                <td className="p-2">{m.joinedAt ? new Date(m.joinedAt).toLocaleDateString() : "—"}</td>
                <td className="p-2">E{m.amount ?? 0}</td>
                <td className="p-2">
                  {m.cardUrl ? <a href={m.cardUrl}>🪪</a> : "—"}
                </td>
                <td className="p-2">
                  {m.fileUpload ? (
                    <a href={`https://mbabanestorage.blob.core.windows.net/proofofpayments/${m.fileUpload}`}>🧾</a>
                  ) : "—"}
                </td>
                <td className="p-2 space-x-2">
                  <button className="text-white mr-2 px-2 py-1 rounded" onClick={() => updateMemberStatus(m.memberID, "Accepted")}>✅</button>
                  <button className="text-white px-2 py-1 rounded" onClick={() => updateMemberStatus(m.memberID, "Rejected")}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- INQUIRIES ---------- */}
      {activeTab === "inquiries" && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1A1F3A]" style={{ color: MUTED_GOLD }}>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Type</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Message</th>
              <th className="p-2">Resolved</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-b border-[#1A1F3A] hover:bg-[#1A1F3A]" style={{ color: MUTED_GOLD }}>
                <td className="p-2">{c.fullName}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.phoneNumber}</td>
                <td className="p-2">{c.inquiryType}</td>
                <td className="p-2">{c.subject}</td>
                <td className="p-2">{c.message}</td>
                <td className="p-2">{c.isResolved ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- FIXTURES ---------- */}
      {activeTab === "fixtures" && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1A1F3A]" style={{ color: MUTED_GOLD }}>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Home</th>
              <th className="p-2">Away</th>
              <th className="p-2">Stadium</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fixtures.map((f) => (
              <tr key={f.id} className="border-b border-[#1A1F3A] hover:bg-[#1A1F3A]" style={{ color: MUTED_GOLD }}>
                <td className="p-2">{f.date ? f.date.split("T")[0] : "—"}</td>
                <td className="p-2">{f.time || "—"}</td>
                <td className="p-2">{f.home}</td>
                <td className="p-2">{f.away}</td>
                <td className="p-2">{f.stadium}</td>
                <td className="p-2 space-x-2">
                  <button className="px-2 py-1 rounded text-black" style={{ backgroundColor: MUTED_GOLD }} onClick={() => goToEditFixture(f.id)}>✏️ Edit</button>
                  <button onClick={() => deleteFixture(f.id)} className="bg-red-600 text-white px-2 py-1 rounded">🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- PRODUCTS ---------- */}
      {activeTab === "products" && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1A1F3A]" style={{ color: MUTED_GOLD }}>
              <th className="p-2">Name</th>
              <th className="p-2">Color</th>
              <th className="p-2">Price</th>
              <th className="p-2">Image</th>
              <th className="p-2">Is Active</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-[#1A1F3A] hover:bg-[#1A1F3A]" style={{ color: MUTED_GOLD }}>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.color}</td>
                <td className="p-2">R{p.price}</td>
                <td className="p-2">
                  {p.imageUrl ? <img src={p.imageUrl} alt={p.name} width={120} /> : "—"}
                </td>
                <td className="p-2">{p.isActive ? "Yes" : "No"}</td>
                <td className="p-2">
                  <button className="px-2 py-1 rounded text-black mr-2" style={{ backgroundColor: MUTED_GOLD }} onClick={() => goToEditProduct(p.id)}>✏️ Edit</button>
                  <button onClick={() => deleteProduct(p.id)} className="bg-red-600 text-white px-2 py-1 rounded">🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- SHOP ORDERS ---------- */}
      {activeTab === "shop" && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1A1F3A]" style={{ color: MUTED_GOLD }}>
              <th className="p-2">Order Code</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Shipping Address</th>
              <th className="p-2">Items</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-[#1A1F3A] hover:bg-[#1A1F3A]" style={{ color: MUTED_GOLD }}>
                <td className="p-2">{order.orderCode}</td>
                <td className="p-2">{order.customerFullName || order.customerName}</td>
                <td className="p-2">{order.customerEmail}</td>
                <td className="p-2">{order.customerPhone || "—"}</td>
                <td className="p-2">{order.shippingAddress}</td>
                <td className="p-2">
                  <ul className="list-disc list-inside space-y-1">
                    {(order.items || []).map((item, index) => (
                      <li key={index}>
                        {item.productName || "Item"} (Size: {item.size || "—"}, Qty: {item.quantity || 0}) — E{(item.lineTotal || 0).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-2">E{(order.totalAmount || 0).toFixed(2)}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2 space-y-1">
                  <button className="px-2 py-1 rounded text-black w-full" style={{ backgroundColor: MUTED_GOLD }} onClick={() => updateOrderStatus(order.id, "Accepted")}>✅ Accept</button>
                  <button className="px-2 py-1 rounded text-black w-full" style={{ backgroundColor: "red" }} onClick={() => updateOrderStatus(order.id, "Rejected")}>❌ Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- NEWS ---------- */}
      {activeTab === "news" && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1A1F3A]" style={{ color: MUTED_GOLD }}>
              <th className="p-2">Title</th>
              <th className="p-2">Link</th>
              <th className="p-2">Image</th>
              <th className="p-2">Likes</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((n) => (
              <tr key={n.id} className="border-b border-[#1A1F3A] hover:bg-[#1A1F3A]" style={{ color: MUTED_GOLD }}>
                <td className="p-2">{n.title}</td>
                <td className="p-2">{n.link}</td>
                <td className="p-2">
                  {n.imageFileName ? <img src={n.imageFileName} alt={n.title} width={120} /> : "—"}
                </td>
                <td className="p-2">{n.likes ?? 0}</td>
                <td className="p-2">
                  <button className="px-2 py-1 rounded text-black mr-2" style={{ backgroundColor: MUTED_GOLD }} onClick={() => goToEditNews(n.id)}>✏️ Edit</button>
                  <button onClick={() => deleteNews(n.id)} className="bg-red-600 text-white px-2 py-1 rounded">🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

/* Small presentational card */
function DashboardCard({ label, value, icon }) {
  return (
    <div className="bg-[#1A1F3A] p-4 rounded shadow flex flex-col items-center justify-center" style={{ color: MUTED_GOLD }}>
      <span className="text-2xl mb-2">{icon}</span>
      <h2 className="font-bold text-xl">{value}</h2>
      <p>{label}</p>
    </div>
  );
}
