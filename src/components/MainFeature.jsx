import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Icons
const SearchIcon = getIcon('Search');
const FilterIcon = getIcon('Filter');
const UserPlusIcon = getIcon('UserPlus');
const CheckIcon = getIcon('Check');
const XIcon = getIcon('X');
const ClockIcon = getIcon('Clock');

function MainFeature({ moduleType }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 10));
  const [markingInProgress, setMarkingInProgress] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudentId, setNewStudentId] = useState('');
  const [currentView, setCurrentView] = useState('list'); // list, card, detailed
  const [selectedClass, setSelectedClass] = useState('CS101');

  // Initialize mock data for attendance
  useEffect(() => {
    // Generate 15 students with random IDs and names
    const mockStudents = [
      { id: 'S1001', name: 'Alex Johnson', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1002', name: 'Samantha Lee', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1003', name: 'Michael Chen', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1004', name: 'Jessica Williams', photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1005', name: 'Daniel Brown', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1006', name: 'Sophia Garcia', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1007', name: 'Ethan Wilson', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1008', name: 'Olivia Martinez', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1009', name: 'Noah Robinson', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1010', name: 'Ava Thompson', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1011', name: 'Liam Davis', photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1012', name: 'Emma Rodriguez', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1013', name: 'Logan Hill', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1014', name: 'Mia Sanchez', photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'S1015', name: 'Lucas King', photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.0.3' },
    ];

    // Generate initial attendance status (null for not marked)
    const initialAttendance = mockStudents.map(student => ({
      ...student,
      status: null // null = not marked, true = present, false = absent
    }));

    setAttendanceData(initialAttendance);
  }, [moduleType]);

  const markAttendance = (studentId, isPresent) => {
    setAttendanceData(prev => 
      prev.map(student => 
        student.id === studentId ? { ...student, status: isPresent } : student
      )
    );

    toast.success(
      `${isPresent ? 'Present' : 'Absent'} marked for ${attendanceData.find(s => s.id === studentId)?.name}`,
      { autoClose: 2000 }
    );
  };

  const markAllPresent = () => {
    setMarkingInProgress(true);
    
    // Simulate a delay for the animation to be visible
    setTimeout(() => {
      setAttendanceData(prev => 
        prev.map(student => ({ ...student, status: true }))
      );
      setMarkingInProgress(false);
      toast.success('All students marked present');
    }, 800);
  };

  const resetAttendance = () => {
    setAttendanceData(prev => 
      prev.map(student => ({ ...student, status: null }))
    );
    toast.info('Attendance has been reset');
  };

  const handleAddStudent = () => {
    if (!newStudentId.trim()) {
      toast.error('Please enter a student ID');
      return;
    }

    // Check if student ID already exists
    if (attendanceData.some(student => student.id === newStudentId)) {
      toast.error('Student ID already exists');
      return;
    }

    // Add new student with a mock name
    const newStudent = {
      id: newStudentId,
      name: `New Student ${newStudentId}`,
      photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3',
      status: null
    };

    setAttendanceData(prev => [...prev, newStudent]);
    setNewStudentId('');
    setShowAddModal(false);
    toast.success(`Student ${newStudentId} added successfully`);
  };

  const filteredStudents = attendanceData.filter(student => 
    student.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // For a simple module selector
  const classes = [
    { id: 'CS101', name: 'Computer Science 101', time: '10:00 AM - 11:30 AM' },
    { id: 'MATH201', name: 'Advanced Mathematics', time: '01:00 PM - 02:30 PM' },
    { id: 'ENG105', name: 'English Composition', time: '03:00 PM - 04:30 PM' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (moduleType !== 'attendance') {
    return (
      <div className="flex flex-col items-center justify-center p-6 min-h-[500px] bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
        <img 
          src="https://cdn.pixabay.com/photo/2017/03/24/02/25/gear-2169530_1280.png" 
          alt="Module Coming Soon" 
          className="w-32 h-32 mb-6 opacity-50"
        />
        <h3 className="text-xl font-semibold text-surface-600 dark:text-surface-300 mb-2">
          {moduleType.charAt(0).toUpperCase() + moduleType.slice(1)} Module
        </h3>
        <p className="text-surface-500 dark:text-surface-400 text-center max-w-md">
          This module is under development. Please try the Attendance Tracking module for a functional demo.
        </p>
      </div>
    );
  }
  
  return (
    <div className="relative">
      {/* Header with controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-surface-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search by ID or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div>
            <select 
              className="select pr-8"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <input
              type="date"
              className="input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentView('list')}
              className={`p-2 rounded ${currentView === 'list' 
                ? 'bg-primary text-white' 
                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'}`}
            >
              <FilterIcon className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setCurrentView('card')}
              className={`p-2 rounded ${currentView === 'card' 
                ? 'bg-primary text-white' 
                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'}`}
            >
              <getIcon('LayoutGrid').default className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Class info */}
      <div className="mb-6 p-4 bg-surface-50 dark:bg-surface-700 rounded-lg border border-surface-200 dark:border-surface-600">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <BookIcon className="h-5 w-5 text-primary" />
              {classes.find(c => c.id === selectedClass)?.name || 'Class'}
            </h3>
            <p className="text-sm text-surface-600 dark:text-surface-400 flex items-center gap-1 mt-1">
              <ClockIcon className="h-4 w-4" />
              {classes.find(c => c.id === selectedClass)?.time || 'Time slot'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={markAllPresent}
              disabled={markingInProgress}
              className="btn btn-primary text-sm flex items-center gap-1"
            >
              {markingInProgress ? (
                <>
                  <getIcon('Loader').default className="h-4 w-4 animate-spin" />
                  Marking...
                </>
              ) : (
                <>
                  <CheckIcon className="h-4 w-4" />
                  Mark All Present
                </>
              )}
            </button>
            <button
              onClick={resetAttendance}
              className="btn btn-outline text-sm flex items-center gap-1"
            >
              <getIcon('RotateCcw').default className="h-4 w-4" />
              Reset
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-secondary text-sm flex items-center gap-1"
            >
              <UserPlusIcon className="h-4 w-4" />
              Add Student
            </button>
          </div>
        </div>
      </div>
      
      {/* Attendance status summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="text-green-600 dark:text-green-400 font-bold text-xl md:text-2xl">
            {attendanceData.filter(s => s.status === true).length}
          </div>
          <div className="text-green-800 dark:text-green-500 text-sm">Present</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="text-red-600 dark:text-red-400 font-bold text-xl md:text-2xl">
            {attendanceData.filter(s => s.status === false).length}
          </div>
          <div className="text-red-800 dark:text-red-500 text-sm">Absent</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="text-blue-600 dark:text-blue-400 font-bold text-xl md:text-2xl">
            {attendanceData.filter(s => s.status === null).length}
          </div>
          <div className="text-blue-800 dark:text-blue-500 text-sm">Not Marked</div>
        </div>
      </div>
      
      {/* Students list/grid based on current view */}
      {currentView === 'list' ? (
        <div className="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative overflow-x-auto"
          >
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-surface-100 dark:bg-surface-700">
                <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Student</th>
                  <th scope="col" className="px-6 py-3 text-center">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <motion.tr
                      key={student.id}
                      variants={itemVariants}
                      className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700"
                    >
                      <td className="px-6 py-4 font-medium">
                        {student.id}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img 
                          src={student.photo} 
                          alt={student.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        {student.name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => markAttendance(student.id, true)}
                            className={`p-2 rounded-full ${
                              student.status === true 
                                ? 'bg-green-500 text-white' 
                                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-green-100 dark:hover:bg-green-900/20'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => markAttendance(student.id, false)}
                            className={`p-2 rounded-full ${
                              student.status === false 
                                ? 'bg-red-500 text-white' 
                                : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-red-100 dark:hover:bg-red-900/20'
                            }`}
                          >
                            <XIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr className="bg-white dark:bg-surface-800">
                    <td colSpan="3" className="px-6 py-8 text-center text-surface-500 dark:text-surface-400">
                      No students found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <motion.div
                key={student.id}
                variants={itemVariants}
                className={`
                  p-4 rounded-lg border
                  ${student.status === true 
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20' 
                    : student.status === false 
                      ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                      : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'}
                `}
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={student.photo} 
                    alt={student.name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-surface-200 dark:border-surface-700"
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-surface-500 dark:text-surface-400">ID: {student.id}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => markAttendance(student.id, true)}
                      className={`p-2 rounded-full ${
                        student.status === true 
                          ? 'bg-green-500 text-white' 
                          : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-green-100 dark:hover:bg-green-900/20'
                      }`}
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => markAttendance(student.id, false)}
                      className={`p-2 rounded-full ${
                        student.status === false 
                          ? 'bg-red-500 text-white' 
                          : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-red-100 dark:hover:bg-red-900/20'
                      }`}
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 text-sm">
                  {student.status === true && (
                    <span className="tag tag-primary">
                      <CheckIcon className="h-3 w-3 mr-1" /> Present
                    </span>
                  )}
                  {student.status === false && (
                    <span className="tag bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                      <XIcon className="h-3 w-3 mr-1" /> Absent
                    </span>
                  )}
                  {student.status === null && (
                    <span className="tag bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                      <ClockIcon className="h-3 w-3 mr-1" /> Not Marked
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center text-surface-500 dark:text-surface-400 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700">
              No students found matching your search.
            </div>
          )}
        </motion.div>
      )}
      
      {/* Add student modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-surface-800 rounded-xl p-6 max-w-md w-full shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Add New Student</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Student ID
                  </label>
                  <input
                    id="studentId"
                    type="text"
                    className="input"
                    placeholder="Enter student ID"
                    value={newStudentId}
                    onChange={(e) => setNewStudentId(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddStudent}
                    className="btn btn-primary"
                  >
                    Add Student
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper components
const BookIcon = getIcon('BookOpen');

export default MainFeature;