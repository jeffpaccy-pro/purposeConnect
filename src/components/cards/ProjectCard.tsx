import React from 'react';
import { FolderKanban, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../../types/database';
import { useApp } from '../../lib/store';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { navigate, joinProject } = useApp();

  const statusConfig = {
    planning: { label: 'Planning', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    active: { label: 'Active Sprint', color: 'bg-emerald-50 text-[#16A34A] border-emerald-200' },
    completed: { label: 'Completed', color: 'bg-blue-50 text-[#145DA0] border-blue-200' },
  };

  const statusBadge = statusConfig[project.status] || statusConfig.active;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className={`text-[11px] font-semibold border px-2.5 py-0.5 rounded-lg ${statusBadge.color}`}>
            {statusBadge.label}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Users className="w-3.5 h-3.5" />
            <span>{project.members_count} builders</span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/projects/${project.id}`)}
          className="mt-3 font-bold text-base text-[#182230] group-hover:text-[#145DA0] transition-colors text-left block"
        >
          {project.title}
        </button>

        <p className="mt-1 text-xs font-medium text-slate-700 italic">
          &ldquo;{project.goal}&rdquo;
        </p>

        <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
            <span>Milestone Progress</span>
            <span className="font-mono tabular-nums text-[#145DA0]">{project.progress || 0}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#145DA0] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${project.progress || 0}%` }}
            />
          </div>
        </div>

        {/* Required skills */}
        {project.required_skills && project.required_skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {project.required_skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-slate-50 border border-slate-200/60 text-slate-600 px-2 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => joinProject(project.id)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            project.is_member
              ? 'bg-blue-50 text-[#145DA0] border border-blue-200'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {project.is_member && <CheckCircle2 className="w-3.5 h-3.5" />}
          <span>{project.is_member ? 'Member' : 'Join Team'}</span>
        </button>

        <button
          onClick={() => navigate(`/projects/${project.id}`)}
          className="flex items-center gap-1 text-xs font-semibold text-[#145DA0] hover:underline"
        >
          <span>Open Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
