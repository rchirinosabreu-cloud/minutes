
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import frontendApiService from '@/services/frontendApiService';

const Header = () => {
  const [firefliesStatus, setFirefliesStatus] = useState('checking');
  const [openAiStatus, setOpenAiStatus] = useState('checking');

  useEffect(() => {
    const checkConnections = async () => {
      const [firefliesOk, openAiOk] = await Promise.all([
        frontendApiService.checkFirefliesConnection(),
        frontendApiService.checkOpenAiConnection()
      ]);

      setFirefliesStatus(firefliesOk ? 'connected' : 'disconnected');
      setOpenAiStatus(openAiOk ? 'connected' : 'disconnected');
    };

    checkConnections();
  }, []);

  const statusStyles = {
    connected: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/40',
    disconnected: 'bg-red-500/10 text-red-200 border-red-400/40',
    checking: 'bg-yellow-500/10 text-yellow-200 border-yellow-400/40'
  };

  const StatusBadge = ({ label, status }) => (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}>
      <span className={`h-2 w-2 rounded-full ${status === 'connected' ? 'bg-emerald-400' : status === 'disconnected' ? 'bg-red-400' : 'bg-yellow-400'}`} />
      {label}: {status === 'checking' ? 'verificando' : status === 'connected' ? 'conectada' : 'sin conexión'}
    </span>
  );

  return (
    <>
      <Helmet>
        <title>BrainStudio Minutes - Análisis de Reuniones con IA</title>
        <meta name="description" content="Analiza reuniones y documentos con IA para generar reportes profesionales. Integración con Fireflies y análisis profundo." />
      </Helmet>
      
      <motion.header 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: 'easeOut' }} 
        className="w-full py-8 px-6 border-b border-purple-900/30"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ scale: 0.95 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.4, delay: 0.2 }} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/20 border border-purple-500/30 rounded-full mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <span className="text-sm font-medium text-purple-200">
              BrainStudio · Minutas IA
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.3 }} 
            className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
          >
            <span className="text-white">BrainStudio</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent">
              Minutes
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.4 }} 
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            Herramienta integral para el procesamiento de transcripciones y documentos, generando resúmenes y análisis estratégicos impulsados por IA.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <StatusBadge label="Fireflies" status={firefliesStatus} />
            <StatusBadge label="OpenAI" status={openAiStatus} />
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};
export default Header;
