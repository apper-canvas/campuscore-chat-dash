import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const ArrowLeftIcon = getIcon('ArrowLeft');
const AlertTriangleIcon = getIcon('AlertTriangle');

function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-20 text-center"
    >
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1, rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 0.5, times: [0, 0.2, 0.5, 0.8, 1] }}
          className="mb-6 inline-block p-6 bg-surface-100 dark:bg-surface-800 rounded-full"
        >
          <AlertTriangleIcon className="h-20 w-20 text-amber-500" />
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-surface-700 dark:text-surface-300">
          Page Not Found
        </h2>
        <p className="text-lg text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="btn btn-primary px-8 py-3 text-lg"
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5" /> Go Home
        </motion.button>
      </div>
    </motion.div>
  );
}

export default NotFound;