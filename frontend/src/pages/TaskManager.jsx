import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { Plus, Filter, SortAsc, LayoutGrid, CheckSquare } from 'lucide-react';
import { getTasks } from '../services/api';
import { motion } from 'framer-motion';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getTasks();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    return (
        <div className="pt-32 max-w-6xl mx-auto px-6 pb-20">
            <header className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                        <CheckSquare size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">Task Manager</h1>
                        <p className="text-gray-500 text-sm">Orchestrate your AI-generated productivity pipeline.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
                        <LayoutGrid size={16} /> Grid
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-black shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
                        <Plus size={20} /> Create Task
                    </button>
                </div>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task, idx) => (
                    <motion.div
                        key={task.id || idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <TaskCard {...task} />
                    </motion.div>
                ))}

                {/* Placeholder Card */}
                <button className="p-8 rounded-3xl border border-white/10 border-dashed bg-white/[0.01] hover:bg-white/[0.03] flex flex-col items-center justify-center text-gray-600 hover:text-gray-400 transition-all group">
                    <Plus size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-xs uppercase tracking-[0.2em]">Add Workflow Step</span>
                </button>
            </div>
        </div>
    );
};

export default TaskManager;
