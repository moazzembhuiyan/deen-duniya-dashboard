"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "@/redux/api/eventApi";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/apiError";

export default function EditEventModal({ isOpen, onClose, event }) {
  const [formData, setFormData] = useState(() => ({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date ? event.date.split("T")[0] : "",
    type: event?.type || "Islamic",
  }));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateEvent({
        id: event._id,
        payload: {
          type: formData.type,
          title: formData.title,
          description: formData.description,
          date: formData.date,
        },
      }).unwrap();
      toast.success("Event updated successfully");
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to update event."));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(event._id).unwrap();
      toast.success("Event deleted successfully");
      setShowDeleteModal(false);
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete event."));
    }
  };

  return (
    <>
      {/* Main Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="z-[999] rounded-2xl border-0 bg-white shadow-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Edit Event
            </DialogTitle>
            <p className="text-sm text-gray-500">
              Update your Islamic event details
            </p>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="mt-4 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Event Title
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Date
              </label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="rounded-xl"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={isUpdating}
                className="flex-1 rounded-xl bg-amber-800 py-6 text-base font-medium text-white hover:bg-amber-900"
              >
                {isUpdating ? "Updating..." : "Update Event"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteModal(true)}
                disabled={isDeleting}
                className="rounded-xl border-red-200 bg-red-50 px-4 text-red-600 hover:bg-red-100 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal – outside the Edit Dialog */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="z-[10000] rounded-2xl border-0 bg-white shadow-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Delete Event?
            </DialogTitle>
          </DialogHeader>

          <p className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete this event? This action cannot be
            undone.
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
