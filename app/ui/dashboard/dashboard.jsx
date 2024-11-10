"use client";
import { FaUser, FaTrashAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { formatDistanceToNow, format } from "date-fns";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardUI = () => {
  const [users, setUsers] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [currentTime, setCurrentTime] = useState(new Date()); // Real-time clock
  const messagesPerPage = 5;

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`
        );
        const usersData = await usersRes.json();
        setUsers(usersData);

        const messagesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/contact`
        );
        const messagesData = await messagesRes.json();
        setMessageList(messagesData.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalPages = Math.ceil(messageList.length / messagesPerPage);
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messageList.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  // Delete handler with confirmation, toast notifications, and client-side update
  const handleDeleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/?id=${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete message");
      }

      setMessageList((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== id)
      );
      toast.success("Message deleted successfully");

      if (currentMessages.length === 1 && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    } catch (error) {
      console.error("Error deleting message:", error.message);
      toast.error("Failed to delete message. Please try again.");
    }
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end text-gray-700">
          <div className="flex items-center space-x-2">
            <FaClock className="text-gray-600" />
            <p className="text-lg font-semibold">
              {format(currentTime, "h:mm:ss a")}
            </p>
          </div>
          <p className="text-sm">{format(currentTime, "EEEE, MMMM d, yyyy")}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex items-center">
          <FaUser size={32} className="text-[#185c5d] mr-4" />
          <div>
            <p className="text-gray-600">Users</p>
            <p className="text-2xl font-semibold text-gray-800">
              {users.length}
            </p>
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex items-center">
          <FaEnvelope size={32} className="text-[#185c5d] mr-4" />
          <div>
            <p className="text-gray-600">Messages</p>
            <p className="text-2xl font-semibold text-gray-800">
              {messageList.length}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Messages
        </h3>
        <ul className="space-y-6">
          {currentMessages.length === 0 ? (
            <p className="text-gray-500">No recent messages.</p>
          ) : (
            currentMessages.map((message) => (
              <li
                key={message._id}
                className="p-5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex justify-between items-start"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {message.name}
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">
                    {message.organization} •{" "}
                    {formatDistanceToNow(new Date(message.createdAt))} ago
                  </p>
                  <div className="text-gray-700">
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${message.email}`}
                        className="text-[#185c5d] hover:underline"
                      >
                        {message.email}
                      </a>
                    </p>
                    <p>
                      <strong>Phone:</strong> {message.phone}
                    </p>
                    {message.website && (
                      <p>
                        <strong>Website:</strong>{" "}
                        <a
                          href={message.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#185c5d] hover:underline"
                        >
                          {message.website}
                        </a>
                      </p>
                    )}
                    <p>
                      <strong>Referral:</strong> {message.referral}
                    </p>
                    <p>
                      <strong>Services:</strong> {message.services.join(", ")}
                    </p>
                    <p className="mt-2">
                      <strong>Message:</strong> {message.message}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteMessage(message._id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete message"
                >
                  <FaTrashAlt size={24} />
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`mx-1 px-4 py-2 rounded ${
                  currentPage === pageNumber
                    ? "bg-[#185c5d] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardUI;
