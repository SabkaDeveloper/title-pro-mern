import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { getToken, getUserId } from "../../../utils/auth";

// ✅ API call to create a contact
const createContact = async (contactData, onContactAdded, closeModal) => {
  try {
    console.log("Submitting contact data:", contactData);

    const token = getToken();
    if (!token) {
      toast.error("Please log in first!", { autoClose: 3000 });
      return;
    }

    const response = await fetch("http://localhost:4000/api/v1/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();
    console.log("API Response:", data);

    if (response.ok) {
      toast.success("Contact added successfully!", { autoClose: 1500 });
      onContactAdded(data.data);
      closeModal(); // ✅ Close modal after success
    } else {
      toast.error(data.message || "Error adding contact", { autoClose: 3000 });
    }
  } catch (error) {
    console.error("Error creating contact:", error);
    toast.error("Failed to add contact. Please try again later.");
  }
};

const ContactModal = ({ onClose, onContactAdded }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      county: "",
      type: "business",
      status: "active",
    },
  });

  // ✅ Close Modal Function
  const handleClose = () => {
    setIsOpen(false);
    reset();
    onClose();
  };

  // ✅ Form Submission
  const onSubmit = (data) => {
    console.log("Submitting data:", data);
    const userId = getUserId();
    if (!userId) {
      toast.error("User not found, please log in again.");
      return;
    }
    createContact({ ...data, user_id: userId }, onContactAdded, handleClose);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Add Contact</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {["name", "phone", "email", "address"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize">
                  {field}
                </label>
                <Controller
                  name={field}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder={`Enter ${field}`}
                      {...field}
                      required
                      className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                />
              </div>
            ))}

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium">City</label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Enter city"
                      {...field}
                      required
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  )}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium">County</label>
                <Controller
                  name="county"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Enter county"
                      {...field}
                      required
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium">Type</label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <select {...field} className="w-full border px-3 py-2 rounded-md">
                      <option value="business">Business</option>
                      <option value="personal">Personal</option>
                    </select>
                  )}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium">Status</label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <select {...field} className="w-full border px-3 py-2 rounded-md">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ContactModal;
