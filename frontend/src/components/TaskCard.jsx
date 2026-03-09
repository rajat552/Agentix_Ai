import React from 'react';
import { CheckCircle2, Circle, ArrowUpRight } from 'lucide-react';

const TaskCard = ({ title, description, status, priority = 'medium' }) => {
    const isCompleted = status === 'completed' || status === 'done';

    return (
        <div className={`p-4 rounded-2xl border transition-all group ${isCompleted
                ? 'bg-white/[0.02] border-white/5 opacity-60'
                : 'bg-white/5 border-white/10 hover:border-primary/40 hover:bg-white/[0.07]'
            }`}>
            <div className="flex items-start gap-4">
                <button className={`mt-0.5 transition-colors ${isCompleted ? 'text-green-500' : 'text-gray-500 hover:text-primary'}`}>
                    {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className={`font-semibold text-sm truncate ${isCompleted ? 'line-through' : ''}`}>
                            {title}
                        </h3>
                        {!isCompleted && (
                            <ArrowUpRight size={14} className="text-gray-600 group-hover:text-primary transition-colors flex-shrink-0" />
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>

                    {!isCompleted && (
                        <div className="flex items-center gap-2 mt-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${priority === 'high' ? 'bg-red-500/10 text-red-500' :
                                    priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                                        'bg-green-500/10 text-green-500'
                                }`}>
                                {priority}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
