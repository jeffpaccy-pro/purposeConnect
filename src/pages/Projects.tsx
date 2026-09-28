import React, { useState } from 'react';
import { FolderKanban, Plus, Search } from 'lucide-react';
import { useApp } from '../lib/store';
import { ProjectCard } from '../components/cards/ProjectCard';
import { ProjectStatus } from '../types/database';

export const Projects: React.FC = () => {
  const { projects, navigate } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const statuses = [
    { id: 'all', label: 'All Projects' },
    { id: 'active', label: 'Active Sprints' },
    { id: 'planning', label: 'Planning' },
    { id: 'completed', label: 'Completed' },
  ];

  const filtered = projects.filter((p) => {
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.goal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
            <FolderKanban className="w-4 h-4 text-purple-700" />
            <span>Collaborative Workspaces</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230] mt-1">
            Community Projects & Sprints
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
            Build open-source tools, civic solutions, and educational libraries together with shared task boards.
          </p>
        </div>

        <button
          onClick={() => navigate('/projects/new')}
          className="flex items-center gap-2 px-5 py-3 bg-[#145DA0] hover:bg-[#0f487e] text-white text-xs font-bold rounded-2xl shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Start Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {statuses.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStatus(s.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === s.id
                  ? 'bg-[#145DA0] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by goal or title..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#182230] focus:ring-2 focus:ring-[#145DA0] focus:outline-none"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-200/80">
            <FolderKanban className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-[#182230]">No projects found</p>
            <p className="text-xs text-slate-500 mt-1">
              Have an idea for a community app or tool? Kickstart a project workspace today.
            </p>
            <button
              onClick={() => navigate('/projects/new')}
              className="mt-4 px-4 py-2 bg-[#145DA0] text-white text-xs font-semibold rounded-xl"
            >
              Start a Project
            </button>
          </div>
        ) : (
          filtered.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))
        )}
      </div>
    </div>
  );
};
