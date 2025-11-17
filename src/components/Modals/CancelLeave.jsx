import { X } from "lucide-react";
import { makeRequest, showToast } from "../../Utils/util";

const CancelModal = ({ isOpen, onClose, leaveId, onCancelSuccess }) => {
    if (!isOpen) return null;

    const handleConfirm = async () => {
        try {
            const id = {id:leaveId}
            console.log(id);
            const response = await makeRequest("cancelLeaves", "leavesService", id)
            console.log(response);

            if (response.returnCode !== 0) {
                console.error(response.returnMessage);
                showToast(response.returnMessage, "error")
                return;
            }
            showToast("canceled leave successfully", "success");
            onCancelSuccess();


            onClose();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#1E1E23] border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-[scale-in_0.2s_ease-out]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Cancel Leave Request</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    Are you sure you want to cancel this leave request (ID: #{leaveId})?
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-[#25252A] hover:bg-[#2D2D32] text-white font-medium rounded-lg transition-all"
                    >
                        No, Keep It
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all"
                    >
                        Yes, Cancel Leave
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

export default CancelModal;