import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MdAddCircleOutline } from 'react-icons/md';
import { Dialog } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

// Utility to get token
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const tokenData = JSON.parse(token);
    return tokenData.token || token;
  } catch {
    return token;
  }
};

const ContactTypeModal = ({ isOpen, setIsOpen, onContactAdded }) => {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      contact_type: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const token = getAuthToken();
      if (!token) {
        toast.error('Please login first!');
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:4000/api/v1/contact-types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      const result = await response.json();
      if (result.success) {
        onContactAdded?.(result.data);
        setIsOpen(false);
        toast.success('Contact Type added successfully!');
        reset();
      } else {
        toast.error(result.message || 'Failed to add contact type');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while creating the contact type');
    }
  };

  const openModal = () => {
    const token = getAuthToken();
    if (!token) {
      toast.error('Please login first!');
      navigate('/login');
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
<button
  className="flex items-center gap-2 font-medium text-gray-800 border-gray-900 border-[1px] px-4 py-2 rounded transition bg-gradient-to-b from-[#79caff] to-[#52c1ed] hover:brightness-95"
  onClick={openModal}
>
  <MdAddCircleOutline size={20} /> Add Contact Type
</button>



      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />

        {/* Modal Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
            <Dialog.Title className="text-lg font-semibold text-gray-800">
              Add Contact Type
            </Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Type</label>
                <Controller
                  name="contact_type"
                  control={control}
                  rules={{
                    required: 'Contact Type is required',
                    minLength: {
                      value: 2,
                      message: 'Contact Type must be at least 2 characters',
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <input
                        type="text"
                        placeholder="Enter Contact Type"
                        className={`mt-1 w-full px-3 py-2 border rounded ${
                          error ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...field}
                      />
                      {error && (
                        <p className="text-red-500 text-xs mt-1">{error.message}</p>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default ContactTypeModal;
