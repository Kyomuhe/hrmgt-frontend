import { showToast, makeRequest } from "../../Utils/util";
import { useEffect, useState } from "react";
import { UserPlus, Shield, Search, Filter, X } from "lucide-react";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState("");
    const [isChangingRole, setIsChangingRole] = useState(false);

    const AVAILABLE_ROLES = ["USER", "HR", "ADMIN"];

    useEffect(() => {
        displayAllUsers();
    }, []);

    const displayAllUsers = async () => {
        try {
            setLoading(true);
            const response = await makeRequest("displayAllUsers", "Auth", {});
            console.log("All Users:", response);

            if (response?.returnCode !== 0) {
                const errorMessage = response?.returnMessage || 'Failed to fetch users';
                showToast(errorMessage, 'error');
                console.error(errorMessage);
                return;
            }

            const fetchedUsers = response?.returnObject || [];
            setUsers(fetchedUsers);
            console.log("Fetched Users:", fetchedUsers);

        } catch (error) {
            console.error('Error fetching users:', error.message);
            showToast('Error fetching users', 'error');
        } finally {
            setLoading(false);
        }
    };

    const openRoleModal = (user) => {
        setSelectedUser(user);
        setNewRole(user.roleCode);
        setShowRoleModal(true);
    };

    const closeRoleModal = () => {
        setShowRoleModal(false);
        setSelectedUser(null);
        setNewRole("");
    };

    const changeUserRole = async () => {
        if (!selectedUser || !newRole) {
            showToast("Please select a role", "error");
            return;
        }

        if (newRole === selectedUser.roleCode) {
            showToast("User already has this role", "info");
            return;
        }

        try {
            setIsChangingRole(true);
            const data = { userId: selectedUser.id, roleCode: newRole };
            const response = await makeRequest("changeRole", "Auth", data);
            
            if (response?.returnCode !== 0) {
                const errorMessage = response?.returnMessage || 'Failed to change role';
                showToast(errorMessage, 'error');
                console.error(errorMessage);
                return;
            }
            
            showToast("Changed role successfully", "success");
            closeRoleModal();
            displayAllUsers(); // Refresh the user list
        } catch (error) {
            console.error(error.message);
            showToast(error.message, "error");
        } finally {
            setIsChangingRole(false);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.employeeId?.toString().includes(searchTerm);

        const matchesRole = filterRole === "all" || user.roleCode === filterRole;

        return matchesSearch && matchesRole;
    });

    const uniqueRoleCodes = [...new Set(users.map(user => user.roleCode))];

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRoleBadgeColor = (roleCode) => {
        switch (roleCode) {
            case 'ADMIN':
                return 'bg-red-500/20 text-red-400 border-red-500/50';
            case 'USER':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
            case 'HR':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#16151C] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#7152F3] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#16151C] p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">System Users</h1>
                        <p className="text-gray-400">Manage all registered users and their roles</p>
                    </div>
                    <button
                        className="mt-4 md:mt-0 bg-[#7152F3] text-white px-6 py-3 rounded-lg hover:bg-[#5d3ed9] transition-all flex items-center gap-2 font-semibold"
                    >
                        <UserPlus size={20} />
                        Add New User
                    </button>
                </div>

                <div className="rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, email, username, or employee ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#16151C] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7152F3]"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="text-gray-400" size={20} />
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="bg-[#16151C] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7152F3]"
                        >
                            <option value="all">All Roles</option>
                            {uniqueRoleCodes.map(roleCode => (
                                <option key={roleCode} value={roleCode}>{roleCode}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-[#1E1D24] rounded-xl p-4 border border-gray-800">
                        <p className="text-gray-400 text-sm mb-1">Total Users</p>
                        <p className="text-2xl font-bold text-white">{users.length}</p>
                    </div>
                    <div className="bg-[#1E1D24] rounded-xl p-4 border border-gray-800">
                        <p className="text-gray-400 text-sm mb-1">Active Users</p>
                        <p className="text-2xl font-bold text-green-400">
                            {users.filter(u => u.isActive).length}
                        </p>
                    </div>
                    <div className="bg-[#1E1D24] rounded-xl p-4 border border-gray-800">
                        <p className="text-gray-400 text-sm mb-1">Departments</p>
                        <p className="text-2xl font-bold text-blue-400">
                            {new Set(users.map(u => u.department)).size}
                        </p>
                    </div>
                </div>

                <div className="bg-[#1E1D24] rounded-xl overflow-hidden border border-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#16151C] border-b border-gray-800">
                                <tr>
                                    <th className="text-left p-4 text-gray-400 font-semibold text-sm">ID</th>
                                    <th className="text-left p-4 text-gray-400 font-semibold text-sm">Name</th>
                                    <th className="text-left p-4 text-gray-400 font-semibold text-sm">Username</th>
                                    <th className="text-left p-4 text-gray-400 font-semibold text-sm">Department</th>
                                    <th className="text-left p-4 text-gray-400 font-semibold text-sm">Role</th>
                                    <th className="text-left p-4 text-gray-400 font-semibold text-sm">Role Code</th>
                                    <th className="text-left p-4 text-gray-400 font-semibold text-sm">Status</th>
                                    <th className="text-left p-4 text-gray-400 font-semibold text-sm">Last Login</th>
                                    <th className="text-left p-4 text-gray-400 font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="text-center p-8 text-gray-400">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b border-gray-800 hover:bg-[#16151C] transition-colors"
                                        >
                                            <td className="p-4 text-white font-mono text-sm">
                                                #{user.employeeId}
                                            </td>
                                            <td className="p-4 text-white">
                                                <div className="flex items-center gap-2">
                                                    <span>{user.firstName} {user.lastName}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-300 text-sm">@{user.username}</td>
                                            <td className="p-4 text-gray-300 text-sm">{user.department || 'N/A'}</td>
                                            <td className="p-4 text-gray-300 text-sm">{user.role || 'N/A'}</td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(user.roleCode)}`}>
                                                    {user.roleCode}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {user.isActive ? (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/50">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-400 border border-gray-500/50">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-gray-400 text-xs">
                                                {formatDate(user.lastLoggedInAt)}
                                            </td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() => openRoleModal(user)}
                                                    className="bg-[#7152F3] text-white px-4 py-2 rounded-lg hover:bg-[#5d3ed9] transition-all flex items-center gap-2 text-sm font-semibold"
                                                >
                                                    <Shield size={16} />
                                                    Change Role
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-4 text-center text-gray-400 text-sm">
                    Showing {filteredUsers.length} of {users.length} users
                </div>
            </div>

            {/* Role Change Modal */}
            {showRoleModal && selectedUser && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1E1D24] rounded-xl border border-gray-800 max-w-md w-full p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Shield className="text-[#7152F3]" size={24} />
                                Change User Role
                            </h2>
                            <button
                                onClick={closeRoleModal}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="bg-[#16151C] rounded-lg p-4 border border-gray-800 mb-4">
                                <p className="text-gray-400 text-sm mb-1">User</p>
                                <p className="text-white font-semibold">
                                    {selectedUser.firstName} {selectedUser.lastName}
                                </p>
                                <p className="text-gray-400 text-sm">@{selectedUser.username}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-400 text-sm mb-2">Current Role</p>
                                <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border ${getRoleBadgeColor(selectedUser.roleCode)}`}>
                                    {selectedUser.roleCode}
                                </span>
                            </div>

                            <div>
                                <label className="text-gray-400 text-sm mb-2 block">
                                    Select New Role
                                </label>
                                <div className="space-y-2">
                                    {AVAILABLE_ROLES.map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => setNewRole(role)}
                                            className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                                                newRole === role
                                                    ? 'bg-[#7152F3] border-[#7152F3] text-white'
                                                    : 'bg-[#16151C] border-gray-800 text-gray-300 hover:border-[#7152F3]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold">{role}</span>
                                                {newRole === role && (
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={closeRoleModal}
                                disabled={isChangingRole}
                                className="flex-1 bg-[#16151C] text-gray-300 px-4 py-3 rounded-lg hover:bg-gray-800 transition-all font-semibold border border-gray-800 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={changeUserRole}
                                disabled={isChangingRole || newRole === selectedUser.roleCode}
                                className="flex-1 bg-[#7152F3] text-white px-4 py-3 rounded-lg hover:bg-[#5d3ed9] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isChangingRole ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </span>
                                ) : (
                                    'Confirm Change'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUsers;