'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './ToastContext';
import ConfirmModal from './ConfirmModal';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setShowModal(false);
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      showToast('Student deleted successfully.', 'success');
      router.push('/');
      router.refresh();
    } catch {
      showToast('Failed to delete student.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-danger btn-sm"
        disabled={isDeleting}
      >
        {isDeleting ? '...' : 'Delete'}
      </button>

      {showModal && (
        <ConfirmModal
          title="Delete Student"
          message="Are you sure you want to delete this student? This action cannot be undone."
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
          variant="danger"
        />
      )}
    </>
  );
}
