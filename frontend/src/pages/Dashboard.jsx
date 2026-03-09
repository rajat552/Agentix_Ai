import React, { useState, useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import TaskPanel from '../components/TaskPanel';
import { getTasks } from '../services/api';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getTasks();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    return (
        <div className="pt-24 min-h-screen">
            <div className="max-w-[1600px] mx-auto grid lg:grid-cols-4 gap-8 h-[calc(100vh-10rem)] px-6">
                {/* Chat - Takes 3 columns */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">AI Assistant</h1>
                            <p className="text-gray-500 text-sm">Nova is ready to automate your workflow.</p>
                        </div>
                    </div>
                    <ChatWindow />
                </div>

                {/* Tasks - Takes 1 column */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-black tracking-tight">Pipeline</h1>
                    </div>
                    <TaskPanel tasks={tasks} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
