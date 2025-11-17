import { X, XCircle } from "lucide-react";
import { useState } from "react";

const RejectionModal = ({ isOpen, onClose, onConfirm, employeeName, isLoading }) => {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!reason.trim()) {
            setError('Please provide a reason for rejection');
            return;
        }
        onConfirm(reason);
    };

    const handleClose = () => {
        setReason('');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#1E1E23] border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-[scale-in_0.2s_ease-out]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Reject Leave Application</h3>
                    <button
                        onClick={handleClose}
                        disabled={isLoading}
                        className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-gray-300 mb-4">
                    You are about to reject <span className="font-semibold text-white">{employeeName}</span>'s leave application.
                </p>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Rejection Reason <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        value={reason}
                        onChange={(e) => {
                            setReason(e.target.value);
                            setError('');
                        }}
                        placeholder="Please provide a detailed reason for rejection..."
                        className="w-full bg-[#25252A] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                        rows="4"
                        disabled={isLoading}
                    />
                    {error && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </p>
                    )}
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 bg-[#25252A] hover:bg-[#2D2D32] text-white font-medium rounded-lg transition-all disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-red-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Rejecting...
                            </>
                        ) : (
                            <>
                                <XCircle className="w-4 h-4" />
                                Reject Application
                            </>
                        )}
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>


        </div>

    );
};
export default RejectionModal;
