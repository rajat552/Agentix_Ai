import React from 'react';
import { Sparkles, LayoutList } from 'lucide-react';
import TaskCard from './TaskCard';

const TaskPanel = ({ tasks = [] }) => {
    return (
        <div className="flex flex-col h-full glass-card p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <LayoutList size={20} className="text-primary" />
                    <h2 className="text-lg font-bold">Planned Tasks</h2>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                    <Sparkles size={12} className="text-primary" />
                    <span className="text-[10px] uppercase tracking-tighter font-black text-primary">Nova AI</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {tasks.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-20">
                        <LayoutList size={48} className="mb-4" />
                        <p className="text-sm">No tasks generated yet. Ask the AI to help you plan something!</p>
                    </div>
                ) : (
                    tasks.map((task, idx) => (
                        <TaskCard key={task.id || idx} {...task} />
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskPanel;
