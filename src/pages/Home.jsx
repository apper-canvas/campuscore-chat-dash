import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Icons
const UserIcon = getIcon('Users');
const BookIcon = getIcon('BookOpen');
const CalendarIcon = getIcon('Calendar');
const GraduationCapIcon = getIcon('GraduationCap');
const ClipboardListIcon = getIcon('ClipboardList');
const DollarSignIcon = getIcon('DollarSign');

function Home() {
  const [selectedModule, setSelectedModule] = useState('attendance');

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    toast.info(`${module.charAt(0).toUpperCase() + module.slice(1)} module selected`);
  };

  const moduleItems = [
    { id: 'students', name: 'Student Management', icon: UserIcon, color: 'from-blue-400 to-blue-600' },
    { id: 'faculty', name: 'Faculty Management', icon: GraduationCapIcon, color: 'from-purple-400 to-purple-600' },
    { id: 'courses', name: 'Course Management', icon: BookIcon, color: 'from-green-400 to-green-600' },
    { id: 'attendance', name: 'Attendance Tracking', icon: CalendarIcon, color: 'from-yellow-400 to-yellow-600' },
    { id: 'exams', name: 'Exam & Results', icon: ClipboardListIcon, color: 'from-red-400 to-red-600' },
    { id: 'fees', name: 'Fee Management', icon: DollarSignIcon, color: 'from-cyan-400 to-cyan-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-6 md:py-10"
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CampusCore Modules
          </h2>
          
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden">
            <div className="grid gap-1 p-2">
              {moduleItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleModuleSelect(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left
                    ${selectedModule === item.id 
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-md'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                    }`}
                >
                  <div className={`p-2 rounded-lg ${
                    selectedModule === item.id
                      ? 'bg-white bg-opacity-20'
                      : 'bg-gradient-to-r ' + item.color + ' text-white'
                  }`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6 p-5 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
            <h3 className="text-lg font-semibold mb-3">System Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-surface-700 p-3 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-1">835</div>
                <div className="text-sm text-surface-600 dark:text-surface-400">Students</div>
              </div>
              <div className="bg-white dark:bg-surface-700 p-3 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-secondary mb-1">94</div>
                <div className="text-sm text-surface-600 dark:text-surface-400">Faculty</div>
              </div>
              <div className="bg-white dark:bg-surface-700 p-3 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-green-500 mb-1">56</div>
                <div className="text-sm text-surface-600 dark:text-surface-400">Courses</div>
              </div>
              <div className="bg-white dark:bg-surface-700 p-3 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-amber-500 mb-1">12</div>
                <div className="text-sm text-surface-600 dark:text-surface-400">Departments</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              {(() => {
                const selectedItem = moduleItems.find(item => item.id === selectedModule);
                if (selectedItem?.icon) {
                  const IconComponent = selectedItem.icon;
                  return <IconComponent className="h-5 w-5 text-primary" />;
                }
                return null;
              })()}
              {moduleItems.find(item => item.id === selectedModule)?.name || 'Module'}
            </h2>
            
            <MainFeature moduleType={selectedModule} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;